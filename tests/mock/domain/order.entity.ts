import { OrderEntity } from "@/domain/entity";
import { faker } from "@faker-js/faker";
import { randomUUID } from "node:crypto";

export function mockOrderEntity(overrides?: Partial<OrderEntity>): OrderEntity {
  return OrderEntity.build(
    overrides?.id ?? randomUUID(),
    overrides?.clientDocument ?? faker.number.int(14).toString(),
    overrides?.items ?? [
      {
        name: faker.commerce.productName(),
      },
    ],
    overrides?.status ?? "CREATED"
  );
}
