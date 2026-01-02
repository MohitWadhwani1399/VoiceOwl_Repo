import { connectMongoDB } from "./config/database.config.js";
import { startTranscriptionConsumer } from "./kafka/consumers/transcription.consumer.js";
import { startServer } from "./server.js";
import { gracefulShutDown } from "./utils/shutdown.js";


async function bootstrapServer(){
    await connectMongoDB();
    await startServer();
    await startTranscriptionConsumer();
    gracefulShutDown();
}

bootstrapServer();