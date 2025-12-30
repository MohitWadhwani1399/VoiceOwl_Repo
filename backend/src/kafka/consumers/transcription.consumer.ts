import { kafka } from "../../config/kafka.config.js";
import { processTranscription } from "../../modules/transcription/transcription.worker.js";
import { createKafkaClient, registerKafkaConsumer } from "../index.js";
import { TranscriptionRequestedEvent } from "../messageTypes.js";
import { KAFKA_TOPICS } from "../topics.js";

export async function startTranscriptionConsumer() {
  const kafka = await createKafkaClient();
  const consumer = kafka.consumer({
    groupId: "transcription-workers",
  });

  await registerKafkaConsumer(consumer);

  await consumer.subscribe({
    topic: KAFKA_TOPICS.TRANSCRIPTION_REQUESTED,
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const payload = JSON.parse(
        message.value!.toString()
      ) as TranscriptionRequestedEvent;
      // Below function will do the actual transcription process.
      await processTranscription(payload);
    },
  });
}
