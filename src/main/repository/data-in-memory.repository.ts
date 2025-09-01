import type { OrderEntity } from "@/domain/entity";
import type { IOrderStore } from "@/domain/repository";

export class InMemoryOrderStore implements IOrderStore {
  private readonly data = new Map<string, OrderEntity>();

  set(id: string, order: OrderEntity): void {
    this.data.set(id, order);
  }

  get(id: string): OrderEntity | null {
    const order = this.data.get(id);

    if (!order) {
      return null;
    }

    return order;
  }

  has(id: string): boolean {
    return this.data.has(id);
  }

  toJSON(): Record<string, OrderEntity> {
    return Object.fromEntries(this.data.entries());
  }

  clear(): void {
    this.data.clear();
  }
}

const store = new InMemoryOrderStore();

export default store;
