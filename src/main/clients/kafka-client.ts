import {
  Kafka,
  type Producer,
  type Consumer,
  logLevel,
  type EachMessagePayload,
} from "kafkajs";
import { delay } from "../common/delay";
import { DELAY_IN_SECONDS } from "../env/env";

export interface ProducePayload {
  topic: string;
  messages: Array<{
    key?: string;
    value: string | Buffer;
    headers?: Record<string, string>;
  }>;
}

export type EachMessageHandler = (params: {
  topic: string;
  partition: number;
  offset: string;
  key?: string | null;
  value?: string | null;
  headers?: Record<string, string>;
}) => Promise<void> | void;

export interface IKafkaClient {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  produce: (payload: ProducePayload) => Promise<void>;
  consume: (
    topic: string,
    groupId: string,
    handler: EachMessageHandler,
    opts?: { fromBeginning?: boolean }
  ) => Promise<void>;
}

export class KafkaClient implements IKafkaClient {
  private readonly kafka: Kafka;
  private producer?: Producer;
  private consumers: Consumer[] = [];

  constructor(config: {
    clientId: string;
    brokers: string[];
    logLevel?: logLevel;
  }) {
    this.kafka = new Kafka({
      clientId: config.clientId,
      brokers: config.brokers,
      logLevel: config.logLevel ?? logLevel.NOTHING,
    });
  }

  async connect(): Promise<void> {
    this.producer = this.kafka.producer();
    await this.producer.connect();
  }

  async disconnect(): Promise<void> {
    await Promise.all([
      this.producer?.disconnect().catch((e: unknown) => {
        console.error(e);
      }),
      ...this.consumers.map(async (c) => {
        await c.disconnect().catch((e: unknown) => {
          console.error(e);
        });
      }),
    ]);
    this.consumers = [];
  }

  async produce(payload: ProducePayload): Promise<void> {
    if (!this.producer) throw new Error("Producer not connected");
    await this.producer.send({
      topic: payload.topic,
      messages: payload.messages.map((m) => ({
        key: m.key,
        value: typeof m.value === "string" ? Buffer.from(m.value) : m.value,
        headers: m.headers,
      })),
    });
  }

  async consume(
    topic: string,
    groupId: string,
    handler: EachMessageHandler,
    opts?: { fromBeginning?: boolean }
  ): Promise<void> {
    const consumer = this.kafka.consumer({ groupId });
    this.consumers.push(consumer);

    await consumer.connect();
    await consumer.subscribe({
      topic,
      fromBeginning: opts?.fromBeginning ?? false,
    });

    console.log(
      `Consumer subscribed to topic ${topic}. Waiting for messages...`
    );

    await consumer.run({
      eachMessage: async ({
        topic,
        partition,
        message,
      }: EachMessagePayload) => {
        await delay(Number(DELAY_IN_SECONDS));
        await handler({
          topic,
          partition,
          offset: message.offset,
          key: message.key?.toString() ?? undefined,
          value: message.value?.toString() ?? undefined,
          headers: Object.fromEntries(
            Object.entries(message.headers ?? {}).map(([k, v]) => [
              k,
              v?.toString() ?? "",
            ])
          ),
        });
      },
    });
  }
}

const kafkaClient = new KafkaClient({
  clientId: "my-app",
  brokers: ["localhost:9093"],
});

export default kafkaClient;
