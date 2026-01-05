import { TranscriptionRequestedEvent } from "../../kafka/messageTypes.js";

export async function processTranscription(msg: TranscriptionRequestedEvent):Promise<string>{
    // Download Audio file.
    // Transcribe Text.
    // Return transcription text.
    await new Promise((t)=> setTimeout(t,3000));
    return `Transcribed Text for Job with id ${msg.jobId}`;
}