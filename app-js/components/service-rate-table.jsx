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
                           editing={props.editStatus[weight.id]}
                           weight={weight}
                           areas={props.areas}
                           rates={_.filter(props.rates, rate => (rate.weight_id == weight.id))}
                           weightChangeHandle={props.weightChangeHandle}
                           rateChangeHandle={props.rateChangeHandle}
                           weightRowEditHandle={props.weightRowEditHandle}
                           weightRowDeleteHandle={props.weightRowDeleteHandle}/>
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
