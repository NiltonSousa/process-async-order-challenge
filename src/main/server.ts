import Fastify from "fastify";
import { createOrderHandler, getOrderHandler } from "./handlers";
import { processOrderConsumerHandler } from "./handlers/consumer-order-request";

const fastify = Fastify({
  logger: true,
});

fastify.post("/pedidos", createOrderHandler);
fastify.get("/pedidos/:order_id", getOrderHandler);

try {
  await fastify.listen({ port: 3000, host: "0.0.0.0" });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}

processOrderConsumerHandler().catch((err: unknown) => {
  console.error("Consumer failed:", err);
  process.exit(1);
});
