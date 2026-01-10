import { downloadAudioFile, transcribe } from "../../utils/audio.utils.js";
import type { Request, Response } from "express";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import OpenAI from "openai";
import { TranscriptionService } from "./transcription.service.js";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const transcriptionService = new TranscriptionService();

export class TranscriptionController {
  async createTranscription(req: Request, res: Response) {
    const audioUrl: string = req.body.audioUrl;
    if (!audioUrl) {
      return res.status(400).json({
        message: "Audio Url is required",
      });
    }
    try {
      const result = await transcriptionService.createTranscription(audioUrl);
      return res.status(202).json(result);
    } catch (error) {
      res.status(500).send("Server error");
    }
  }
  async getTranscription(req: Request, res: Response) {
    const limit = parseInt(req.query.limit as string);
    const cursor = req.query.cursor as string;

    try {
      const transcriptions = await transcriptionService.getTranscriptions(
        limit,
        cursor
      );
      return res.status(200).json(transcriptions);
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
}
