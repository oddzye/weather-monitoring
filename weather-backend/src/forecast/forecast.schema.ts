import { Type, Static } from "@sinclair/typebox";

// Single day forecast
export const DailyForecastSchema = Type.Object({
  date: Type.String({
    description: "Date in YYYY-MM-DD format",
    example: "2026-03-01",
  }),
  temperature: Type.Number({
    description: "Temperature in Celsius",
    example: 7.3,
  }),
  unit: Type.String({
    description: "Temperature unit",
    example: "celsius",
  }),
  hour: Type.Number({
    description: "Hour selected as closest to 2PM Belgrade time",
    minimum: 0,
    maximum: 23,
    example: 14,
  }),
});

// Forecast response
export const ForecastResponseSchema = Type.Object({
  city: Type.String({
    description: "City name",
    example: "Belgrade",
  }),
  forecast: Type.Array(DailyForecastSchema),
});

export const ForecastResponseErrorSchema = Type.Object({
  error: Type.String({
    description: "Error message",
    example: "Failed to fetch forecast",
  }),
});

export type DailyForecast = Static<typeof DailyForecastSchema>;
export type ForecastResponse = Static<typeof ForecastResponseSchema>;
export type HourlyTemperature = {
  hour: number;
  temperature: number;
};
