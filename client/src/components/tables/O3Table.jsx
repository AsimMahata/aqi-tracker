import React from 'react'

export const O3Table = () => {
  return (
    <table className="aqi-table">
      <caption className="aqi-caption">O₃ (Ozone) Levels</caption>
      <thead>
        <tr>
          <th>O₃ (μg/m³)</th>
          <th>Level</th>
          <th>Health Effects</th>
          <th>Common Sources</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>0–108</td>
          <td>Good</td>
          <td>No health impacts expected.</td>
          <td>Natural background levels</td>
        </tr>
        <tr>
          <td>109–140</td>
          <td>Moderate</td>
          <td>May cause minor respiratory irritation in sensitive individuals.</td>
          <td>Vehicle emissions, industrial processes</td>
        </tr>
        <tr>
          <td>141–170</td>
          <td>Unhealthy for Sensitive Groups</td>
          <td>Increased respiratory symptoms in people with asthma.</td>
          <td>Urban areas, high traffic zones</td>
        </tr>
        <tr>
          <td>171–210</td>
          <td>Unhealthy</td>
          <td>Respiratory symptoms in general population; aggravated effects in sensitive groups.</td>
          <td>Major cities, industrial areas</td>
        </tr>
        <tr>
          <td>211–400</td>
          <td>Very Unhealthy</td>
          <td>Significant respiratory effects; increased hospital admissions.</td>
          <td>Severe pollution events, heat waves</td>
        </tr>
        <tr>
          <td>401+</td>
          <td>Hazardous</td>
          <td>Serious health effects for everyone; emergency conditions.</td>
          <td>Extreme pollution events, major industrial incidents</td>
        </tr>
      </tbody>
    </table>
  )
}
