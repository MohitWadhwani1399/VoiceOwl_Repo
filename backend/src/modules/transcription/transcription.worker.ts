import { TranscriptionRequestedEvent } from "../../kafka/messageTypes.js";

export async function processTranscription(msg: TranscriptionRequestedEvent):Promise<string>{
    // Download Audio file.
    // Transcribe.
    // Save result to DB.
    return "";
}