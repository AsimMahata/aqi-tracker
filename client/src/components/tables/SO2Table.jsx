import React from 'react'

export const SO2Table = () => {
  return (
      <table className="aqi-table">
        <caption className="aqi-caption">SO₂ (Sulfur Dioxide) Levels</caption>
        <thead>
          <tr>
            <th>SO₂ (μg/m³)</th>
            <th>Level</th>
            <th>Health Effects</th>
            <th>Common Sources</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0 - 92</td>
            <td>Good</td>
            <td>No health impacts expected.</td>
            <td>Natural background levels</td>
          </tr>
          <tr>
            <td>93 - 197</td>
            <td>Moderate</td>
            <td>May cause minor respiratory irritation in sensitive individuals.</td>
            <td>Power plants, industrial processes</td>
          </tr>
          <tr>
            <td>198 - 484</td>
            <td>Unhealthy for Sensitive Groups</td>
            <td>Increased respiratory symptoms in people with asthma.</td>
            <td>Industrial areas, near power plants</td>
          </tr>
          <tr>
            <td>485 - 779</td>
            <td>Unhealthy</td>
            <td>Respiratory symptoms in general population; aggravated effects in sensitive groups.</td>
            <td>Major industrial zones, power generation areas</td>
          </tr>
          <tr>
            <td>780 - 1582</td>
            <td>Very Unhealthy</td>
            <td>Significant respiratory effects; increased hospital admissions.</td>
            <td>Industrial accidents, severe pollution events</td>
          </tr>
          <tr>
            <td>1583+</td>
            <td>Hazardous</td>
            <td>Serious health effects for everyone; emergency conditions.</td>
            <td>Major industrial incidents, extreme pollution events</td>
          </tr>
        </tbody>
      </table>
  )
}
