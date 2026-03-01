export type ForecastResponse = {
  city: string;
  forecast: DailyForecast[];
};

export type DailyForecast = {
  date: string;
  temperature: number;
  unit: "celsius";
  hour: number;
};

export type HourlyTemperature = {
  hour: number;
  temperature: number;
};

export type Cache<T> = {
  data: T | null;
  fetchedAt: number;
};
