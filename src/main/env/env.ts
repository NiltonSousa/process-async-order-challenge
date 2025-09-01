import { configDotenv } from "dotenv";

configDotenv();

export const KAFKA_TOPIC_ORDERS_REQUEST =
  process.env.KAFKA_TOPIC_ORDERS_REQUEST ?? "generic-topic.v0";
export const KAFKA_CLIENT_ID = process.env.KAFKA_CLIENT_ID ?? "my-app";
export const KAFKA_BROKERS = process.env.KAFKA_BROKERS ?? "localhost:9093";
export const DELAY_IN_SECONDS = process.env.DELAY_IN_SECONDS ?? 2_000;
KAFKA_CLIENT_ID;
