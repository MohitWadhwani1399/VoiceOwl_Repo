import { shutdownKafka } from "../kafka/index.js";
import { shutdownServer } from "../server.js";

export function gracefulShutDown(){
    const shutdown = async (signal: string)=>{
        await shutdownKafka();
        await shutdownServer();
        process.exit(0);
    }
    process.on("SIGINT",shutdown);
    process.on("SIGTERM",shutdown);
}