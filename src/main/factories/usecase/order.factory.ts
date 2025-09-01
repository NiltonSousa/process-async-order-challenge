import { CreateOrderUseCaseImpl } from "@/application/usecase";
import { GetOrderUseCaseImpl } from "@/application/usecase/get-order";
import kafkaClient from "@/main/clients/kafka-client";
import store from "@/main/repository/data-in-memory.repository";

export function makeCreateOrderUseCase(): CreateOrderUseCaseImpl {
  return new CreateOrderUseCaseImpl(store, kafkaClient);
}

export function makeGetOrderUseCase(): GetOrderUseCaseImpl {
  return new GetOrderUseCaseImpl(store);
}
