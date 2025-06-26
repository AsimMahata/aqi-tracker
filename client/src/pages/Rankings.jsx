import React, { useState, useEffect } from "react";
import {
  fetchAQIFromDBForCities,
  fetchAQIFromAPIForCities,
  fetchCities,
} from "../services/aqiServices";
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import "../styles/Rankings.css";
import { getAQIColor, getAQIClassAndLabel } from "../services/utility";

const token = import.meta.env.VITE_TOKEN;

export const Rankings = () => {
  const [cityData, setCityData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: 'aqi',
    direction: 'desc',
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const allCities = await fetchCities();
        const currentCities = allCities.data.map((city) => {
          const position = [parseFloat(city.latitude), parseFloat(city.longitude)];
          return { ...city, position };
        });

        let dbResults = await fetchAQIFromDBForCities(currentCities);
        const needsUpdate = dbResults.some((city) => city.aqi === null);

        if (needsUpdate) {
          const apiResults = await fetchAQIFromAPIForCities(dbResults, token);
          dbResults = apiResults;
        }

        setCityData(dbResults);
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    const sorted = [...cityData].sort((a, b) => {
      if (a[sortConfig.key] === null) return 1;
      if (b[sortConfig.key] === null) return -1;
      return sortConfig.direction === 'asc'
        ? a[sortConfig.key] - b[sortConfig.key]
        : b[sortConfig.key] - a[sortConfig.key];
    });
    return sorted;
  };

  const getTopBestCities = () => {
    return [...cityData]
      .filter(city => city.aqi !== null)
      .sort((a, b) => a.aqi - b.aqi)
      .slice(0, 5);
  };

  const getTopWorstCities = () => {
    return [...cityData]
      .filter(city => city.aqi !== null)
      .sort((a, b) => b.aqi - a.aqi)
      .slice(0, 5);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort />;
    return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p style={{ color: 'var(--text-primary)' }}>Loading air quality data...</p>
      </div>
    );
  }

  return (
    <div className="rankings-container">
      <div className="rankings-header">
        <h1>Global Air Quality Rankings</h1>
        <p className="rankings-description">
          Real-time rankings of cities based on their Air Quality Index (AQI) values.
          The AQI is a measure of air quality that indicates how clean or polluted the air is,
          and what associated health effects might be of concern for the general population.
        </p>
      </div>

      <div className="rankings-summary">
        <div className="summary-card best">
          <h3>Top 5 Cities with Best Air Quality</h3>
          <ol>
            {getTopBestCities().map((city, idx) => (
              <li key={idx}>
                <span className="city-name">{city.name}</span>
                <span className="aqi-value" style={{ color: getAQIColor(city.aqi) }}>{city.aqi}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="summary-card worst">
          <h3>Top 5 Cities with Worst Air Quality</h3>
          <ol>
            {getTopWorstCities().map((city, idx) => (
              <li key={idx}>
                <span className="city-name">{city.name}</span>
                <span className="aqi-value" style={{ color: getAQIColor(city.aqi) }}>{city.aqi}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="rankings-table-container">
        <table className="rankings-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>City</th>
              <th onClick={() => handleSort('aqi')}>
                AQI {getSortIcon('aqi')}
              </th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {getSortedData().map((city, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{city.name}</td>
                <td>
                <span className={`list-aqi-value aqi-${getAQIClassAndLabel(city.aqi).className}`} >
                  {city.aqi !== null && city.aqi !== undefined ? city.aqi : 'N/A'}
                </span>
                </td>
                <td>
                  <span className={`status-badge aqi-${getAQIClassAndLabel(city.aqi).className}`}>
                    {getAQIClassAndLabel(city.aqi).label || "N/A"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
