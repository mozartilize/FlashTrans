import React from 'react';

class AdminShipmentTable extends React.Component {
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
              <th>Shipper</th>
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
                    {
                      order.status.status === 'Unprocessed' || order.status.status === 'Assigned' ?
                        <select data-order-id={order.id} name="shipper" value={order.shipment === null ? '' : order.shipment.shipper.id}
                                onChange={this.props.handleShipmentShipperChange}>
                          <option value="" disabled hidden></option>
                          {
                            this.props.shippers.map(shipper => (
                              <option key={shipper.id} value={shipper.id}>{`${shipper.first_name} ${shipper.last_name}`}</option>
                            ))
                          }
                        </select> :
                        order.shipment !== null ? `${order.shipment.shipper.first_name} ${order.shipment.shipper.last_name}` : ''
                    }
                  </td>
                  <td>
                    {order.status.status}
                  </td>
                  <td>
                    {order.shipment !== null ? order.shipment.delivered_at : ''}
                  </td>
                  <td>{order.shipment === null ? '' : order.shipment.weight}</td>
                  <td>{order.shipment === null ? '' : order.shipment.cost}</td>
                  <td>
                    {
                      order.status.status === 'Delivered' ?
                        <button onClick={e => this.props.handleCompleteShipment(order.id, e)}>Completed</button> :
                        order.status.status === 'Completed' ?
                          <span class="glyphicon glyphicon-ok" aria-hidden="true"></span> : ''
                    }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default AdminShipmentTable;
