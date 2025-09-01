import type { OrderEntity } from "../entity";

export type OrderStatus = "CREATED" | "PROCESSED" | "ERROR";

export interface IOrderStore {
  set: (id: string, status: OrderEntity) => void;
  get: (id: string) => OrderEntity | null;
  has: (id: string) => boolean;
  toJSON: () => Record<string, OrderEntity>;
}
