import type { OrderEntity } from "../entity";

export interface IGetOrderUseCase {
  execute: (orderId: string) => OrderEntity | null;
}
