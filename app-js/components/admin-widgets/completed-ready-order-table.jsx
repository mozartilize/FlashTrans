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

    this.handleCompleteShipment = this.handleCompleteShipment.bind(this);
  }

  componentDidMount() {
    appApi.ready().get('orders?status=delivered').then(res => {
      this.setState({orders: res.data});
    })
  }

  handleCompleteShipment(orderId, e) {
    if (confirm('Are you sure?')) {
      const completed_id = _.find(this.props.orderStatuses, ['status', 'Completed']).id;
      appApi.ready().put(`/orders/${orderId}`, {order: {status_id: completed_id}}).then(res => {
        this.setState((prevState, props) => {
          const newOrders = _.reject(prevState.orders, ['id', parseInt(orderId)]);
          return {orders: newOrders}
        })
      })
      .catch(errors => {
        if (errors.response) {
          alert('Invalid');
        }
      })
    }
  }

  render() {
    return (
      <HeadingPane panelHeader="Completed-ready Orders">
        <table className="table">
          <thead>
            <tr>
              <th>Service</th>
              <th>To</th>
              <th>Created at</th>
              <th>Shipper</th>
              <th>Delivered at</th>
              <th>Weight</th>
              <th>Cost</th>
              <th>Complete</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.orders.map(order => (
                <tr key={order.id}>
                  <td>{order.service.name}</td>
                  <td>{`${order.destination_address.street_no} ${order.destination_address.street_name}, ${order.destination_address.city.name}`}</td>
                  <td>{order.created_at}</td>
                  <td>{order.shipment.shipper.full_name}</td>
                  <td>{order.shipment.delivered_at}</td>
                  <td>{order.shipment.weight}</td>
                  <td>{order.shipment.cost}</td>
                  <td>
                    <button onClick={e => this.handleCompleteShipment(order.id, e)}>Completed</button>
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
