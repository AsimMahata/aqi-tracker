import React from 'react'

export const AQITable = () => {
  return (
      <table className="aqi-table">
        <caption className="aqi-caption">AQI Levels and Health Implications</caption>
        <thead>
          <tr>
            <th>AQI</th>
            <th>Level</th>
            <th>Health Message</th>
            <th>Precautions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0–50</td>
            <td>Good</td>
            <td>Air quality is satisfactory, and air pollution poses little or no risk.</td>
            <td>No special precautions needed. Enjoy outdoor activities.</td>
          </tr>
          <tr>
            <td>51–100</td>
            <td>Moderate</td>
            <td>Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.</td>
            <td>Consider reducing outdoor activities if you experience symptoms.</td>
          </tr>
          <tr>
            <td>101–200</td>
            <td>Unhealthy for Sensitive Groups</td>
            <td>Members of sensitive groups may experience health effects. The general public is less likely to be affected.</td>
            <td>Sensitive groups should reduce outdoor activities. Others can continue normal activities.</td>
          </tr>
          <tr>
            <td>201–300</td>
            <td>Unhealthy</td>
            <td>Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.</td>
            <td>Reduce outdoor activities. Sensitive groups should avoid outdoor activities.</td>
          </tr>
          <tr>
            <td>301–400</td>
            <td>Very Unhealthy</td>
            <td>Health warnings of emergency conditions. The entire population is more likely to be affected.</td>
            <td>Minimize outdoor activities. Stay indoors with windows closed.</td>
          </tr>
          <tr>
            <td>401–500</td>
            <td>Hazardous</td>
            <td>Health alert: everyone may experience more serious health effects.</td>
            <td>Avoid all outdoor activities. Stay indoors with air purifiers running.</td>
          </tr>
        </tbody>
      </table>
  )
}
