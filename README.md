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

## Setup Backend

Clone the repository:
`git clone https://github.com/oddzye/weather-monitoring.git`

Go to weather-backend folder:
`cd weather-backend`

Install dependencies:
`npm install`

Run the service (localhost:3000):
`npm run dev`

Open Swagger UI:
`http://localhost:3000/docs`

## Setup Frontend

Clone the repository:
`git clone https://github.com/oddzye/weather-monitoring.git`

Go to weather-backend folder:
`cd weather-frontend`

Install dependencies:
`npm install`

Run the service (localhost:5173):
`npm run dev`

## Run Full stack app in Docker

Build and run using Docker:

1. Create and run images `docker-compose up --build`
2. Access services:

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000/forecast
- Swagger docs: http://localhost:3000/docs
