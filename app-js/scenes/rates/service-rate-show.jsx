import React from 'react';
import _ from 'lodash';

import HeadingTable from 'components/heading-table';

const ServiceRateShow = (props) => {
  let headers, body, panelHeader;
  panelHeader = (
    <div>
      {`${props.service.name} (${props.service.code})`}
    </div>
  );

  headers = (
    <thead>
      <tr>
        <th className="text-center align-middle" rowSpan={2}>Weights (kg)</th>
        <th className="text-center" colSpan={props.areas.length}>Price of Destination Area (VND)</th>
      </tr>
      <tr>
        {
          props.areas.map((area, index) => (
            <th className="text-center" key={index}>{area.code}</th>
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
              <td>{weight.bonus ? `Every next ${weight.weight}` : weight.weight}</td>
              {
                props.areas.map(area => {
                  const rate = _.find(props.rates, rate => (rate.destination_area_id == area.id && rate.weight_id == weight.id));
                  let price = rate ? rate.price : '';
                  return <td className="text-right" key={area.code}>{price}</td>
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

export default ServiceRateShow;
