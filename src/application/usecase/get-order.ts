import type { OrderEntity } from "@/domain/entity";
import type { IOrderStore } from "@/domain/repository";
import type { IGetOrderUseCase } from "@/domain/usecase";

export class GetOrderUseCaseImpl implements IGetOrderUseCase {
  constructor(private readonly dataStore: IOrderStore) {}

  execute(orderId: string): OrderEntity | null {
    const order = this.dataStore.get(orderId);

    if (!order) {
      return null;
    }

    return order;
  }
}
