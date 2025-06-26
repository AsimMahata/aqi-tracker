import React from 'react'

export const PM10Table = () => {
  return (
      <table className="aqi-table">
        <caption className="aqi-caption">PM10 (Coarse Particulate Matter) Levels</caption>
        <thead>
          <tr>
            <th>PM10 (μg/m³)</th>
            <th>Level</th>
            <th>Health Effects</th>
            <th>Common Sources</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0-54</td>
            <td>Good</td>
            <td>No health impacts expected.</td>
            <td>Natural dust, sea salt</td>
          </tr>
          <tr>
            <td>55-154</td>
            <td>Moderate</td>
            <td>May cause minor irritation to eyes and respiratory system.</td>
            <td>Road dust, construction, agriculture</td>
          </tr>
          <tr>
            <td>155-254</td>
            <td>Unhealthy for Sensitive Groups</td>
            <td>Increased respiratory symptoms in sensitive individuals.</td>
            <td>Industrial activities, mining operations</td>
          </tr>
          <tr>
            <td>255-354</td>
            <td>Unhealthy</td>
            <td>Respiratory symptoms in general population; aggravated effects in sensitive groups.</td>
            <td>Heavy construction, demolition, dust storms</td>
          </tr>
          <tr>
            <td>355-424</td>
            <td>Very Unhealthy</td>
            <td>Significant respiratory effects in general population.</td>
            <td>Severe dust storms, major construction projects</td>
          </tr>
          <tr>
            <td>425+</td>
            <td>Hazardous</td>
            <td>Serious health effects for everyone; emergency conditions.</td>
            <td>Catastrophic events, extreme dust storms</td>
          </tr>
        </tbody>
      </table>
  )
}
