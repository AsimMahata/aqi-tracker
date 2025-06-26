import React from 'react'

export const PM2Table = () => {
  return (
      <table className="aqi-table">
        <caption className="aqi-caption">PM2.5 (Fine Particulate Matter) Levels</caption>
        <thead>
          <tr>
            <th>PM2.5 (μg/m³)</th>
            <th>Level</th>
            <th>Health Effects</th>
            <th>Sources</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0-12</td>
            <td>Good</td>
            <td>No health impacts expected.</td>
            <td>Natural background levels</td>
          </tr>
          <tr>
            <td>12.1-35.4</td>
            <td>Moderate</td>
            <td>Unusually sensitive people may experience respiratory symptoms.</td>
            <td>Vehicle emissions, industrial processes</td>
          </tr>
          <tr>
            <td>35.5-55.4</td>
            <td>Unhealthy for Sensitive Groups</td>
            <td>Increased respiratory symptoms in sensitive individuals.</td>
            <td>Heavy traffic, construction, wildfires</td>
          </tr>
          <tr>
            <td>55.5-150.4</td>
            <td>Unhealthy</td>
            <td>Respiratory symptoms in general population; more serious effects in sensitive groups.</td>
            <td>Industrial emissions, power plants, agricultural burning</td>
          </tr>
          <tr>
            <td>150.5-250.4</td>
            <td>Very Unhealthy</td>
            <td>Significant increase in respiratory effects in general population.</td>
            <td>Severe industrial pollution, major wildfires</td>
          </tr>
          <tr>
            <td>250.5+</td>
            <td>Hazardous</td>
            <td>Serious health effects for everyone; emergency conditions.</td>
            <td>Extreme pollution events, catastrophic fires</td>
          </tr>
        </tbody>
      </table>
  )
}
