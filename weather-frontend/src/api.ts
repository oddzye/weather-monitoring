import type { ForecastResponse } from "./types";

export async function getForecast(): Promise<ForecastResponse> {
  const response = await fetch(`http://localhost:3000/forecast`);

  if (!response.ok) {
    throw new Error("Failed to fetch forecast");
  }

  return response.json();
}
