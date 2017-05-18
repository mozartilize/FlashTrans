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

import mainCSS from 'assets/stylesheets/main.scss';

import ShipperShipmentTableSearch from './shipper-shipment-table-search';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: props.services,
      orders: props.orders,
      orderStatuses: props.orderStatuses,
      shippers: props.shippers
    }

    this.handleShipperDeliveryProcess = this.handleShipperDeliveryProcess.bind(this)
  }

  handleShipperDeliveryProcess(e) {
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

  render() {
    return (
      <div>
        <div className="container">
          <ShipperShipmentTableSearch
            services={this.state.services}
            orders={this.state.orders}
            orderStatuses={this.state.orderStatuses}
            shippers={this.state.shippers}
            handleShipperDeliveryProcess={this.handleShipperDeliveryProcess} />
        </div>
      </div>
    )
  }
}


User.getCurrentUser().then(response => {
  axios.all([appApi.ready().get('/services'),
             appApi.ready().get('/orders'),
             appApi.ready().get('/order-statuses'),
             appApi.ready().get('/shippers')])
    .then(axios.spread((services, orders, orderStatuses, shippers) => {
      ReactDOM.render(<App currentUser={response.data.data}
                           services={services.data}
                           orders={orders.data}
                           orderStatuses={orderStatuses.data}
                           shippers={shippers.data.data} />,
                      document.getElementById('app'));
    }))
    .catch(error => {
      console.log(error);
    })
})
.catch(error => {
  alert(error);
  window.location.href = '/';
})
