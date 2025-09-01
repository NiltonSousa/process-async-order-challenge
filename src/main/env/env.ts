import { configDotenv } from "dotenv";

configDotenv();

export const KAFKA_TOPIC_ORDERS_REQUEST =
  process.env.KAFKA_TOPIC_ORDERS_REQUEST ?? "generic-topic.v0";
export const DELAY_IN_SECONDS = process.env.DELAY_IN_SECONDS ?? 2_000;
