import { kafka } from "../../config/kafka.config.js";
import { TranscriptionState } from "../../database/models/transcription-job.model.js";
import { TranscritptionRepository } from "../../modules/transcription/transcription.repository.js";
import { processTranscription } from "../../modules/transcription/transcription.worker.js";
import { createKafkaClient, registerKafkaConsumer } from "../index.js";
import { TranscriptionRequestedEvent } from "../messageTypes.js";
import { KAFKA_TOPICS } from "../topics.js";

const repo = new TranscritptionRepository();
export async function startTranscriptionConsumer() {
  const kafka = await createKafkaClient();
  const consumer = kafka.consumer({
    groupId: "transcription-workers",
    allowAutoTopicCreation: false,
  });

  await registerKafkaConsumer(consumer);

  await consumer.subscribe({
    topic: KAFKA_TOPICS.TRANSCRIPTION_REQUESTED,
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ message, topic, partition }) => {
      const payload = JSON.parse(
        message.value!.toString()
      ) as TranscriptionRequestedEvent;
      const { jobId, audioUrl } = payload;
      const job = await repo.findJob(jobId);
      // Checking For Idempotency
      if (!job || job.state === TranscriptionState.COMPLETED) {
        console.log(`Job with ${jobId} already processed`);
        await commitOffset(consumer, topic, partition, message.offset);
        return;
      }
      const proceesingJob = await repo.markProcessing(jobId);
      if (!proceesingJob) {
        // Job is already in processing state.
        return;
      }

      // Below function will do the actual transcription process.
      try {
        const transcriptText = await processTranscription(payload);
        await repo.markCompleted(jobId, transcriptText);
        await commitOffset(consumer, topic, partition, message.offset);
      } catch (error: any) {
        await repo.markFailed(jobId, error.message);
      }
    },
  });
}

async function commitOffset(
  consumer: any,
  topic: string,
  partition: number,
  offset: string
) {
  await consumer.commitOffset([
    {
      topic,
      partition,
      offset: (Number(offset) + 1).toString(),
    },
  ]);
}
