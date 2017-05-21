import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import axios from 'axios';

import User from 'services/user';
import appApi from 'services/app-api';

import BaseApp from 'layouts/base';
import AdminShipmentTableSearch from './admin-shipment-table-search';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      services: props.services,
      orders: props.orders,
      orderStatuses: props.orderStatuses,
      shippers: props.shippers
    }

    this.handleShipmentShipperChange = this.handleShipmentShipperChange.bind(this);
    this.handleCompleteShipment = this.handleCompleteShipment.bind(this);
  }

  handleShipmentShipperChange(e) {
    const target = e.target;
    const orderId = target.getAttribute('data-order-id');
    const assigned_id = _.find(this.state.orderStatuses, ['status', 'Assigned']).id;
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

    })
  }

  handleCompleteShipment(orderId, e) {
    const completed_id = _.find(this.state.orderStatuses, ['status', 'Completed']).id;
    appApi.ready().put(`/orders/${orderId}`, {order: {status_id: completed_id}}).then(res => {
      this.setState((prevState, props) => {
        const prevOrders = prevState.orders;
        const orderIndx = _.findIndex(prevOrders, ['id', parseInt(orderId)]);
        prevOrders[orderIndx] = res.data;
        return {orders: prevOrders}
      })
    })
    .catch(errors => {

    })
  }

  render() {
    return (
      <BaseApp currentUser={this.state.currentUser}>
        <AdminShipmentTableSearch
          services={this.state.services}
          orders={this.state.orders}
          orderStatuses={this.state.orderStatuses}
          shippers={this.state.shippers}
          handleShipmentShipperChange={this.handleShipmentShipperChange}
          handleCompleteShipment={this.handleCompleteShipment} />
      </BaseApp>
    )
  }
}


User.getCurrentUser().then(response => {
  const user = response.data.data;
  if (user.role.name === 'admin') {
    axios.all([appApi.ready().get('/services'),
              appApi.ready().get('/orders'),
              appApi.ready().get('/order-statuses'),
              appApi.ready().get('/shippers')])
      .then(axios.spread((services, orders, orderStatuses, shippers) => {
        ReactDOM.render(<App currentUser={user}
                            services={services.data}
                            orders={orders.data}
                            orderStatuses={orderStatuses.data}
                            shippers={shippers.data.data} />,
                        document.getElementById('app'));
    }))
    .catch(error => {
      alert(error);
    })
  }
  else {
    window.location.href = '/404';
  }
})
.catch(error => {
  window.location.href = '/';
})
