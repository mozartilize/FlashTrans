import React from 'react';

import _ from 'lodash';

import appApi from 'services/app-api';
import HeadingPane from 'components/heading-pane';


export default class AssignedReadyOrderTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    }

    this.handleShipmentShipperChange = this.handleShipmentShipperChange.bind(this);
  }

  componentDidMount() {
    appApi.ready().get('/orders?status=assigned_ready').then(res => {
      this.setState({orders: res.data});
    })
  }

  handleShipmentShipperChange(orderId, e) {
    const target = e.target;
    const assigned_id = _.find(this.props.orderStatuses, ['status', 'Assigned']).id;
    const payload = {shipment: {shipper_id: target.value}, status_id: assigned_id};
    appApi.ready().put(`/orders/${orderId}`, {order: payload}).then(res => {
      this.setState((prevState, props) => {
        const prevOrders = prevState.orders;
        const orderIndx = _.findIndex(prevOrders, ['id', parseInt(orderId)]);
        prevOrders[orderIndx] = res.data;
        return {orders: prevOrders}
      })
    })
    .catch(errors => {
      if (errors.response) {
        alert('Invalid');
      }
    })
  }

  render() {
    return (
      <HeadingPane panelHeader="Assigned-ready Orders">
        <table className="table">
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Created at</th>
              <th>Assign For</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.orders.map(order => (
                <tr key={order.id}>
                  <td>{`${order.source_address.street_no} ${order.source_address.street_name}, ${order.source_address.city.name}`}</td>
                  <td>{`${order.destination_address.street_no} ${order.destination_address.street_name}, ${order.destination_address.city.name}`}</td>
                  <td>{order.created_at}</td>
                  <td>
                    {
                      <select name="shipper" value={order.shipment === null ? '' : order.shipment.shipper.id}
                              onChange={e => this.handleShipmentShipperChange(order.id, e)}>
                        <option value="" disabled hidden></option>
                        {
                          this.props.shippers.map(shipper => (
                            <option key={shipper.id} value={shipper.id}>{`${shipper.first_name} ${shipper.last_name}`}</option>
                          ))
                        }
                      </select>
                    }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </HeadingPane>
    )
  }
}
