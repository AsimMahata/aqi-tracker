export function getAQIClassAndLabel(aqi) {
  if(!aqi)return null;
  if (aqi >= 301) {
    return { className: "hazardous", label: "Hazardous" };
  } else if (aqi >= 201) {
    return { className: "very-unhealthy", label: "Very Unhealthy" };
  } else if (aqi >= 151) {
    return { className: "unhealthy", label: "Unhealthy" };
  } else if (aqi >= 101) {
    return { className: "unhealthy-sensitive", label: "Unhealthy for Sensitive Groups" };
  } else if (aqi >= 51) {
    return { className: "moderate", label: "Moderate" };
  } else {
    return { className: "good", label: "Good" };
  }
}

export function getAQIColor(aqi) {
  if (aqi <= 50) {
    return "#2e7d32";
  } else if (aqi <= 100) {
    return "#7cb342";
  } else if (aqi <= 150) {
    return "#ffb300";
  } else if (aqi <= 200) {
    return "#d35400";
  } else if (aqi <= 300) {
    return "#99004c";
  } else {
    return "#7e0023";
  }
}


export function formatHourTo12(hour) {
  const h = hour % 12 || 12;
  const ampm = hour < 12 ? "AM" : "PM";
  return `${h}:00 ${ampm}`;
}

export function getPastHoursData(count = 8) {
  const data = [];
  const now = new Date();

  for (let i = count - 1; i >= 0; i--) {
    const past = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hour = past.getHours();
    const label = formatHourTo12(hour);
    const date = past.toLocaleDateString("en-CA");
    data.push({ label, date, hour, isCurrent: i === 0 });
  }

  return data;
}

export function getPastDaysData(count = 7) {
  const data = [];
  const now = new Date();

  for (let i = count - 1; i >= 0; i--) {
    const past = new Date(now);
    past.setDate(now.getDate() - i);

    const dayName = past.toLocaleDateString("en-US", { weekday: "short" });
    const date = past.toISOString().split("T")[0];
    data.push({ label: `${dayName}`, date, isCurrent: i === 0 });
  }

  return data;
}
