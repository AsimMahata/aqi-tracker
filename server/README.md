
#  🌐 AQI Tracker Server

This is the Node.js + Express backend for the AQI Tracker project. It stores and serves air quality data using MongoDB.

## Features

-  Insert AQI records manually
-  Fetch AQI by city, date, and hour
-  Get average AQI for a day
-  Delete old AQI records (older than 8 days)
-  City search using OpenStreetMap
-  Health check endpoints

## Getting Started

```bash
cd server
npm install
node server.js
````

Server runs at: [http://localhost:5000](http://localhost:5000)

## Environment Variables

Create a `.env` file in the `server/` folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

## API Endpoints

* `GET /ping` – Health check
* `GET /healthz` – Health check
* `GET /cities` – Get all cities
* `GET /aqi?id=city_id&date=YYYY-MM-DD&hour=H` – Get AQI for one hour
* `GET /avgaqi?id=city_id&date=YYYY-MM-DD` – Get average AQI for a day
* `POST /insert` – Insert new AQI record (JSON body)
* `DELETE /cleanup` – Delete AQI data older than 8 days
* `GET /search?q=cityname` – Search cities via OpenStreetMap

## Tech Stack

* Node.js
* Express
* MongoDB
* Axios
* dotenv
* CORS

## License

📄 MIT License


