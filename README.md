# 🌍 AQI Tracker

**Real-Time Air Quality Monitoring**

![AQI Tracker](https://img.shields.io/badge/React-18.2.0-blue)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-green)
![Vite](https://img.shields.io/badge/Vite-5.0.0-purple)

AQI Tracker is a full-stack web application for monitoring real-time Air Quality Index (AQI) data across cities worldwide.  
The frontend is built with React and Leaflet, and the backend uses Node.js, Express, and MongoDB.

---

## ✨ Features

- Real-time AQI data from the WAQI API
- Interactive map with color-coded AQI markers
- City search and automatic geolocation
- AQI charts and simple tables
- Light/Dark theme toggle
- Contact form with EmailJS
- REST API endpoints for CRUD operations
- MongoDB for persistent storage

---

## ⚙️ How It Works

- The frontend fetches real-time AQI data from the WAQI API using coordinates or city names.
- The backend allows manual data insertions, daily averages, and cleanup via RESTful APIs.
- City search uses OpenStreetMap Nominatim.

> Disclaimer: Data comes from the nearest AQI station, which may not reflect precise conditions at your location.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Clone the Repository

```bash
git clone https://github.com/yourusername/aqi-tracker.git
cd aqi-tracker
````

---

### Setup Client (Frontend)

```bash
cd client
npm install
npm run dev
```

Create a `.env` in `client/`:

```
VITE_TOKEN=your_waqi_api_token
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
```

Runs on: [http://localhost:5173](http://localhost:5173)

---

### Setup Server (Backend)

```bash
cd server
npm install
node server.js
```

Create a `.env` in `server/`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Runs on: [http://localhost:5000](http://localhost:5000)

---

## 🔗 API Endpoints (Server)

* `GET /ping` – Health check
* `GET /healthz` – Health check
* `GET /cities` – Get all cities
* `GET /aqi?id=city_id&date=YYYY-MM-DD&hour=H` – Get AQI for a specific hour
* `GET /avgaqi?id=city_id&date=YYYY-MM-DD` – Get average AQI for a date
* `POST /insert` – Insert a new AQI record
* `DELETE /cleanup` – Delete data older than 8 days
* `GET /search?q=cityname` – Search cities via OpenStreetMap

---

## 📁 Folder Structure

```
aqi-tracker/
├── client/           # React + Leaflet frontend
│   ├── public/
│   └── src/
│       ├── animations/
│       ├── assets/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       ├── services/
│       ├── styles/
│       ├── App.jsx
│       └── main.jsx
│   ├── .env
│   └── package.json

├── server/           # Express + MongoDB backend
│   ├── .env
│   └── server.js

├── .gitignore
├── LICENSE
└── README.md
```

---

## 🧪 Deployment

### Vercel (Frontend)

* Root Directory: `client`
* Build Command: `npm run build`
* Output Directory: `dist`

### Render (Backend)

* Root Directory: `server`
* Start Command: `node server.js`
* Add `MONGO_URI` in the environment settings

---

## 🎨 Credits

* WAQI API – for real-time AQI data
* Leaflet – for interactive maps
* Chart.js – for AQI visualization
* Lottie – for animations
* OpenStreetMap Nominatim – for city search

---

## 📄 License

MIT License

---

**Made with care for a cleaner, healthier world.**



