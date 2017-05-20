import React from 'react';
import moment from 'moment';


import CustomDatePicker from 'components/custom-date-picker';
import ShipperDeliveryProcessButton from './shipper-delivery-process-button';

class ShipperShipmentTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="overflow-x">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Order Code</th>
              <th>Service</th>
              <th>Customer</th>
              <th>Source Address</th>
              <th>Destination Address</th>
              <th>Created at</th>
              <th>Status</th>
              <th>Delivered at</th>
              <th>Weight</th>
              <th>Cost</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.code}</td>
                  <td>{order.service.name}</td>
                  <td>{`${order.user.first_name} ${order.user.last_name}`}</td>
                  <td>{`${order.source_address.street_no} ${order.source_address.street_name}, ${order.source_address.city.name}`}</td>
                  <td>{`${order.destination_address.street_no} ${order.destination_address.street_name}, ${order.destination_address.city.name}`}</td>
                  <td>{order.created_at}</td>
                  <td>
                    {order.status.status}
                  </td>
                  <td>
                    {
                      order.status.status === 'Delivering' ?
                      <div className="form-inline">
                        <CustomDatePicker selected={order.shipment.delivered_at ? moment(order.shipment.delivered_at) : order.shipment.delivered_at}
                                          onChange={(date) => this.props.handleDeliveredDateChange(order.id, date)}
                                          className="form-control"
                                          data-order-id={order.id} />
                        <input type="number" disabled={!order.shipment.delivered_at} className="form-control" min={0} max={23} step={1} onChange={e => this.props.handleDeliveredHourChange(order.id, e)} value={order.shipment.delivered_at ? moment(order.shipment.delivered_at).hour() : ''}/>
                        :
                        <input type="number" disabled={!order.shipment.delivered_at} className="form-control" min={0} max={59} step={1} onChange={e => this.props.handleDeliveredMinuteChange(order.id, e)} value={order.shipment.delivered_at ? moment(order.shipment.delivered_at).minute() : ''}/>
                      </div> :
                      order.shipment !== null ? order.shipment.delivered_at : ''}
                  </td>
                  <td>{order.status.status === 'Taken' ? <input data-order-id={order.id} type="number" min="0.01" value={order.shipment.weight ? order.shipment.weight : ''} onChange={this.props.handleWeightChange}/> : order.shipment === null ? '' : order.shipment.weight}</td>
                  <td>{order.status.status === 'Taken' ? <div className="form-inline">{order.shipment !== null ? order.shipment.cost : ''} <button data-order-id={order.id} disabled={!order.shipment.weight} onClick={this.props.handleCalculate}>Calculate</button></div> : order.shipment === null ? '' : order.shipment.cost}</td>
                  <td><ShipperDeliveryProcessButton order={order} handleShipperDeliveryProcess={this.props.handleShipperDeliveryProcess}/></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default ShipperShipmentTable;
