import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

import User from 'services/user';
import appApi from 'services/app-api';

import BaseApp from 'layouts/base';
import OrderForm from 'components/order-form';
import OrderUserTableSearch from './user-order-table-search';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      orders: props.orders,
      order: this.initOrder(props)
    }

    this.handleOrderSubmit = this.handleOrderSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleOrderInputChange = this.handleOrderInputChange.bind(this);
  }

  initOrder(props) {
    return {
      service_id: props.services[0].id,
      source_address: {
        street_no: '',
        street_name: '',
        city_id: props.cities[0].id
      },
      destination_address: {
        street_no: '',
        street_name: '',
        city_id: props.cities[0].id
      }
    }
  }

  handleOrderInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState((prevState, props) => {
      const parent = target.getAttribute('data-parent')
      parent ? prevState.order[parent][name] = value : prevState.order[name] = value;
      return {order: prevState.order}
    })
  }

  handleOrderSubmit(history, orderId, event) {
    event.preventDefault();
    console.log(history);
    const target = event.target;

    let submitBtn = target.querySelectorAll("input[type='submit']")[0];
    submitBtn.disabled = true;

    if (orderId) {
      this.handleEditSubmit(orderId, history, submitBtn);
    }
    else {
      this.handleCreateSubmit(history, submitBtn);
    }
  }

  handleCreateSubmit(history, submitBtn) {
    appApi.ready().post('/orders', {order: this.state.order}).then(res => {
      const addedOrder = res.data;
      this.setState((prevState, props) => {
        prevState.orders.unshift(addedOrder);
        return {orders: prevState.orders, order: this.initOrder(props)}
      });
      history.push('/management/user/orders');
    })
    .catch(error => {
      if (error.response) {
        submitBtn.disabled = false;
        alert('Invalid');
      }
      else {
        console.log(error);
      }
    })
  }

  handleEditSubmit(orderId, history, submitBtn) {
    appApi.ready().put(`/orders/${orderId}`, {order: this.state.order}).then(res => {
      this.setState((prevState, props) => {
        let newOrders = prevState.orders;
        const indx = _.findIndex(newOrders, ['id', orderId]);
        newOrders[indx] = res.data;
        return {orders: newOrders, order: this.initOrder(props)}
      });
      history.push('/management/user/orders');
    })
    .catch(error => {
      if (error.response) {
        submitBtn.disabled = false;
        alert('Invalid');
      }
      else {
        console.log(error);
      }
    })
  }

  handleEdit(orderId, history, e) {
    const order = _.find(this.state.orders, ['id', orderId]);
    let newOrder = this.initOrder(this.props);
    newOrder.id = orderId;
    newOrder.service_id = _.clone(order.service_id);
    newOrder.source_address.street_no = _.clone(order.source_address.street_no);
    newOrder.source_address.street_name = _.clone(order.source_address.street_name);
    newOrder.source_address.city_id = _.clone(order.source_address.city.id);
    newOrder.destination_address.street_no = _.clone(order.destination_address.street_no);
    newOrder.destination_address.street_name = _.clone(order.destination_address.street_name);
    newOrder.destination_address.city_id = _.clone(order.destination_address.city.id);
    this.setState({order: newOrder});
    history.push('/management/user/orders/edit');
  }

  handleDelete(orderId, e) {
    if (confirm('Are you sure?')) {
      appApi.ready().delete(`orders/${orderId}`).then(res => {
        this.setState((prevState, props) => {
          const newOrders = _.reject(prevState.orders, ['id', orderId]);
          return {orders: newOrders};
        })
      })
      .catch(err => {alert(err)})
    }
  }

  render() {
    return (
      <BaseApp currentUser={this.state.currentUser}>
        <Router>
          <div>
            <div className="col-md-3">
            <ul>
              <li><Link to="/management/user/orders">Order list</Link></li>
              <li><Link to="/management/user/orders/new" onClick={e => { this.setState({order: this.initOrder(this.props)}) }}>Create order</Link></li>
            </ul>
            </div>
            <div className="col-md-8">
            <Route exact path="/management/user/orders/new"
                  render={(props) => <OrderForm {...props}
                                                cities={this.props.cities}
                                                services={this.props.services}
                                                order={this.state.order}
                                                handleOrderInputChange={this.handleOrderInputChange}
                                                handleOrderSubmit={this.handleOrderSubmit} />} />
            <Route exact path="/management/user/orders/edit"
                  render={(props) => <OrderForm {...props}
                                                cities={this.props.cities}
                                                services={this.props.services}
                                                order={this.state.order}
                                                handleOrderInputChange={this.handleOrderInputChange}
                                                handleOrderSubmit={this.handleOrderSubmit} />} />
            <Route exact path="/management/user/orders"
                  render={(props) => <OrderUserTableSearch {...props}
                                                           orders={this.state.orders}
                                                           orderStatuses={this.props.orderStatuses}
                                                           handleEdit={this.handleEdit}
                                                           handleDelete={this.handleDelete} />} />
            </div>
          </div>
        </Router>
      </BaseApp>
    )
  }
}

User.getCurrentUser().then(response => {
  axios.all([appApi.ready().get('/services'),
             appApi.ready().get('/cities'),
             appApi.ready().get('/orders'),
             appApi.ready().get('/order-statuses')])
    .then(axios.spread((services, cities, orders, orderStatuses) => {
      ReactDOM.render(<App currentUser={response.data.data}
                           services={services.data}
                           cities={cities.data}
                           orders={orders.data}
                           orderStatuses={orderStatuses.data} />,
                      document.getElementById('app'));
    }))
    .catch(error => {
      alert(error);
    })
})
.catch(error => {
  window.location.href = '/';
})
