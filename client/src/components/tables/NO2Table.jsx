import React from 'react'

export const NO2Table = () => {
  return (
    <table className="aqi-table">
      <caption className="aqi-caption">NO₂ (Nitrogen Dioxide) Levels</caption>
      <thead>
        <tr>
          <th>NO₂ (μg/m³)</th>
          <th>Level</th>
          <th>Health Effects</th>
          <th>Common Sources</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>0–99.6</td>
          <td>Good</td>
          <td>No health impacts expected.</td>
          <td>Natural background levels</td>
        </tr>
        <tr>
          <td>99.7–188</td>
          <td>Moderate</td>
          <td>May cause minor respiratory irritation in sensitive individuals.</td>
          <td>Vehicle emissions, power plants</td>
        </tr>
        <tr>
          <td>189–676</td>
          <td>Unhealthy for Sensitive Groups</td>
          <td>Increased respiratory symptoms in people with asthma.</td>
          <td>Heavy traffic, industrial areas</td>
        </tr>
        <tr>
          <td>677–1221</td>
          <td>Unhealthy</td>
          <td>Respiratory symptoms in general population; aggravated effects in sensitive groups.</td>
          <td>Major highways, industrial zones</td>
        </tr>
        <tr>
          <td>1222–2347</td>
          <td>Very Unhealthy</td>
          <td>Significant respiratory effects; increased hospital admissions.</td>
          <td>Industrial accidents, severe traffic congestion</td>
        </tr>
        <tr>
          <td>2348+</td>
          <td>Hazardous</td>
          <td>Serious health effects for everyone; emergency conditions.</td>
          <td>Major industrial incidents, extreme pollution events</td>
        </tr>
      </tbody>
    </table>
  )
}
