export type OrderStatus = "CREATED" | "PROCESSED" | "ERROR";

export interface OrderStore {
  set: (id: string, status: OrderStatus) => void;
  get: (id: string) => OrderStatus | null;
  has: (id: string) => boolean;
  toJSON: () => Record<string, OrderStatus>;
}
