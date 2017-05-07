import React from 'react';
import _ from 'lodash';

import HeadingTable from './heading-table';

const ServiceRateTable = (props) => {
  let headers, body, panelHeader;
  panelHeader = (
    <div>
      {`${props.service.name} (${props.service.code})`}
      <button onClick={props.editableChange}>{props.editable ? 'Update' : 'Edit'}</button>
    </div>
  );

  headers = (
    <thead>
      <tr>
        <th rowSpan={2}>Weights</th>
        <th colSpan={props.areas.length}>Destination Area</th>
      </tr>
      <tr>
        {
          props.areas.map((area, index) => (
            <th key={index}>{area.code}</th>
          ))
        }
      </tr>
    </thead>
  );

  if (props.weights.length !== 0) {
    body = (
      <tbody>
        {
          props.weights.map((weight, trIndex) => (
            <tr key={trIndex}>
              {props.editable ? <td><input data-weight-id={weight.id} onChange={props.weightEdit} value={weight.weight}/></td> : <td>{weight.weight}</td>}
              {
                props.areas.map(area => {
                  const rate = _.find(props.rates, rate => (rate.destination_area_id == area.id && rate.weight_id == weight.id));
                  let price = rate ? rate.price : '';
                  return props.editable ? <td key={area.code}><input data-weight-id={weight.id} data-destination-area-id={rate.destination_area_id} data-rate-id={rate.id} onChange={props.rateEdit} value={price}/></td> : <td key={area.code}>{price}</td>
                })
              }
            </tr>
          ))
        }
      </tbody>
    );
  }

  return (
    <HeadingTable
      panelHeader={panelHeader}
      headers={headers}
      body={body} />
  )
}

export default ServiceRateTable;
