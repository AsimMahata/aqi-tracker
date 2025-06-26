import React from "react";
import { Popup } from "react-leaflet";
import { Link, useNavigate } from "react-router-dom";
import "../styles/PopUp.css";
import { getAQIClassAndLabel } from "../services/utility";
export const PopUp = ({
  city,
  idx,
  handleOnclick,
  setCurrentCity,
  isLocal,
}) => {
  const navigate =useNavigate();
  const showHistory = ()=>{
    setCurrentCity(city);
    navigate('/history');
  }
  return (
    <Popup>
      <div className="city-name">
        <h3 style={{ color: "black" }}>{city.name}</h3>

      </div>
      <div className="aqi-data">
        {city.aqi !== null ? (
          (() => {
            const { className, label } = getAQIClassAndLabel(city.aqi);
            return (
              <p className={className}>
                AQI: {city.aqi} ({label})
              </p>
            );
          })()
        ) : (
          <p>Loading AQI...</p>
        )}

        <p className="latitude">Latitude: {city.position[0].toFixed(4)}</p>
        <p className="longitude">Longitude: {city.position[1].toFixed(4)}</p>
        <div className="history-btn">
          <Link to="/MoreInfo" onClick={() => setCurrentCity(city)}>
            More Information
          </Link>
        </div>
        {isLocal && (
          <div className="delete-city" onClick={() => handleOnclick(idx)}>
            delete city
          </div>
        )}
        {!isLocal && (
          <div className="show-history" onClick={showHistory}>
              History
          </div>
        )}
      </div>
    </Popup>
  );
};
