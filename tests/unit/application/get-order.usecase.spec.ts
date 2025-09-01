import { GetOrderUseCaseImpl } from "@/application/usecase";
import { IGetOrderUseCase } from "@/domain/usecase";
import store from "@/main/repository/data-in-memory.repository";
import { mockOrderEntity } from "@tests/mock";
import { randomUUID } from "node:crypto";

describe("GetOrderUseCase", () => {
  let sut: IGetOrderUseCase;

  beforeEach(() => {
    store.clear();
    sut = new GetOrderUseCaseImpl(store);
  });

  it("should get an order successfully", async () => {
    const orderId = randomUUID();
    const orderEntity = mockOrderEntity({ id: orderId });

    store.set(orderId, orderEntity);

    const result = sut.execute(orderId);

    expect(result).not.toBeNull();
    expect(result?.id).toBe(orderId);
    expect(result?.status).toBe("CREATED");
    expect(result?.clientDocument).toBe(orderEntity.clientDocument);
  });

  it("should return null if order not exists", async () => {
    const orderId = randomUUID();
    const orderEntity = mockOrderEntity();

    store.set(orderEntity.id, orderEntity);

    const result = sut.execute(orderId);

    expect(result).toBeNull();
  });
});
