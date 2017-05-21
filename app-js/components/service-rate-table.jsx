import React from 'react';
import _ from 'lodash';

import HeadingTable from './heading-table';
import WeightRateRow from './weight-rate-row';

const ServiceRateTable = (props) => {
  let headers, body, panelHeader;
  panelHeader = (
    <div>
      {`${props.service.name} (${props.service.code})`}
    </div>
  );

  headers = (
    <thead>
      <tr>
        <th rowSpan={2}></th>
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
            <WeightRateRow key={trIndex}
                           weight={weight}
                           areas={props.areas}
                           rates={_.filter(props.rates, rate => (rate.weight_id == weight.id))}
                           handleWeightChange={props.handleWeightChange}
                           handleWeightOnBlur={props.handleWeightOnBlur}
                           handleRateChange={props.handleRateChange}
                           handleRateOnBlur={props.handleRateOnBlur}
                           handleWeightOnDelete={props.handleWeightOnDelete}/>
          ))
        }
        <tr>
          <td><button onClick={props.handleAddWeightRate}>Add</button></td>
          <td>
            <input type="number" step="0.01" value={props.add.weight} onChange={props.handleAddingWeightChange} />
            <div className="form-inline">
              <span>Bonus:</span><input type="checkbox" className="form-control" readOnly disabled checked={props.add.bonus}/>
            </div>
          </td>
          {
            props.areas.map(area => {
              const rate = _.find(props.add.rates, rate => (rate.destination_area_id === area.id));
              const price = rate ? rate.price : '';
              return (
                <td key={area.code}>
                  <input type="number" step="100" value={price} onChange={(e) => props.handleAddingRateChange(area.id, e)} />
                </td>
              )
            })
          }
        </tr>
      </tbody>
    );
  }

  return (
    <div className="">
      <HeadingTable
        panelHeader={panelHeader}
        headers={headers}
        body={body} />
    </div>
  )
}

export default ServiceRateTable;
