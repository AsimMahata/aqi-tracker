import React from 'react'

export const COTable = () => {
  return (
    <table className="aqi-table">
      <caption className="aqi-caption">CO (Carbon Monoxide) Levels</caption>
      <thead>
        <tr>
          <th>CO (mg/m³)</th>
          <th>Level</th>
          <th>Health Effects</th>
          <th>Common Sources</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>0.0–5.0</td>
          <td>Good</td>
          <td>No health impacts expected.</td>
          <td>Natural background levels</td>
        </tr>
        <tr>
          <td>5.1–10.8</td>
          <td>Moderate</td>
          <td>May cause minor effects in people with heart disease.</td>
          <td>Vehicle emissions, gas appliances</td>
        </tr>
        <tr>
          <td>10.9–14.2</td>
          <td>Unhealthy for Sensitive Groups</td>
          <td>Increased chest pain in people with heart disease.</td>
          <td>Heavy traffic, industrial areas</td>
        </tr>
        <tr>
          <td>14.3–17.6</td>
          <td>Unhealthy</td>
          <td>Significant effects on people with heart disease; minor effects on general population.</td>
          <td>Major highways, industrial zones</td>
        </tr>
        <tr>
          <td>17.7–34.9</td>
          <td>Very Unhealthy</td>
          <td>Serious effects on people with heart disease; significant effects on general population.</td>
          <td>Severe traffic congestion, industrial accidents</td>
        </tr>
        <tr>
          <td>35.0+</td>
          <td>Hazardous</td>
          <td>Life-threatening effects; emergency conditions.</td>
          <td>Major industrial incidents, extreme pollution events</td>
        </tr>
      </tbody>
    </table>
  )
}
