export interface OrderItems {
  name: string;
}

export type OrderStatus = "CREATED" | "PROCESSED" | "ERROR";

export class OrderEntity {
  constructor(
    public readonly id: string,
    public clientDocument: string,
    public readonly items: OrderItems[],
    public readonly status: OrderStatus
  ) {}

  static build(
    id: string,
    clientDocument: string,
    items: OrderItems[],
    status: OrderStatus
  ): OrderEntity {
    return new OrderEntity(id, clientDocument, items, status);
  }
}
