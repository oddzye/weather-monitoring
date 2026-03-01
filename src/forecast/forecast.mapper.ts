import { HourlyTemperature, ForecastResponse } from "./forecast.schema.js";
import { YrEntry } from "../schema.js";
import { dateFormatter, hourFormatter } from "../time.js";

export const getMapHourlyTemperatureByDate = (timeseries: YrEntry[]) => {
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

export const getClosestHourlyTemperature = (
  hourlyTemperatures: HourlyTemperature[],
  targetHour: number,
) => {
  let closest = hourlyTemperatures[0];
  let minDiff = Math.abs(hourlyTemperatures[0].hour - targetHour);

  for (let i = 1; i < hourlyTemperatures.length; i++) {
    const diff = Math.abs(hourlyTemperatures[i].hour - targetHour);

    if (diff < minDiff) {
      minDiff = diff;
      closest = hourlyTemperatures[i];
    }
  }

  return closest;
};

export const buildForecastResponse = (
  timeseries: YrEntry[],
  targetHour: number,
): ForecastResponse => {
  const mapHourlyTemperatureByDate = getMapHourlyTemperatureByDate(timeseries);

  const forecast = Object.entries(mapHourlyTemperatureByDate).map(
    ([date, hourlyTemperatures]) => {
      const closestHourlyTemperature = getClosestHourlyTemperature(
        hourlyTemperatures,
        targetHour,
      );

      return {
        date,
        temperature: closestHourlyTemperature.temperature,
        unit: "celsius",
        hour: closestHourlyTemperature.hour,
      };
    },
  );

  return { city: "Belgrade", forecast };
};
