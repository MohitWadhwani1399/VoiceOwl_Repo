import { startTranscriptionConsumer } from "./kafka/consumers/transcription.consumer.js";
import { startServer } from "./server.js";
import { gracefulShutDown } from "./utils/shutdown.js";


async function bootstrapServer(){
    await startServer();
    await startTranscriptionConsumer();
    gracefulShutDown();
}

bootstrapServer();