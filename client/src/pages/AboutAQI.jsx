import React from 'react';
import '../styles/AboutAQI.css';
import { MainTable } from '../components/MainTable';
import { FaSmog, FaCloud, FaIndustry, FaSun, FaBurn } from 'react-icons/fa';
import img from "../assets/what.jpg";

export const AboutAQI = () => {
  return (
    <div className="about-aqi-container">
      <h1 className="aqi-header">About Air Quality Index (AQI)</h1>

      <img
        src={img}
        alt="Air Pollution Banner"
        className="aqi-banner"
      />

      <p className="aqi-defination">
        The <strong>Air Quality Index (AQI)</strong> is a numerical scale used globally to represent the quality of the air we breathe. It converts complex air pollutant data into a simple scale from 0 to 500 — the higher the value, the greater the level of pollution and the more serious the health concern.
      </p>

      <h2 className="aqi-subheader">Why is AQI Important?</h2>
      <p className="aqi-text">
        AQI alerts you when air pollution is unhealthy and helps you take precautions. It is especially important for children, older adults, and those with respiratory or cardiovascular conditions.
      </p>

      <h2 className="aqi-subheader">What Pollutants Are Measured?</h2>
      <p className="aqi-text">
        The AQI is based on the concentration of six common air pollutants known to be harmful to human health and the environment:
      </p>
      <ul className="aqi-list">
        <li><FaSmog /> <strong>PM2.5</strong> – Tiny particles that penetrate deep into lungs.</li>
        <li><FaCloud /> <strong>PM10</strong> – Dust, pollen, and mold particles.</li>
        <li><FaIndustry /> <strong>NO<sub>2</sub></strong> – Emitted by vehicles and power plants.</li>
        <li><FaIndustry /> <strong>SO<sub>2</sub></strong> – From burning fossil fuels like coal.</li>
        <li><FaBurn /> <strong>CO</strong> – Released from incomplete combustion of carbon fuels.</li>
        <li><FaSun /> <strong>O<sub>3</sub></strong> – A harmful gas formed from sunlight reacting with pollutants.</li>
      </ul>

      <h2 className="aqi-subheader">AQI Scale and Health Impact</h2>
      <p className="aqi-text">
        The AQI scale is divided into categories that correspond to different levels of health concern. Here's what each range means:
      </p>

      <MainTable />

      <h2 className="aqi-subheader">How to Protect Yourself</h2>
      <ul className="aqi-tips">
        <li><strong>Monitor the AQI daily</strong> using websites or apps.</li>
        <li><strong>Limit outdoor activities</strong> when AQI is above 100, especially if you are sensitive.</li>
        <li>Keep windows closed during high pollution days.</li>
        <li>Use <strong>N95 masks</strong> when exposure is unavoidable.</li>
        <li>Use <strong>indoor air purifiers</strong> to reduce indoor pollution.</li>
        <li>Encourage greener transport: walk, cycle, or use public transport when possible.</li>
        <li>Report open burning or industrial violations to local authorities.</li>
      </ul>

      <div className="aqi-callout">
        <h3>Clean Air Is a Right, Not a Luxury</h3>
        <p>Be aware of air pollution levels and help advocate for policies that improve air quality in your community.</p>
      </div>

      <p className="aqi-source">
        <strong>Sources:</strong> EPA AirNow, WHO, CPCB India, UNEP
      </p>
    </div>
  );
};
