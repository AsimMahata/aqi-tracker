
# 🌍 AQI Tracker

**Real-Time Air Quality Monitoring**

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-green)
![Vite](https://img.shields.io/badge/Vite-5.0.0-purple)

AQI Tracker is a full-stack web application for monitoring real-time Air Quality Index (AQI) data across cities worldwide.  
The frontend is built with **React**, **Vite**, and **Leaflet**. The backend uses **Node.js**, **Express**, and **MongoDB**.

---

## ✨ Features

- 🌍 Real-time AQI data from WAQI API
- 🗺️ Interactive map with color-coded AQI markers
- 🔍 City search using OpenStreetMap + geolocation support
- 📊 Charts and AQI tables for quick insights
- 🌗 Light/Dark theme toggle
- 📬 Contact form via EmailJS
- 🧠 Backend with REST API for CRUD + cleanup logic
- 🗃️ MongoDB storage with city-level AQI records

---

## ⚙️ How It Works

- Frontend fetches real-time AQI data using WAQI API based on location or city search
- Backend allows inserting, querying, and cleaning data via RESTful APIs
- Geolocation uses browser's native API + OpenStreetMap Nominatim for city queries

> **Disclaimer**: AQI is based on the nearest station — actual air quality may differ slightly from your location.

---

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js (v16+)
- npm or yarn

---

### ▶️ Clone the Repository

```bash
git clone https://github.com/AsimMahata/aqi-tracker.git
cd aqi-tracker
````

---

### 🖥️ Setup Client (Frontend)

```bash
cd client
npm install
npm run dev
```

Create a `.env` file in `client/`:

```
VITE_TOKEN=your_waqi_api_token
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
```

👉 **Get your own WAQI API token here**: [https://aqicn.org/api/](https://aqicn.org/api/)

Frontend runs at: [http://localhost:5173](http://localhost:5173)

---

### 🛠️ Setup Server (Backend)

```bash
cd server
npm install
node server.js
```

Create a `.env` file in `server/`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Backend runs at: [http://localhost:5000](http://localhost:5000)

---

## 🔗 API Endpoints

| Method | Route      | Description                       |
| ------ | ---------- | --------------------------------- |
| GET    | `/ping`    | Health check                      |
| GET    | `/healthz` | Another health check              |
| GET    | `/cities`  | Fetch list of all stored cities   |
| GET    | `/aqi`     | Get AQI for specific hour         |
| GET    | `/avgaqi`  | Get average AQI for a given date  |
| POST   | `/insert`  | Insert a new AQI record           |
| DELETE | `/cleanup` | Delete AQI data older than 8 days |
| GET    | `/search`  | Search cities via OSM Nominatim   |

---

## 📁 Folder Structure

```
aqi-tracker/
├── client/               # React + Leaflet frontend
│   ├── public/
│   └── src/
│       ├── animations/   # Lottie files
│       ├── assets/       # Icons and images
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       ├── services/
│       ├── styles/
│       ├── App.jsx
│       └── main.jsx
│   ├── .env
│   └── package.json

├── server/               # Node + Express backend
│   ├── .env
│   └── server.js

├── .gitignore
├── LICENSE
└── README.md
```

---

## 🧪 Deployment

### 📦 Frontend on Vercel

* Root Directory: `client`
* Build Command: `npm run build`
* Output Directory: `dist`

### 🌐 Backend on Render

* Root Directory: `server`
* Start Command: `node server.js`
* Add `MONGO_URI` as an environment variable

---

## 🎨 Credits

* 🌐 [WAQI API](https://aqicn.org/api/) — for real-time AQI data
* 🗺️ [Leaflet](https://leafletjs.com/) — for map visualizations
* 📈 [Chart.js](https://www.chartjs.org/) — for AQI graphs
* 🗂️ [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org/) — for city search
* 🎞️ [Lottie Animations](https://lottiefiles.com/)

  * 🌍 Earth Logo: [Earth Globe Loop](https://lottiefiles.com/free-animation/earth-globe-rotating-with-seamless-loop-animation-SKugdic58u)
  * 🏭 Loading Animation: [Pollution Factory](https://lottiefiles.com/free-animation/factory-pollution-city-air-and-water-aqy1qPDdBX)

---

## 📄 License

MIT License

---

##  Acknowledgment

Thanks to the WAQI team, open-source contributors, and the developer community
for making tools like these accessible and powerful.

**Made with care for a cleaner, healthier world.**


