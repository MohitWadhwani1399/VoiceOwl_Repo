import { startTranscriptionConsumer } from "./kafka/consumers/transcription.consumer.js";
import { startServer } from "./server.js";


async function bootstrapServer(){
    await startServer();
    await startTranscriptionConsumer();
}

bootstrapServer();