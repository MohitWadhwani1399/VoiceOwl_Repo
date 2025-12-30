import mongoose, { Schema } from "mongoose";

export interface TranscriptionResultDocument extends Document {
  jobId: string;
  audioUrl: string;
  transcript: string;
  language?: string;
  createdAt: Date;
}

const TranscriptionResultSchema = new Schema<TranscriptionResultDocument>(
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
    transcript: {
      type: String,
      required: true,
    },
    language: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const TranscriptionResultModel =
  mongoose.model<TranscriptionResultDocument>(
    "TranscriptionResult",
    TranscriptionResultSchema
  );
