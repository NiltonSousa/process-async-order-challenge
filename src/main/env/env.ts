import { configDotenv } from "dotenv";

configDotenv();

export const KAFKA_TOPIC_ORDERS_REQUEST =
  process.env.KAFKA_TOPIC_ORDERS_REQUEST ?? "generic-topic.v0";
