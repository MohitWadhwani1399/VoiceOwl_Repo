import { Router } from "express";
import { TranscriptionController } from "../modules/transcription/transcription.controller.js";

const router = Router();
const controller = new TranscriptionController();
router.post("/", controller.createTranscription.bind(controller));
//router.get('/transcription',getTranscription);

export default router;
