import React from 'react';
import _ from 'lodash';

const AddRateRow = (props) => (
  <table className="table">
    <tbody>
      <tr>
        <td><input type="number" step="0.01" value={props.add.weight} onChange={props.addWeightChange} /></td>
        {
          props.areas.map(area => {
            const rate = _.find(props.add.rates, rate => (rate.destination_area_id === area.id));
            const price = rate ? rate.price : '';
            return <td key={area.code}><input data-destination-area-id={area.id} type="number" step="100" value={price} onChange={props.addRateChange} /></td>
          })
        }
      </tr>
      <tr>
        <td><button onClick={props.addWeightRate}>Add</button></td>
      </tr>
    </tbody>
  </table>
);

export default AddRateRow;
