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
  // const getTranscription = async (req: Request, res: Response) => {
  //   const audioUrl: string = req.audioUrl;
  //   try {
  //     const filePath = path.join(
  //       __dirname,
  //       "../sample_audio_files/Recording.mp3"
  //     );
  //     console.log(filePath);
  //     const transcription = openai.audio.transcriptions.create({
  //       file: fs.createReadStream(filePath),
  //       model: "gpt-4o-mini-transcribe",
  //     });
  //   } catch (error) {}
  //   //const transcribedText = await transcribe(audioFile);
  //   res.status(200).send("Transcribed Text");
  // };
}
