import { TranscriptionState } from "../../database/models/transcription-job.model.js";
import { publishTranscription } from "../../kafka/producers/transcription.producer.js";
import { TranscritptionRepository } from "./transcription.repository.js";
import { v4 as uuidv4 } from "uuid";
export class TranscriptionService {
  private repo = new TranscritptionRepository();
  async createTranscription(audioUrl: string) {
    const jobId = uuidv4();
    await this.repo.createJob(jobId, audioUrl);
    await publishTranscription({
      jobId,
      audioUrl,
    });
    // In case of dual write problem, we need to fix this using Outbox pattern.
    return {
      jobId,
      status: TranscriptionState.PENDING,
    };
  }

  async getTranscriptions(limit = 20, cursor: string) {
    const maxLimit = Math.min(limit, 50);
    const thirtyDaysAgoDate: Date = new Date();
    thirtyDaysAgoDate.setDate(new Date().getDate() - 30);
    const cursorDate = cursor ? new Date(cursor) : new Date();
    const transcriptions = await this.repo.getLast30daysTransciptions(
      thirtyDaysAgoDate,
      maxLimit,
      cursorDate
    );

    const nextCursor =
      transcriptions.length > 0
        ? transcriptions[transcriptions.length - 1].createdAt
        : null;
    return {
      data: transcriptions,
      nextCursor,
      limit: maxLimit,
    };
  }
}
