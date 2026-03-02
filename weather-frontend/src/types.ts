export interface ForecastItem {
  date: string;
  temperature: number;
  unit: "celsius";
  hour: number;
}

export interface ForecastResponse {
  timezone: string;
  forecast: ForecastItem[];
}
