import { CreateOrderUseCaseImpl } from "@/application/usecase";
import { ICreateOrderUseCase } from "@/domain/usecase";
import { IKafkaClient } from "@/main/clients";
import store from "@/main/repository/data-in-memory.repository";
import { mockCreateOrderUseCaseInput } from "@tests/mock";
import { mock } from "jest-mock-extended";

describe("CreateOrderUseCase", () => {
  let sut: ICreateOrderUseCase;
  const kafkaClient = mock<IKafkaClient>();

  beforeEach(() => {
    sut = new CreateOrderUseCaseImpl(store, kafkaClient);
  });

  it("should create an order successfully", async () => {
    const input = mockCreateOrderUseCaseInput();

    const result = await sut.execute(input);

    expect(result.id).toBeDefined();
    expect(result.status).toBe("CREATED");
    expect(result.clientDocument).toBe(input.clientDocument);
  });
});
