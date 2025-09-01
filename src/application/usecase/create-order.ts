import { OrderEntity } from "@/domain/entity";
import type { IOrderStore } from "@/domain/repository";
import type {
  ICreateOrderUseCase,
  ICreateOrderUseCaseInput,
} from "@/domain/usecase";
import type { IKafkaClient } from "@/main/clients";
import { KAFKA_TOPIC_ORDERS_REQUEST } from "@/main/env/env";
import { randomUUID } from "node:crypto";

export class CreateOrderUseCaseImpl implements ICreateOrderUseCase {
  constructor(
    private readonly dataStore: IOrderStore,
    private readonly kafkaClient: IKafkaClient
  ) {}

  async execute(input: ICreateOrderUseCaseInput): Promise<OrderEntity> {
    const { clientDocument, items } = input;

    const orderId = randomUUID();
    const order = OrderEntity.build(orderId, clientDocument, items, "CREATED");

    this.dataStore.set(orderId, order);

    await this.kafkaClient.connect();

    await this.kafkaClient.produce({
      topic: KAFKA_TOPIC_ORDERS_REQUEST,
      messages: [{ value: JSON.stringify(order) }],
    });

    return order;
  }
}
