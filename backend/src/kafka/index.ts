import { Kafka, Producer, Consumer } from "kafkajs";

let kafka: Kafka;
let producer: Producer;
let consumers: Consumer[] = [];

export function createKafkaClient(): Kafka {
  if (!kafka) {
    kafka = new Kafka({
      clientId: "transcription-service",
      brokers: process.env.KAFKA_BROKERS!.split(","),
      retry: {
        retries: 3,
      },
    });
  }
  return kafka;
}

export async function getKafkaProducer(): Promise<Producer> {
  //    Our Kafka Producer instance is singleton for our whole app, so no new instance
  //    is created for new request.
  if (!producer) {
    producer = createKafkaClient().producer({
      idempotent: true,
    });
    await producer.connect();
  }
  return producer;
}

export async function registerKafkaConsumer(consumer: Consumer): Promise<void> {
  consumers.push(consumer);
  await consumer.connect();
}

export async function shutdownKafka() {
  for (let consumer of consumers) {
    await consumer.disconnect();
  }
  if (producer) {
    await producer.disconnect();
  }
  console.log("Kafka Disconnected");
}
