import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import searchIcon from "../assets/search-icon.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import Lottie from "lottie-react";
import earthlogo from "../animations/earthlogo.json";

// Navigation bar component with search and theme toggle
export const Navbar = ({ setSearchQuery }) => {
  const [localQuery, setLocalQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  };

  // Handle search on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(localQuery);
      navigate("/");
      setTimeout(() => {
        localQuery && setLocalQuery("");
      }, 200);
    }
  };

  // Check if current route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="navbar">
      <div className="title">
        <Link
          to="/"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <Lottie
            animationData={earthlogo}
            loop
            style={{ height: "45px", width: "45px",}}
          />
          <span style={{ fontSize: "1.5rem", fontWeight: 700 }}>
            Real-Time AQI Tracker
          </span>
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/" className={isActive("/") ? "active" : ""}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/AboutAQI"
            className={isActive("/AboutAQI") ? "active" : ""}
          >
            About AQI
          </Link>
        </li>
        <li>
          <Link
            to="/rankings"
            className={isActive("/rankings") ? "active" : ""}
          >
            Rankings
          </Link>
        </li>
        <li>
          <Link to="/contact" className={isActive("/contact") ? "active" : ""}>
            Contact
          </Link>
        </li>
      </ul>
      <div className="nav-controls">
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by city or country..."
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <img src={searchIcon} alt="Search" className="search-icon" />
        </div>
      </div>
    </div>
  );
};
