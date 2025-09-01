import type { OrderEntity, OrderItems } from "../entity";

export interface ICreateOrderUseCaseInput {
  clientDocument: string;
  items: OrderItems;
}

export interface ICreateOrderUseCase {
  execute: (input: ICreateOrderUseCaseInput) => Promise<OrderEntity>;
}
