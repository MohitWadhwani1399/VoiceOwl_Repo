import {Router} from 'express';
import { createTranscription, getTranscription } from '../controllers/audio.controller.js';

const router = Router();
router.post('/transcription',createTranscription);
router.get('/transcription',getTranscription);

export default router;