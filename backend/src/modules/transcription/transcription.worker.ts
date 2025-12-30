import { TranscriptionRequestedEvent } from "../../kafka/messageTypes.js";

export async function processTranscription(msg: TranscriptionRequestedEvent){
    // Download Audio file.
    // Transcribe.
    // Save result to DB.
}