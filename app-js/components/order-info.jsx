import React from 'react';

const OrderInfo = (props) => (
  <table className="table">
    <tbody>
      <tr>
        <th>Service</th>
        <td colSpan={3}>{props.order.service.name}</td>
      </tr>
      <tr>
        <th>Code</th>
        <td colSpan={3}>{props.order.code}</td>
      </tr>
      <tr>
        <th>Customer</th>
        <td colSpan={3}>{props.order.user.full_name}</td>
      </tr>
      <tr>
        <th>Source Address</th>
        <td>{`${props.order.source_address.street_no} ${props.order.source_address.street_name}, ${props.order.source_address.city.name}`}</td>
        <th>Destination Address</th>
        <td>{`${props.order.destination_address.street_no} ${props.order.destination_address.street_name}, ${props.order.destination_address.city.name}`}</td>
      </tr>
      <tr>
        <th>Created At</th>
        <td colSpan={3}>{props.order.created_at}</td>
      </tr>
      <tr>
        <th>Status</th>
        <td>{props.order.status.status}</td>
        <th>Delivered At</th>
        <td>{props.order.shipment ? props.order.shipment.delevered_at : ''}</td>
      </tr>
      <tr>
        <th>Weight</th>
        <td>{props.order.shipment ? props.order.shipment.weight : ''}</td>
        <th>Cost (VND)</th>
        <td>{props.order.shipment ? props.order.shipment.cost : ''}</td>
      </tr>
      <tr>
        <th>Shipper</th>
        <td colSpan={3}>{props.order.shipment ? props.order.shipment.shipper.full_name : ''}</td>
      </tr>
    </tbody>
  </table>
)

export default OrderInfo;
