import React from 'react';

import ShipperDeliveryProcessButton from './shipper-delivery-process-button';

class ShipperShipmentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveredDate: null,
    }

    this.handledeliveredDateChange = this.handledeliveredDateChange.bind(this);
  }

  handledeliveredDateChange(date) {
    this.setState({deliveredDate: date})
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
              <th></th>
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
                        <CustomDatePicker selected={this.state.deliveredDate}
                                          onChange={this.handledeliveredDateChange}
                                          className="form-control" />
                        <input type="number" className="form-control" name="deliveredHour" min={0} max={23} step={1}/>
                        :
                        <input type="number" className="form-control" name="deliveredMin" min={0} max={59} step={1}/>
                      </div> :
                      order.shipment !== null ? order.shipment.delivered_at : ''}
                  </td>
                  <td>{order.status.status === 'Taken' ? <input type="number" min="0.01" name="weight"/> : order.shipment === null ? '' : order.shipment.weight}</td>
                  <td>{order.status.status === 'Taken' ? <div className="form-inline">{order.shipment !== null ? order.shipment.cost : ''} <button onClick={this.props.handleCalculate}>Calculate</button></div> : order.shipment === null ? '' : order.shipment.cost}</td>
                  <td><ShipperDeliveryProcessButton status={order.status} handleShipperDeliveryProcess={this.props.handleShipperDeliveryProcess}/></td>
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
