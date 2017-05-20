import React from 'react';

const ShipperDeliveryProcessButton = (props) => {
  let value;
  let disabled = false;
  if (props.order.status.status === 'Assigned') {
    value = 'Taken';
  }
  else if (props.order.status.status === 'Taken') {
    if (!props.order.shipment.weight || !props.order.shipment.cost) disabled = true
    value = 'Delivering';
  }
  else if (props.order.status.status === 'Delivering') {
    if (!props.order.shipment.delivered_at) disabled = true
    value = 'Delivered';
  }
  if (value)
    return <button disabled={disabled} data-order-id={props.order.id} data-next-process={value} onClick={props.handleShipperDeliveryProcess}>{value}</button>;
  else
    return null;
}

export default ShipperDeliveryProcessButton;
