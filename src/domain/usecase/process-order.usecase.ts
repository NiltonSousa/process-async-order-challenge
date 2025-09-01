import type { OrderEntity } from "../entity";

export interface IProcessOrderUseCase {
  execute: (order: OrderEntity) => void;
}
