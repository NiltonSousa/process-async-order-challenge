FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig*.json ./
COPY tsup.config.* ./
COPY src ./src

RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

ENV KAFKA_TOPIC_ORDERS_REQUEST=orders-request.v0
ENV KAFKA_CLIENT_ID=my-app
ENV KAFKA_BROKERS=172.17.0.1:9093
ENV DELAY_IN_SECONDS=2_000

EXPOSE 3000
CMD ["node", "dist/main/server.js"]
