import type { OrderStatus } from "@/domain/entity";
import type { OrderStore } from "@/domain/repository";

export class InMemoryOrderStore implements OrderStore {
  private readonly data = new Map<string, OrderStatus>();

  set(id: string, status: OrderStatus): void {
    this.data.set(id, status);
  }

  get(id: string): OrderStatus | null {
    const order = this.data.get(id);

    if (!order) {
      return null;
    }

    return order;
  }

  has(id: string): boolean {
    return this.data.has(id);
  }

  toJSON(): Record<string, OrderStatus> {
    return Object.fromEntries(this.data.entries());
  }
}

const store = new InMemoryOrderStore();

export default store;
