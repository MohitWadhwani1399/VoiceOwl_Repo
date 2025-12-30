import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId: "transcription-service",
    brokers: process.env.KAFKA_BROKERS!.split(",")
})