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

  async getTranscriptions(){
    await this.repo.getLast30daysTransciptions();
  }
}
