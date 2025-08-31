import type { RequestEntity, RequestItems } from "../entity";

export interface ICreateRequestUseCaseInput {
  clientDocument: string;
  items: RequestItems;
}

export interface ICreateRequestUseCase {
  execute: (input: ICreateRequestUseCaseInput) => Promise<RequestEntity>;
}
