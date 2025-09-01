import { ICreateOrderUseCaseInput } from "@/domain/usecase";
import { faker } from "@faker-js/faker";

export function mockCreateOrderUseCaseInput(
  overrides?: Partial<ICreateOrderUseCaseInput>
): ICreateOrderUseCaseInput {
  return {
    clientDocument: faker.number.int(14).toString(),
    items: [
      {
        name: faker.commerce.productName(),
      },
    ],
    ...overrides,
  };
}
