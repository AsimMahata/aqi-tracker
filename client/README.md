# 🌐 AQI Tracker Client

This is the React + Leaflet frontend for the AQI Tracker project.

## Features

- 🌍 Real-time AQI data visualization using the WAQI API
- 🗺️ Interactive map with color-coded AQI markers
- 🔎 City search and geolocation support
- 📊 AQI charts and summary tables
- 🌓 Light/Dark theme toggle
- ✉️ Contact form powered by EmailJS

## Getting Started

```bash
cd client
npm install
npm run dev
````

Then visit: [http://localhost:5173](http://localhost:5173)

## Environment Variables

Create a `.env` file in the `client/` folder:

```
VITE_TOKEN=your_waqi_api_token
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
```

## Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder.

## Project Structure

```
client/
├── public/
├── src/
│   ├── animations/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
└── .env
```

## Tech Stack

* React
* Leaflet
* Vite
* Chart.js
* EmailJS

## License

📄 MIT License


