import { YrResponseSchema } from "./schema.js";
import { Cache } from "./types.js";
import { ForecastResponse } from "./forecast/forecast.schema.js";
import { API_URL, USER_AGENT, TARGET_HOUR, CACHE_TTL } from "./config.js";
import { buildForecastResponse } from "./forecast/forecast.mapper.js";

let cache: Cache<ForecastResponse> = { data: null, fetchedAt: 0 };

export async function getForecast() {
  const timePassedSinceLastRequest = Date.now() - cache.fetchedAt;

  if (cache.data && timePassedSinceLastRequest < CACHE_TTL) {
    console.log("Returning cached data");
    return cache.data;
  }

  console.log("Fetching data from yr.no...");

  console.log("USER_AGENT:", USER_AGENT);

  const yrNoResponse = await fetch(API_URL, {
    headers: { "User-Agent": USER_AGENT },
  });

  if (!yrNoResponse.ok) {
    throw new Error(`yr.no error: ${yrNoResponse.status}`);
  }

  const raw = await yrNoResponse.json();
  const parsed = YrResponseSchema.parse(raw);

  const timeseries = parsed.properties.timeseries;
  const forecastResponse = buildForecastResponse(timeseries, TARGET_HOUR);

  cache = { data: forecastResponse, fetchedAt: Date.now() };

  console.log(JSON.stringify(forecastResponse, null, 2));
  return forecastResponse;
}
