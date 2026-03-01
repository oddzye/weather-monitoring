import Fastify from "fastify";
import cors from "@fastify/cors";
import { getForecast } from "./service.js";

const app = Fastify({ logger: true });

await app.register(cors, { origin: "*" });

app.get("/forecast", async (_, reply) => {
  try {
    const data = await getForecast();
    return reply.send(data);
  } catch (error) {
    app.log.error(error);
    return reply.status(500).send({ error: "Failed to fetch forecast" });
  }
});

app.get("/health", async () => {
  return { status: "ok" };
});

await app.listen({ port: 3000, host: "0.0.0.0" });
