FROM node:20-alpine AS builder

WORKDIR /app

# Build
COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

# Runtime
FROM node:20-alpine

WORKDIR /app

RUN addgroup -S app && adduser -S app -G app

COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist

USER app

EXPOSE 3000

CMD ["node", "dist/index.js"]