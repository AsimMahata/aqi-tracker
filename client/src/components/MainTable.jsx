import React, { useState } from 'react';
import { AQITable } from './tables/AQITable';
import { PM2Table } from './tables/PM2Table';
import { PM10Table } from './tables/PM10Table';
import { SO2Table } from './tables/SO2Table';
import { NO2Table } from './tables/NO2Table';
import { COTable } from './tables/COTable';
import { O3Table } from './tables/O3Table';
import '../styles/MainTable.css';

export const MainTable = () => {
  const [currentTable, setCurrentTable] = useState("aqi-table");

  const tableOptions = [
    { id: "aqi-table", label: "AQI", description: "Overall Air Quality Index" },
    { id: "pm2-table", label: "PM2.5", description: "Fine Particulate Matter" },
    { id: "pm10-table", label: "PM10", description: "Coarse Particulate Matter" },
    { id: "so2-table", label: "SO₂", description: "Sulfur Dioxide" },
    { id: "no2-table", label: "NO₂", description: "Nitrogen Dioxide" },
    { id: "co-table", label: "CO", description: "Carbon Monoxide" },
    { id: "o3-table", label: "O₃", description: "Ground-level Ozone" }
  ];

  const handleTableChange = (tableName) => {
    setCurrentTable(tableName);
  };

  return (
    <div className="main-table-container">
      <div className="table-options">
        <div className="table-options-grid">
          {tableOptions.map((option) => (
            <button
              key={option.id}
              className={`table-option ${currentTable === option.id ? 'active' : ''}`}
              onClick={() => handleTableChange(option.id)}
            >
              <span className="table-option-label">{option.label}</span>
              <span className="table-option-description">{option.description}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="table-content">
        {currentTable === "aqi-table" && <AQITable />}
        {currentTable === "pm2-table" && <PM2Table />}
        {currentTable === "pm10-table" && <PM10Table />}
        {currentTable === "so2-table" && <SO2Table />}
        {currentTable === "no2-table" && <NO2Table />}
        {currentTable === "co-table" && <COTable />}
        {currentTable === "o3-table" && <O3Table />}
      </div>
    </div>
  );
};
