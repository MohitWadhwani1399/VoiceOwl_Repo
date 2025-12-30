import mongoose, { Schema } from "mongoose";

export enum TranscriptionState {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export interface TranscriptionDocument extends Document {
  jobId: string; // will be used to ensure idompotency
  audioUrl: string;
  state: TranscriptionState;
  createdAt: Date;
  updatedAt: Date;
  error?: string;
  retries: number; // it will be used for retry logic
}

const TranscriptionSchema = new Schema<TranscriptionDocument>(
  {
    jobId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    audioUrl: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      enum: Object.values(TranscriptionState),
      default: TranscriptionState.PENDING,
      index: true, // Need to revisit this index later
    },
    retries: {
      type: Number,
      default: 0,
    },
    error: {
      type: String,
    },
  },
  { timestamps: true }
);

export const TranscriptionModel = mongoose.model<TranscriptionDocument>(
  "Transcription",
  TranscriptionSchema
);
