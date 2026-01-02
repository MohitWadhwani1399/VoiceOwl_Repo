import {
  TranscriptionModel,
  TranscriptionState,
} from "../../database/models/transcription-job.model.js";
import { TranscriptionResultModel } from "../../database/models/transcription-result.model.js";

export class TranscritptionRepository {
  async createJob(jobId: string, audioUrl: string) {
    return TranscriptionModel.create({
      jobId,
      audioUrl,
    });
  }

  async findJob(jobId: string) {
    return TranscriptionModel.find({
      jobId,
    });
  }

  async markProcessing(jobId: string) {
    return TranscriptionModel.findOneAndUpdate(
      { jobId, state: TranscriptionState.PENDING },
      {
        state: TranscriptionState.PROCESSING,
        $inc: { retries: 1 },
      }
    );
  }

  async markCompleted(jobId: string, transcript: string) {
    await TranscriptionResultModel.create({
      jobId,
      transcript,
    });
    return TranscriptionModel.updateOne(
      { jobId, state: TranscriptionState.PROCESSING },
      {
        state: TranscriptionState.COMPLETED,
      }
    );
  }

  async markFailed(jobId: string, error: string) {
    return TranscriptionModel.updateOne(
      { jobId },
      {
        state: TranscriptionState.FAILED,
        error,
      }
    );
  }
}
