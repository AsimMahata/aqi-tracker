import React, { useState, useEffect, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles/History.css";
import {getPastHoursData ,getPastDaysData ,getAQIColor} from "../services/utility";
import { fetchPastAQIDB, fetchAvgAQI } from "../services/aqiServices";
import { useThemeChange } from "../hooks/useThemeChange";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// History component for displaying AQI trends
export const History = ({ currentCity }) => {
  const { cardBg, textPrimary, borderColor, loaded } = useThemeChange();
  const [view, setView] = useState("daily");
  const [dailyData, setDailyData] = useState(null);
  const [weeklyData, setWeeklyData] = useState(null);

  // Load historical AQI data when city changes
  useEffect(() => {
    if (!currentCity || !loaded) return;

    const todayData = getPastHoursData(8).map((entry) => ({
      id: currentCity.id,
      hour: entry.hour,
      aqi: null,
      isCurrent: entry.isCurrent,
      date: entry.date,
      time: entry.label,
    }));

    const weekData = getPastDaysData(7).map((entry) => ({
      id: currentCity.id,
      day: entry.label,
      aqi: null,
      isCurrent: entry.isCurrent,
      date: entry.date,
    }));
    
    const loaddata = async () => {
      const updated = await fetchPastAQIDB(todayData);
      const updatedWeekData = await fetchAvgAQI(weekData);
      
      setDailyData(updated);
      setWeeklyData(updatedWeekData);
    };
    loaddata();
  }, [loaded]);

  // Chart data for daily view
  const dailyChartData = useMemo(
  () => ({
    labels: dailyData?.map((d) => d.time) || [],
    datasets: [
      {
        type: "line",
        label: "Trend",
        data: dailyData?.map((d) => d.aqi ?? 0) || [],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.1)",
        borderWidth: 3,
        tension: 0.3,
        fill: false,
        pointRadius: 3,
      },
      {
        type: "bar",
        label: "AQI",
        data: dailyData?.map((d) => d.aqi ?? 0) || [],
        backgroundColor: dailyData?.map((d) => getAQIColor(d.aqi ?? 0)) || [],
        borderColor: dailyData?.map((d) => getAQIColor(d.aqi ?? 0)) || [],
        borderWidth: 1,
      },
    ],
  }),
  [dailyData]
);

  // Chart data for weekly view
const weeklyChartData = useMemo(
  () => ({
    labels: weeklyData?.map((d) => d.day) || [],
    datasets: [
      {
        type: "line",
        label: "Trend",
        data: weeklyData?.map((d) => d.aqi ?? 0) || [],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.1)",
        borderWidth: 3,
        tension: 0.3,
        fill: false,
        pointRadius: 3,
      },
      {
        type: "bar",
        label: "Average AQI",
        data: weeklyData?.map((d) => d.aqi ?? 0) || [],
        backgroundColor: weeklyData?.map((d) => getAQIColor(d.aqi ?? 0)) || [],
        borderColor: weeklyData?.map((d) => getAQIColor(d.aqi ?? 0)) || [],
        borderWidth: 1,
      },
    ],
  }),
  [weeklyData]
);

  // Chart configuration options
const chartOptions = useMemo(
  () => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: cardBg,
        titleColor: textPrimary,
        bodyColor: textPrimary,
        borderColor: borderColor,
        borderWidth: 1,
        padding: 10,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          label: function (context) {
            const isCurrent =
              view === "daily"
                ? dailyData?.[context.dataIndex]?.isCurrent
                : weeklyData?.[context.dataIndex]?.isCurrent;
            return `AQI: ${context.parsed.y}${
              isCurrent
                ? view === "daily"
                  ? " (Current Time)"
                  : " (Today)"
                : ""
            }`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(128, 128, 128, 0.2)",
        },
        ticks: {
          color: textPrimary,
          font: {
            size: 12,
            weight: "500",
          },
        },
        border: {
          color: borderColor,
        },
      },
      x: {
        grid: {
          color: "rgba(128, 128, 128, 0.2)",
        },
        ticks: {
          color: textPrimary,
          font: {
            size: 12,
            weight: "500",
          },
          callback: function (value, index) {
            const isCurrent =
              view === "daily"
                ? dailyData?.[index]?.isCurrent
                : weeklyData?.[index]?.isCurrent;
            if (isCurrent) {
              return view === "daily" ? "Current Time" : "Today";
            }
            return this.getLabelForValue(value);
          },
        },
        border: {
          color: borderColor,
        },
      },
    },
  }),
  [view, dailyData, weeklyData, cardBg, textPrimary, borderColor]
);

  // Show message if no city is selected
  if (!currentCity) {
    return (
      <div className="history-container">
        <div className="no-data">
          Please select a city to view its AQI history
        </div>
      </div>
    );
  }

  // Show loading state while data is being fetched
  if (!dailyData || !weeklyData) {
    return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading data...</p>
        </div>
    );
  }

  return (
    <div className="history-container">
      <div className="history-header">
        <h1>AQI History for {currentCity.name}</h1>
        <p className="history-description">
          Track air quality trends over time with detailed hourly and daily data
        </p>
      </div>

      {/* View toggle buttons */}
      <div className="view-toggle">
        <button
          className={`toggle-button ${view === "daily" ? "active" : ""}`}
          onClick={() => setView("daily")}
        >
          Daily View
        </button>
        <button
          className={`toggle-button ${view === "weekly" ? "active" : ""}`}
          onClick={() => setView("weekly")}
        >
          Weekly View
        </button>
      </div>

      {/* Chart container */}
      <div className="chart-container">
        <div className="chart-header">
          <h2 className="chart-title">
            {view === "daily" ? "Hourly AQI Trends" : "Daily AQI Averages"}
          </h2>
          <p className="chart-subtitle">
            {view === "daily"
              ? "Last 8 hours of air quality data"
              : "Last 7 days of average air quality"}
          </p>
        </div>

        <div className="chart-wrapper">
          <Bar
            data={view === "daily" ? dailyChartData : weeklyChartData}
            options={chartOptions}
          />
        </div>
      </div>

      <div className="space"></div>
    </div>
  );
};
