# Belgrade Weather Service

A small service that provides daily weather forecasts for Belgrade. The service fetches data from the [yr.no](https://www.yr.no/) API and returns the temperature closest to 14:00 (or the nearest available hour) for each day.

## Features

- Returns daily forecast with:
  - Date (`YYYY-MM-DD`)
  - Temperature in Celsius
  - Hour selected as closest to 14:00
- Cached responses to reduce repeated calls to yr.no
- Swagger/OpenAPI documentation for easy exploration

## API

Swagger UI is available at: http://localhost:3000/docs

You can use it to view and test endpoints, including the `/forecast` endpoint.

### Example Response (`GET /forecast`)

```json
{
  "city": "Belgrade",
  "forecast": [
    {
      "date": "2026-03-01",
      "temperature": 14.6,
      "unit": "celsius",
      "hour": 16
    },
    {
      "date": "2026-03-02",
      "temperature": 13.7,
      "unit": "celsius",
      "hour": 14
    }
  ]
}
```

## Setup

Clone the repository:
`git clone https://github.com/oddzye/weather-monitoring.git`

Install dependencies:
`npm install`

Run the service:
`npm run dev`

Open Swagger UI:
`http://localhost:3000/docs`

## Docker

Build and run using Docker:

1. Create an image `docker build -t belgrade-weather .`
2. Run image in a container `docker run -p 3000:3000 belgrade-weather`
