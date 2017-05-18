import React from 'react';

const ShipperDeliveryProcessButton = (props) => {
  let value;
  if (props.status.status === 'Assigned')
    value = 'Taken'
  if (props.status.status === 'Taken')
    value = 'Delivering';
  else if (props.status.status === 'Delivering')
    value = 'Delivered'
  if (value)
    return <button onClick={props.handleShipperDeliveryProcess}>{value}</button>
  else
    return ''
}
