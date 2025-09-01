import type { OrderEntity } from "@/domain/entity";
import type {
  ICreateOrderUseCase,
  ICreateOrderUseCaseInput,
} from "@/domain/usecase";

export class CreateOrderUseCaseImpl implements ICreateOrderUseCase {
  async execute(input: ICreateOrderUseCaseInput): Promise<OrderEntity> {}
}
