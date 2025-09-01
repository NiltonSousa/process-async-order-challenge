# Stage 1: build
FROM node:20-alpine AS build
WORKDIR /app

# Instalação com cache eficiente
COPY package*.json ./
RUN npm ci

# Copiar configs e código
COPY tsconfig*.json ./
COPY tsup.config.* ./
COPY src ./src

# Build com tsup
RUN npm run build

# Stage 2: runtime mínimo
FROM node:20-alpine AS runtime
WORKDIR /app

# Apenas deps de produção
COPY package*.json ./
RUN npm ci --omit=dev

# Artefatos do build
COPY --from=build /app/dist ./dist

ENV KAFKA_TOPIC_ORDERS_REQUEST=orders-request.v0
ENV KAFKA_CLIENT_ID=my-app
ENV KAFKA_BROKERS=172.17.0.1:9093
ENV DELAY_IN_SECONDS=2_000

EXPOSE 3000
CMD ["node", "dist/main/server.js"]
