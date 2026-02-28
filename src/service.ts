import { YrResponseSchema, type YrEntry } from "./schema.js";

const API_URL =
  "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=44.8176&lon=20.4569";

const USER_AGENT =
  "weather-monitoring | https://github.com/oddzye/weather-monitoring";

const TIMEZONE = "Europe/Belgrade";
const TARGET_HOUR = 14;

const CACHE_TTL = 60 * 60 * 1000; // one hour

// TODO: improve caching type + multiple requests.
let cache: { data: any; fetchedAt: number } = { data: null, fetchedAt: 0 };

type HourlyTemperature = {
  hour: number;
  temperature: number;
};

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const hourFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIMEZONE,
  hour: "2-digit",
  hour12: false,
});

const getMapHourlyTemperatureByDate = (timeseries: YrEntry[]) => {
  const mapHourlyTemperatureByDate: Record<string, HourlyTemperature[]> = {};

  for (const entry of timeseries) {
    const utcDate = new Date(entry.time);

    const datePart = dateFormatter.format(utcDate);
    const hourPart = Number(hourFormatter.format(utcDate));

    if (!mapHourlyTemperatureByDate[datePart]) {
      mapHourlyTemperatureByDate[datePart] = [];
    }

    mapHourlyTemperatureByDate[datePart].push({
      hour: hourPart,
      temperature: entry.data.instant.details.air_temperature,
    });
  }

  return mapHourlyTemperatureByDate;
};

export async function getForecast() {
  const timePassedSinceLastRequest = Date.now() - cache.fetchedAt;

  if (cache.data && timePassedSinceLastRequest < CACHE_TTL) {
    console.log("Returning cached data");
    return cache.data;
  }

  console.log("Fetching data from yr.no...");

  const response = await fetch(API_URL, {
    headers: { "User-Agent": USER_AGENT },
  });

  if (!response.ok) {
    throw new Error(`yr.no error: ${response.status}`);
  }

  const raw = await response.json();
  const parsed = YrResponseSchema.parse(raw);
  const timeseries = parsed.properties.timeseries;

  const mapHourlyTemperatureByDate = getMapHourlyTemperatureByDate(timeseries);

  const forecast = Object.entries(mapHourlyTemperatureByDate).map(
    ([date, entries]) => {
      let closest = entries[0];
      let minDiff = Math.abs(entries[0].hour - TARGET_HOUR);

      for (let i = 1; i < entries.length; i++) {
        const diff = Math.abs(entries[i].hour - TARGET_HOUR);

        if (diff < minDiff) {
          minDiff = diff;
          closest = entries[i];
        }
      }

      return {
        date,
        temperature: closest.temperature,
        unit: "celsius",
        hour: closest.hour,
      };
    },
  );

  const result = { city: "Belgrade", forecast };

  cache = { data: result, fetchedAt: Date.now() };
  return result;
}
