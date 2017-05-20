import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import axios from 'axios';

import User from 'services/user';
import appApi from 'services/app-api';
import {determineWeightRate, calculateCost} from 'services/cost-calculator';

import ShipperShipmentTableSearch from './shipper-shipment-table-search';

import mainCSS from 'assets/stylesheets/main.scss';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: props.services,
      orders: props.orders,
      orderStatuses: props.orderStatuses,
    }

    this.handleShipperDeliveryProcess = this.handleShipperDeliveryProcess.bind(this)
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
    this.handleDeliveredDateChange = this.handleDeliveredDateChange.bind(this);
    this.handleDeliveredHourChange = this.handleDeliveredHourChange.bind(this);
    this.handleDeliveredMinuteChange = this.handleDeliveredMinuteChange.bind(this);
  }

  handleShipperDeliveryProcess(e) {
    const target = e.target;
    const orderId = target.getAttribute('data-order-id');
    const order = _.find(this.state.orders, ['id', parseInt(orderId)]);
    const nextProcess = target.getAttribute('data-next-process');
    const nextProcessId = _.find(this.state.orderStatuses, ['status', nextProcess]).id;
    const payload = {status_id: nextProcessId};
    if (nextProcess === 'Delivering' || nextProcess === 'Delivered') {
      payload['shipment'] = order.shipment;
    }
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

  handleDeliveredDateChange(orderId, date) {
    console.log(orderId);
    let newTime = date;
    this.setState((prevState, props) => {
      const orders = prevState.orders;
      const order = _.find(orders, ['id', orderId]);
      if (order.shipment.delivered_at) {
        let oldTime = moment(order.shipment.delivered_at);
        newTime = oldTime.set({year: date.year(),
                                     month: date.month(),
                                     date: date.date()});
      }
      order.shipment.delivered_at = newTime.format('YYYY-MM-DD HH:mm');
      return {orders: orders};
    })
  }

  handleDeliveredHourChange(orderId, e) {
    e.preventDefault();
    const target = e.target;
    if (parseInt(target.value) > 23 || parseInt(target.value) < 0) {
      alert('Invalid hour');
      return;
    }
    this.setState((prevState, props) => {
      const orders = prevState.orders;
      const order = _.find(orders, ['id', orderId]);
      order.shipment.delivered_at = moment(order.shipment.delivered_at).hour(target.value).format("YYYY-MM-DD HH:mm");
      return {orders: orders};
    })
  }

  handleDeliveredMinuteChange(orderId, e) {
    const target = e.target;
    if (parseInt(target.value) > 59 || parseInt(target.value) < 0) {
      alert('Invalid minute');
      return;
    }
    this.setState((prevState, props) => {
      const orders = prevState.orders;
      const order = _.find(orders, ['id', orderId]);
      order.shipment.delivered_at = moment(order.shipment.delivered_at).minute(target.value).format("YYYY-MM-DD HH:mm");
      return {orders: orders};
    })
  }

  handleWeightChange(e) {
    const target = e.target;
    const orderId = target.getAttribute('data-order-id');
    this.setState((prevState, props) => {
      const newOrders = prevState.orders;
      const order = _.find(newOrders, ['id', parseInt(orderId)]);
      order.shipment.weight = target.value;
      return {orders: newOrders}
    })
  }

  handleCalculate(e) {
    const target = e.target;
    const orderId = target.getAttribute('data-order-id');
    const order = _.find(this.state.orders, ['id', parseInt(orderId)]);
    const weightRate = determineWeightRate(parseFloat(order.shipment.weight),
                                           parseInt(order.destination_address.city.area_id),
                                           this.props.weights,
                                           this.props.rates);

    const cost = calculateCost(parseFloat(order.shipment.weight), weightRate);
    this.setState((prevState, props) => {
      const newOrders = prevState.orders;
      const newOrder = _.find(newOrders, ['id', parseInt(orderId)]);
      _.merge(order.shipment, weightRate);
      order.shipment.cost = cost;
      return {orders: newOrders}
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
            handleShipperDeliveryProcess={this.handleShipperDeliveryProcess}
            handleWeightChange={this.handleWeightChange}
            handleCalculate={this.handleCalculate}
            handleDeliveredDateChange={this.handleDeliveredDateChange}
            handleDeliveredHourChange={this.handleDeliveredHourChange}
            handleDeliveredMinuteChange={this.handleDeliveredMinuteChange} />
        </div>
      </div>
    )
  }
}


User.getCurrentUser().then(response => {
  axios.all([appApi.ready().get('/services'),
             appApi.ready().get('/orders'),
             appApi.ready().get('/order-statuses'),
             appApi.ready().get('/weights'),
             appApi.ready().get('/rates')])
    .then(axios.spread((services, orders, orderStatuses, weights, rates) => {
      ReactDOM.render(<App currentUser={response.data.data}
                           services={services.data}
                           orders={orders.data}
                           orderStatuses={orderStatuses.data}
                           weights={weights.data}
                           rates={rates.data} />,
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
