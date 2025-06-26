import React, { useState, useEffect } from "react";
import {
  FaAirFreshener,
  FaCity,
  FaChartLine,
  FaThermometerHalf,
  FaClock,
  FaCloudSun,
  FaWind,
  FaCompass
} from "react-icons/fa";
import { NotFound } from "./NotFound";
import "../styles/MoreInfo.css";
import { Line } from "react-chartjs-2";
import { getAQIClassAndLabel, getAQIColor } from "../services/utility";
import { useThemeChange } from "../hooks/useThemeChange";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const fetchMoreInfo = async ({ lat, lng }) => {
  const token = import.meta.env.VITE_TOKEN;
  const url = `https://api.waqi.info/feed/geo:${lat};${lng}/?token=${token}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === "ok") {
      return data.data;
    } else {
      console.warn("API Error:", data.message);
    }
  } catch (err) {
    console.error("Fetch failed:", err);
  }
};

export const MoreInfo = ({ currentCity }) => {
  const [allInformation, setAllInformation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { cardBg, textPrimary, borderColor } = useThemeChange();

  useEffect(() => {
    if (!currentCity) return;
    const lat = currentCity.position[0];
    const lng = currentCity.position[1];

    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchMoreInfo({ lat, lng });
      setAllInformation(data);
      setIsLoading(false);
    };

    fetchData();
  }, [currentCity]);

  if (!currentCity) {
    return <NotFound />;
  }

  const formatNumber = (num) => {
    if (num === undefined || num === null) return "N/A";
    return Number(num).toFixed(2);
  };

  const formatPollutantLabel = (label) => {
    const weatherLabels = {
      t: ["Temperature (°C)", <FaThermometerHalf />],
      w: ["Wind Speed (km/h)", <FaWind />],
      wg: ["Wind Gust (km/h)", <FaWind />],
      wd: ["Wind Direction (°)", <FaCompass />],
    };
    const lower = label.toLowerCase();
    if (weatherLabels[lower]) return <>{weatherLabels[lower][1]} {weatherLabels[lower][0]}</>;

    const match = label.match(/([A-Za-z]+)(\d+\.?\d*)/);
    if (match) {
      const [, letters, numbers] = match;
      return (
        <span>
          <span>{letters.toUpperCase()}</span>
          <span style={{ fontSize: "0.75em", verticalAlign: "sub" }}>
            {numbers == 25 ? 2.5 : numbers}
          </span>
        </span>
      );
    }
    return label.toUpperCase();
  };

  const isWeatherKey = (key) => ["t", "w", "wg", "wd"].includes(key.toLowerCase());

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading air quality data...</p>
      </div>
    );
  }

  const weatherIndicators = [];
  const pollutantIndicators = [];

  if (allInformation?.iaqi) {
    Object.entries(allInformation.iaqi).forEach(([key, val]) => {
      const item = (
        <div key={key} className="indicator-item">
          <span className="indicator-label">{formatPollutantLabel(key)}</span>
          <span className="indicator-value">{formatNumber(val.v)}</span>
        </div>
      );
      if (isWeatherKey(key)) {
        weatherIndicators.push(item);
      } else {
        pollutantIndicators.push(item);
      }
    });
  }

  return (
    <div className="info-container">
      <div className="info-hero">
        <h1>Air Quality Details for {currentCity.name}</h1>
        <p className="last-update">
          Last updated: {allInformation?.time?.s ?? "N/A"}
        </p>
      </div>

      <div className="info-content">
        <div className="aqi-card">
          <div className="card-header">
            <FaAirFreshener className="card-icon" />
            <h3>Air Quality Index</h3>
          </div>
          <div className={`aqi-value-info ${getAQIClassAndLabel(allInformation?.aqi).className}`}>
            <span style={{ color: getAQIColor(allInformation?.aqi) }}>
              {formatNumber(allInformation?.aqi)}
            </span>
          </div>
          <div className="aqi-status">
            <span style={{ color: getAQIColor(allInformation?.aqi) }}>
              {getAQIClassAndLabel(allInformation?.aqi).label}
            </span>
          </div>
          <p className="dominant-pollutant">
            Dominant Pollutant: {formatPollutantLabel(allInformation?.dominentpol)}
          </p>
        </div>

        <div className="info-grid">
          <section className="info-card">
            <div className="card-header">
              <FaCity className="card-icon" />
              <h3>Station Details</h3>
            </div>
            <div className="card-content">
              <p>
                <strong>Station Name:</strong> {allInformation?.city?.name ?? "N/A"}
              </p>
              <p>
                <strong>Location:</strong> {allInformation?.city?.geo?.join(", ") ?? "N/A"}
              </p>
              {allInformation?.city?.url && (
                <a
                  href={allInformation.city.url}
                  target="_blank"
                  rel="noreferrer"
                  className="external-link"
                >
                  View Official Data
                </a>
              )}
            </div>
          </section>

          {pollutantIndicators.length > 0 && (
            <section className="info-card">
              <div className="card-header">
                <FaChartLine className="card-icon" />
                <h3>Air Quality Indicators</h3>
              </div>
              <div className="indicators-grid">{pollutantIndicators}</div>
            </section>
          )}

          {weatherIndicators.length > 0 && (
            <section className="info-card">
              <div className="card-header">
                <FaThermometerHalf className="card-icon" />
                <h3>Weather Info</h3>
              </div>
              <div className="indicators-grid">{weatherIndicators}</div>
            </section>
          )}
          </div>
          <section className="info-card">
            <div className="card-header">
              <FaClock className="card-icon" />
              <h3>Time Information</h3>
            </div>
            <div className="card-content">
              <p>
                <strong>Last Update:</strong> {allInformation?.time?.s ?? "N/A"}
              </p>
              <p>
                <strong>Timezone:</strong> {allInformation?.time?.tz ?? "N/A"}
              </p>
            </div>
          </section>

        {allInformation?.forecast?.daily && (
          <div className="forecast-section">
            <div className="forecast-chart">
              <div className="card-header">
                <FaCloudSun className="card-icon" />
                <h3>Forecast (Daily)</h3>
              </div>
              {Object.entries(allInformation.forecast.daily).map(
                ([pollutant, days]) => {
                  const chartData = {
                    labels: days.map((day) => day.day),
                    datasets: [
                      {
                        label: "Average",
                        data: days.map((day) => Number(day.avg).toFixed(2)),
                        borderColor: "rgba(75, 192, 192, 0.8)",
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        tension: 0.4,
                        borderWidth: 2,
                      },
                      {
                        label: "Maximum",
                        data: days.map((day) => Number(day.max).toFixed(2)),
                        borderColor: "rgba(255, 99, 132, 0.8)",
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        tension: 0.4,
                        borderWidth: 2,
                      },
                      {
                        label: "Minimum",
                        data: days.map((day) => Number(day.min).toFixed(2)),
                        borderColor: "rgba(54, 162, 235, 0.8)",
                        backgroundColor: "rgba(54, 162, 235, 0.2)",
                        tension: 0.4,
                        borderWidth: 2,
                      },
                    ],
                  };

                  const options = {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        labels: {
                          color: textPrimary,
                        },
                      },
                      tooltip: {
                        backgroundColor: cardBg,
                        titleColor: textPrimary,
                        bodyColor: textPrimary,
                        borderColor: borderColor,
                      },
                    },
                    scales: {
                      x: {
                        ticks: {
                          color: textPrimary,
                        },
                        grid: {
                          color: borderColor,
                        },
                      },
                      y: {
                        ticks: {
                          color: textPrimary,
                        },
                        grid: {
                          color: borderColor,
                        },
                      },
                    },
                  };

                  return (
                    <div key={pollutant} className="forecast-chart-container">
                      <div className="card-header">
                        <FaCloudSun className="card-icon" />
                        <h3>{formatPollutantLabel(pollutant)} Forecast</h3>
                      </div>
                      <div style={{ height: "300px" }}>
                        <Line data={chartData} options={options} />
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};