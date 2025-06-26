import React, { useEffect } from "react";
import { useMap } from "react-leaflet";

function CitySearch({
  searchQuery,
  setSearchQuery,
  userCityData,
  setUserCityData,
  setRefresh,
}) {
  const map = useMap();

  useEffect(() => {
    const fetchCoordinates = async (newCity) => {
      if (!searchQuery) return;
      try {
        const url = `https://aqi-tracker-live-backend.onrender.com/search?q=${searchQuery}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.length > 0) {
          const { lat, lon } = data[0];
          newCity.position = [
            ...newCity.position,
            parseFloat(lat),
            parseFloat(lon),
          ];
          setUserCityData((prevCities) => [...prevCities, newCity]);
          map.setView([parseFloat(lat), parseFloat(lon)], 12);
          const popupCloseBtn = document.querySelector(
            ".leaflet-container a.leaflet-popup-close-button"
          );
          if (popupCloseBtn) popupCloseBtn.click();
          setRefresh((prev) => !prev);
        } else {
          alert("Location not found!");
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setSearchQuery("");
      }
    };

    const capitalizedCityName =
      searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1);
    const newCity = {
      name: capitalizedCityName,
      position: [],
      aqi: null,
    };

    const isPresent = userCityData.some((city) => city.name === newCity.name);
    if (!isPresent) {
      fetchCoordinates(newCity);
    } else {
      userCityData.map((city) => {
        if (city.name === newCity.name) {
          const lat = city.position[0];
          const lon = city.position[1];
          map.setView([parseFloat(lat), parseFloat(lon)], 12);
          const popupCloseBtn = document.querySelector(
            ".leaflet-container a.leaflet-popup-close-button"
          );
          if (popupCloseBtn) popupCloseBtn.click();
        }
      });
    }
  }, [searchQuery]);
  return null;
}

export default CitySearch;
