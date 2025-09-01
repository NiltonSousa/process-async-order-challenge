import type { ICreateOrderUseCaseInput } from "@/domain/usecase";
import type { FastifyRequest, FastifyReply } from "fastify";
import { makeCreateOrderUseCase, makeGetOrderUseCase } from "../factories";

export async function createOrderHandler(
  request: FastifyRequest<{ Body: ICreateOrderUseCaseInput }>,
  reply: FastifyReply
): Promise<void> {
  try {
    const usecase = makeCreateOrderUseCase();

    const input: ICreateOrderUseCaseInput = {
      clientDocument: request.body.clientDocument,
      items: request.body.items,
    };

    const result = await usecase.execute(input);

    reply.status(202).send(result);
  } catch (error: unknown) {
    reply
      .status(500)
      .send({ message: (error as Error).message || "Internal server error" });
  }
}

export function getOrderHandler(
  request: FastifyRequest<{ Params: { order_id: string } }>,
  reply: FastifyReply
): void {
  try {
    const usecase = makeGetOrderUseCase();

    const result = usecase.execute(request.params.order_id);

    if (!result) {
      reply.status(404).send({ message: "Order not found" });
      return;
    }

    reply.status(200).send(result);
  } catch (error: unknown) {
    reply
      .status(500)
      .send({ message: (error as Error).message || "Internal server error" });
  }
}
