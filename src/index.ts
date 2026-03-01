import Fastify from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { getForecast } from "./service.js";

import {
  ForecastResponseErrorSchema,
  ForecastResponseSchema,
} from "./forecast/forecast.schema.js";

const app = Fastify({ logger: true });

await app.register(cors, { origin: "*" });

// Swagger (OpenAPI) docs.
await app.register(swagger, {
  openapi: {
    info: {
      title: "Belgrade Weather API",
      description:
        "Provides daily temperature forecasts for Belgrade at around 2 pm",
      version: "1.0.0",
    },
    servers: [
      { url: "http://localhost:3000", description: "Belgrade Weather API" },
    ],
  },
});

// Register Swagger UI to serve docs at /docs
await app.register(swaggerUI, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  staticCSP: true,
});

app.get(
  "/forecast",
  {
    schema: {
      description: "Get daily forecast in Belgrade",
      tags: ["Forecast"],
      response: {
        200: ForecastResponseSchema,
        500: ForecastResponseErrorSchema,
      },
    },
  },
  async (_, reply) => {
    try {
      const data = await getForecast();
      return reply.send(data);
    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({ error: "Failed to fetch forecast" });
    }
  },
);

app.get(
  "/health",
  {
    schema: {
      description: "Service health check",
    },
  },
  async () => {
    return { status: "ok" };
  },
);

await app.listen({ port: 3000, host: "0.0.0.0" });
