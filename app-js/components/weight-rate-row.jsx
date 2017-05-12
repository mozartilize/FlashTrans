import React from 'react';
import _ from 'lodash';

const WeightRateRow = (props) => (
  <tr>
    <td>
      {props.editing ? <input
                          data-weight-id={props.weight.id}
                          onChange={props.weightChangeHandle}
                          value={props.weight.weight}/> :
                          props.weight.weight}
      <button data-weight-id={props.weight.id} onClick={props.weightRowEditHandle}>{props.editing ? 'Update' : 'Edit'}</button>
      <button data-weight-id={props.weight.id} onClick={props.weightRowDeleteHandle}>Delete</button>
    </td>
    {
      props.areas.map(area => {
        const rate = _.find(props.rates, rate => (rate.destination_area_id == area.id && rate.weight_id == props.weight.id));
        let price = rate ? rate.price : '';
        return (
          props.editing ?
          <td key={area.code}>
            <input data-weight-id={props.weight.id}
                   data-destination-area-id={area.id}
                   data-rate-id={rate ? rate.id: undefined}
                   onChange={props.rateChangeHandle}
                   value={price}/>
          </td> :
          <td key={area.code}>{price}</td>
        )
      })
    }
  </tr>
)

export default WeightRateRow;
