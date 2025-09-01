import { ProcessOrderUseCaseImpl } from "@/application/usecase";
import { IProcessOrderUseCase } from "@/domain/usecase";
import store from "@/main/repository/data-in-memory.repository";
import { mockOrderEntity } from "@tests/mock";
import { randomUUID } from "node:crypto";

describe("ProcessOrderUseCase", () => {
  let sut: IProcessOrderUseCase;

  beforeEach(() => {
    sut = new ProcessOrderUseCaseImpl(store);
  });

  it("should Process an order successfully", () => {
    const orderEntity = mockOrderEntity();

    store.set(orderEntity.id, orderEntity);

    sut.execute(orderEntity);

    const orderProcessed = store.get(orderEntity.id);

    expect(orderProcessed).not.toBeNull();
    expect(orderProcessed?.status).toBe("PROCESSED");
  });

  it("should return void when an order not found", () => {
    const orderId = randomUUID();
    const orderEntity = mockOrderEntity();
    const orderEntity2 = mockOrderEntity({ id: orderId });

    store.set(orderEntity.id, orderEntity);

    sut.execute(orderEntity2);

    const orderProcessed = store.get(orderEntity2.id);

    expect(orderProcessed).toBeNull();
    expect(orderProcessed?.status).not.toBe("PROCESSED");
  });
});
