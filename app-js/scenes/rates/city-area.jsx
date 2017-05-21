import React from 'react';
import _ from 'lodash';

const CityArea = (props) => (
  <div className="medium-height">
    <h2>City List</h2>
    <table className="table">
      <tbody>
        <tr>
          <th>City</th>
          <th>Area</th>
        </tr>
        {
          props.cities.map(city => (
            <tr key={city.id}>
              <td>{city.name}</td>
              <td>{_.find(props.areas, ['id', city.area_id]).code}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
)

export default CityArea;
