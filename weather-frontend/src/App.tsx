import { useState } from "react";
import { getForecast } from "./api";
import type { ForecastResponse } from "./types";
import "./App.css";

function App() {
  const [data, setData] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForecast, setShowForecast] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      setError(null);
      setData(null);

      const forecast = await getForecast();
      setData(forecast);
      setShowForecast(true);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Wondering if it’s sunny in Belgrade?</h1>

      {!showForecast && (
        <button className="button" onClick={handleClick} disabled={loading}>
          {loading ? "Loading..." : "Let’s see 🌤️"}
        </button>
      )}

      {error && <p className="error">{error}</p>}

      {showForecast && data && (
        <div className="forecast-container">
          {data.forecast.map((item) => (
            <div key={item.date} className="forecast-square">
              <p className="date">
                {new Date(item.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                })}
              </p>
              <p className="temp">{Math.round(item.temperature)}°C</p>
              <p className="hour">{item.hour}:00</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
