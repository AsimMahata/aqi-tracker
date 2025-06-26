import axios from "axios";
import dayjs from "dayjs";
import L from "leaflet";



// Fetch average AQI for a given week's data from backend
export const fetchAvgAQI = async (weekData) => {
  return await Promise.all(
    weekData.map(async (day) => {
      if (!day || day.aqi != null) return day;
      const url = `https://aqi-tracker-live-backend.onrender.com/avgaqi?id=${day.id}&date=${day.date}`;
      try {
        const res = await axios.get(url);
        const value = parseFloat(res.data).toFixed(2);
        const aqi = value === "NaN" ? null : value;
        return { ...day, aqi };
      } catch (err) {
        console.error(`DB fetch error for ${day.id}`, err);
        return { ...day, aqi: null };
      }
    })
  );
};

// Fetch historical AQI values for a single day (hourly) from DB
export const fetchPastAQIDB = async (dayData) => {
  return await Promise.all(
    dayData.map(async (time) => {
      if (!time || time.aqi != null) return time;
      const url = `https://aqi-tracker-live-backend.onrender.com/aqi?id=${time.id}&date=${time.date}&hour=${time.hour}`;
      try {
        const res = await axios.get(url);
        const aqi = res?.data?.aqi ?? null;
        return { ...time, aqi };
      } catch (err) {
        console.error(`DB fetch error for ${time.id}`, err);
        return { ...time, aqi: null };
      }
    })
  );
};

// Fetch current AQI for cities from database
export const fetchAQIFromDBForCities = async (
  cityData,
  date = dayjs().format("YYYY-MM-DD"),
  hour = new Date().getHours()
) => {
  return await Promise.all(
    cityData.map(async (city) => {
      if (!city || city.aqi != null) return city;
      const url = `https://aqi-tracker-live-backend.onrender.com/aqi?id=${city.id}&date=${date}&hour=${hour}`;
      try {
        const res = await axios.get(url);
        const aqi = res?.data?.aqi ?? null;
        return { ...city, aqi };
      } catch (err) {
        console.error(`DB fetch error for ${city.name}`, err);
        return { ...city, aqi: null };
      }
    })
  );
};

// Fetch current AQI for cities directly from external AQI API
export const fetchAQIFromAPIForCities = async (cityData, token) => {
  return await Promise.all(
    cityData.map(async (city) => {
      if (!city || city.aqi != null) return city;
      const [lat, lng] = city.position;
      const url = `https://api.waqi.info/feed/geo:${lat};${lng}/?token=${token}`;
      try {
        const res = await axios.get(url);
        const aqi = res?.data?.status === "ok" ? res?.data?.data?.aqi : null;
        return { ...city, aqi };
      } catch (err) {
        console.error(`API fetch error for ${city.name}`, err);
        return { ...city, aqi: null };
      }
    })
  );
};

// Insert AQI values into DB if missing in local results but present in API results
export const updateMissingData = async (dbResults, apiResults) => {
  const currentDate = dayjs().format("YYYY-MM-DD");
  const currentHour = new Date().getHours();

  const updates = dbResults.map(async (city, idx) => {
    if (!city) return Promise.resolve();
    const newAQI = apiResults[idx]?.aqi;
    if (city.aqi == null && newAQI != null) {
      return axios
        .post("https://aqi-tracker-live-backend.onrender.com/insert", {
          id: city.id,
          date: currentDate,
          hour: currentHour,
          aqi: newAQI,
        })
        .catch(() => {
          console.warn("update actually failed ");
        });
    }
    return Promise.resolve();
  });

  await Promise.all(updates);
};

// Fetch all city entries from backend
export const fetchCities = async () => {
  return axios
    .get("https://aqi-tracker-live-backend.onrender.com/cities")
    .catch(() => {
      return { error: "Error retrieving cities" };
    });
};

// Return a Leaflet icon with AQI color-coded styling
export const getAQIColorIcon = (aqi) => {
  let bgColor = "#000000";
  let borderColor = "#000000";
  let textColor = "#ffffff";

  if (aqi <= 50) {
    bgColor = "#2e7d32";
    borderColor = "#1b4d20";
  } else if (aqi <= 100) {
    bgColor = "#7cb342";
    borderColor = "#5a8a2f";
  } else if (aqi <= 150) {
    bgColor = "#ffb300";
    borderColor = "#b27f00";
    textColor = "#212121";
  } else if (aqi <= 200) {
    bgColor = "#d35400";
    borderColor = "#a04100";
  } else if (aqi <= 300) {
    bgColor = "#99004c";
    borderColor = "#660035";
  } else {
    bgColor = "#7e0023";
    borderColor = "#4a0015";
  }

  return L.divIcon({
    className: "",
    html: `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translateY(-10px);
      ">
        <div style="
          background: ${bgColor};
          color: ${textColor};
          border: 1px solid ${borderColor};
          width: 25px;
          height: 25px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          padding : 0.8rem;
          font-weight: bold;
          box-shadow: 0 0 5px rgba(0,0,0,0.4);
          outline: 2px solid white;
          z-index : 1;
        ">
          ${aqi}
        </div>
        <div style="
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 10px solid ${bgColor};
          margin-top: -1px;
        "></div>
      </div>
    `,
    iconSize: [28, 38],
    iconAnchor: [14, 38],
    popupAnchor: [0, -38],
  });
};
