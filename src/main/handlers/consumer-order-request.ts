import type { OrderEntity } from "@/domain/entity";
import kafkaClient from "../clients/kafka-client";
import { KAFKA_TOPIC_ORDERS_REQUEST } from "../env/env";
import { makeProcessOrderUseCase } from "../factories";

export async function processOrderConsumerHandler(): Promise<void> {
  try {
    const usecase = makeProcessOrderUseCase();

    await kafkaClient.consume(
      KAFKA_TOPIC_ORDERS_REQUEST,
      "my-group",
      ({ topic, value }) => {
        if (!value) return;

        console.log(
          `New message processed from topic ${topic}: ORDERID:[${JSON.parse(value).id}]`
        );

        usecase.execute(JSON.parse(value) as OrderEntity);
      }
    );
  } catch (error: unknown) {
    console.error(error);
  }
}
