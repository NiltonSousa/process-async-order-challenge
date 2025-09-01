import { OrderEntity } from "@/domain/entity";
import type { IOrderStore } from "@/domain/repository";
import type { IProcessOrderUseCase } from "@/domain/usecase";

export class ProcessOrderUseCaseImpl implements IProcessOrderUseCase {
  constructor(private readonly dataStore: IOrderStore) {}

  execute(order: OrderEntity): void {
    const orderFound = this.dataStore.get(order.id);

    if (orderFound === null) {
      console.error(`Order with ID: [${order.id}] not found`);

      return;
    }

    const processedOrder = OrderEntity.build(
      orderFound.id,
      orderFound.clientDocument,
      orderFound.items,
      "PROCESSED"
    );

    this.dataStore.set(order.id, processedOrder);
  }
}
