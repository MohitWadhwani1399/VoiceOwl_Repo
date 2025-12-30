import {Router} from 'express';
import { createTranscription } from '../modules/transcription/transcription.controller.js';

const router = Router();
router.post('/transcription',createTranscription);
//router.get('/transcription',getTranscription);

export default router;