import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId: "transcription-service",
    brokers: process.env.KAFKA_BROKERS!.split(",")
})

// brokers would be in the .env file with this format -> "broker1:3030,broker2:3010" 