import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/MapView.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import CitySearch from "../components/CitySearch";
import { PopUp } from "../components/PopUp";
import { LoadingPage } from "./LoadingPage";
import axios from "axios";
import {
  fetchAQIFromDBForCities,
  fetchAQIFromAPIForCities,
  updateMissingData,
  fetchCities,
  getAQIColorIcon,
} from "../services/aqiServices";
import { getAQIColor } from "../services/utility";

// Default Leaflet icon configuration
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [20, 33],
  shadowSize: [33, 33],
  iconAnchor: [10, 33],
  shadowAnchor: [10, 33],
  popupAnchor: [0, -33],
});

L.Marker.prototype.options.icon = DefaultIcon;
const TOKEN = import.meta.env.VITE_TOKEN;

// Initialize map view and size
function MapInitializer() {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
    map.setView([20.5937, 78.9629], 4);
  }, [map]);
  return null;
}

// Handle map location updates
function MapHandler({ location }) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      const [lat, lon] = location;
      map.flyTo([lat, lon], 12, {
        duration: 0.7,
      });
    }
  }, [location]);

  return null;
}

// Main map view component with AQI data and user interactions
function MapView({ searchQuery, setSearchQuery, setCurrentCity }) {
  const [refresh, setRefresh] = useState(false);
  const [cityData, setCityData] = useState([]);
  const [yourLocationCity, setYourLocationCity] = useState(null);
  const [userLocationCoords, setUserLocationCoords] = useState(null);
  const [showPanel, setShowPanel] = useState(false);
  const [hideMarkers, setHideMarkers] = useState(false);
  const [hideUserMarkers, setHideUserMarkers] = useState(false);
  const [hideUserAQI, setHideUserAQI] = useState(false);
  const [userCityData, setUserCityData] = useState(() => {
    try {
      const saved = localStorage.getItem("userAddedCities");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn("Failed to parse localStorage data", e);
      return [];
    }
  });
  const [isAppLoading, setIsAppLoading] = useState(true);

  // Loading screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Daily cleanup trigger at 12 PM
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();

      if (hour === 12 && minute <= 5) {
        const lastRun = localStorage.getItem("cleanup_trigger_date");
        const today = now.toISOString().slice(0, 10);

        if (lastRun !== today) {
          localStorage.setItem("cleanup_trigger_date", today);

          axios
            .delete("https://aqi-tracker-backend-etz8.onrender.com/cleanup")
            .then(() => {
              console.log("Cleanup triggered at 12 PM");
            })
            .catch((err) => {
              console.error("Cleanup failed:", err.message);
            });
        }
      }
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Get user's current location
  const handleLocateUser = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setUserLocationCoords([lat, lon]);

        const newCity = {
          name: "Your Location",
          position: [lat, lon],
          latitude: lat.toString(),
          longitude: lon.toString(),
          aqi: null,
        };

        const exists = userCityData.some(
          (city) => city.name === "Your Location"
        );
        if (!exists) {
          setUserCityData([...userCityData, newCity]);
          setRefresh((r) => !r);
        }
      },
      (error) => {
        console.error("Location permission denied or unavailable.");
        console.warn("Geolocation error:", error.message);
      }
    );
  };

  // Save user cities to localStorage
  useEffect(() => {
    localStorage.setItem("userAddedCities", JSON.stringify(userCityData));
  }, [userCityData]);

  // Update user city data with fresh AQI values
  useEffect(() => {
    const time = new Date().getHours();
    const needUpdate = userCityData.some((city) => city.time != time);
    const oldData = [...userCityData].map((city) => {
      if (needUpdate) {
        return { ...city, aqi: null };
      }
      return city;
    });
    const loadData = async () => {
      const cities = await fetchAQIFromAPIForCities(oldData, TOKEN);
      const updatedCityData = cities.map((city) => ({ ...city, time }));
      setUserCityData(updatedCityData);
      const userLocation = updatedCityData.filter(
        (city) => city.name === "Your Location"
      );
      setYourLocationCity(userLocation?.[0]);
    };
    loadData();
  }, [refresh]);

  // Load and update main city data
  useEffect(() => {
    const loadData = async () => {
      const USE_DB = true;
      const allCities = await fetchCities();
      const currentCities = allCities.data.map((city) => {
        const position = [
          parseFloat(city.latitude),
          parseFloat(city.longitude),
        ];
        return { ...city, position };
      });
      const dbResults = USE_DB
        ? await fetchAQIFromDBForCities(currentCities)
        : currentCities;
      setCityData(dbResults);

      const needsUpdate = dbResults.some((city) => city.aqi == null);

      if (needsUpdate) {
        console.error("need update but why ");
        const apiResults = await fetchAQIFromAPIForCities(dbResults, TOKEN);
        setCityData(apiResults);
        await updateMissingData(dbResults, apiResults);
      }
    };

    loadData();
  }, []);

  // Remove user-added city
  function handleDeleteCity(index) {
    setUserCityData((prevCities) => prevCities.filter((_, i) => i !== index));
    const popupCloseBtn = document.querySelector(
      ".leaflet-container a.leaflet-popup-close-button"
    );
    if (popupCloseBtn) popupCloseBtn.click();
    setRefresh((r) => !r);
  }

  if (isAppLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="main-map-container">
      <MapContainer
        center={[20, 0]}
        zoom={3}
        minZoom={2.5}
        maxZoom={15}
        style={{ height: "100%", width: "100%" }}
        maxBounds={[
          [-85, -180],
          [85, 180],
        ]}
        maxBoundsViscosity={1.0}
      >
        <MapInitializer />
        <MapHandler location={userLocationCoords} />
        <CitySearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          userCityData={userCityData}
          setUserCityData={setUserCityData}
          setRefresh={setRefresh}
        />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
          noWrap={true}
        />

        {/* Render city markers */}
        {!hideMarkers &&
          cityData?.map((city, idx) => (
            <Marker
              key={`city-${idx}`}
              position={city.position}
              icon={getAQIColorIcon(city.aqi)}
              cityAQI={city.aqi}
            >
              <PopUp
                city={city}
                idx={idx}
                handleOnclick={null}
                setCurrentCity={setCurrentCity}
                isLocal={false}
              />
            </Marker>
          ))}

        {/* Render user-added markers */}
        {!hideUserMarkers &&
          userCityData?.map((city, idx) => {
            if (!city) return null;
            return (
              <Marker
                key={`user-${idx}`}
                position={city.position}
                icon={getAQIColorIcon(city.aqi)}
                cityAQI={city.aqi}
              >
                <PopUp
                  city={city}
                  idx={idx}
                  handleOnclick={handleDeleteCity}
                  setCurrentCity={setCurrentCity}
                  isLocal={true}
                />
              </Marker>
            );
          })}
      </MapContainer>

      {/* Location button */}
      <button className="locate-button" onClick={handleLocateUser}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 122.88 122.88"
          fill="currentColor"
          width="20"
          height="20"
        >
          <path
            d="M68.23,13.49c10.44,1.49,19.79,6.36,26.91,13.48c7.29,7.29,12.23,16.93,13.58,27.68h14.17v13.58h-14.39 
    c-1.62,10.13-6.42,19.2-13.36,26.13c-7.11,7.11-16.47,11.99-26.91,13.48v15.04H54.65v-15.04c-10.44-1.49-19.79-6.36-26.9-13.48 
    c-6.94-6.94-11.74-16-13.36-26.13H0V54.65h14.16c1.35-10.75,6.29-20.39,13.58-27.68c7.11-7.11,16.46-11.99,26.9-13.48V0h13.58 
    V13.49L68.23,13.49z M61.44,35.41c13.95,0,25.25,11.31,25.25,25.25c0,13.95-11.31,25.25-25.25,25.25 
    c-13.95,0-25.25-11.31-25.25-25.25C36.19,46.72,47.49,35.41,61.44,35.41L61.44,35.41z M89,33.11
    c-7.05-7.05-16.8-11.42-27.56-11.42c-10.76,0-20.51,4.36-27.56,11.42c-7.05,7.05-11.42,16.8-11.42,27.56
    c0,10.76,4.36,20.51,11.42,27.56c7.05,7.05,16.8,11.42,27.56,11.42c10.76,0,20.51-4.36,27.56-11.42
    c7.05-7.05,11.42-16.8,11.42-27.56C100.41,49.9,96.05,40.16,89,33.11L89,33.11z"
          />
        </svg>
      </button>

      {/* User location AQI display */}
      {yourLocationCity && !hideUserAQI && (
        <div
          className="your-location"
          style={{
            border: `2px solid ${getAQIColor(yourLocationCity?.aqi) ?? "#000"}`,
          }}
        >
          {yourLocationCity.aqi != null ? (
            <div>
              <strong>Your Location AQI </strong>
              <div className="aqi-container-live">
                <span className="blinking-dot"> </span>
                <span
                  style={{
                    color: getAQIColor(yourLocationCity.aqi),
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                  }}
                >
                  {yourLocationCity.aqi}
                </span>
              </div>
            </div>
          ) : (
            "Fetching AQI..."
          )}
        </div>
      )}

      {/* Options panel toggle */}
      <div className="options" onClick={() => setShowPanel(f=>!f)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
          />
        </svg>
      </div>

      {/* Options panel */}
     {showPanel && <div className="options-panel">
        <div className="option-item">
          <label>
            <input
              type="checkbox"
              checked={hideMarkers}
              onChange={(e) => setHideMarkers(e.target.checked)}
            />
            Hide City Markers
          </label>
        </div>
        <div className="option-item">
          <label>
            <input
              type="checkbox"
              checked={hideUserMarkers}
              onChange={(e) => setHideUserMarkers(e.target.checked)}
            />
            Hide User Markers
          </label>
        </div>
        <div className="option-item">
          <label>
            <input
              type="checkbox"
              checked={hideUserAQI}
              onChange={(e) => setHideUserAQI(e.target.checked)}
            />
            Hide User AQI
          </label>
        </div>
      </div>}
    </div>
  );
}

export default MapView;
