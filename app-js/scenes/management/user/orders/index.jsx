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

import MainNavbar from 'components/navbar/main-navbar';
import OrderForm from 'components/order-form';
import OrderUserTableSearch from './user-order-table-search';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      cities: props.cities,
      services: props.services,
      orders: props.orders,
      order: {
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
        },
      }
    }

    this.handleOrderSubmit = this.handleOrderSubmit.bind(this);
    this.handleOrderInputChange = this.handleOrderInputChange.bind(this);
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

  handleOrderSubmit(event) {
    event.preventDefault();

    const target = event.target;

    let submitBtn = target.querySelectorAll("input[type='submit']")[0];
    submitBtn.disabled = true;

    appApi.ready().post('/orders', {order: this.state.order}).then(res => {
      const addedOrder = res.data;
      this.setState((prevState, props) => ({orders: prevState.orders.unshift(addedOrder)}))
    })
    .catch(error => {})
  }

  render() {
    return (
      <Router>
        <MainNavbar currentUser={this.state.currentUser} />
        <div className="container">
          <ul>
            <li><Link to="/management/user/orders">Order list</Link></li>
            <li><Link to="/management/user/orders/new">Create order</Link></li>
          </ul>
          <Route exact path="/management/user/orders"
                 render={() => <OrderForm cities={this.state.cities}
                                          services={this.state.services}
                                          order={this.state.order}
                                          handleOrderInputChange={this.handleOrderInputChange}
                                          handleOrderSubmit={this.handleOrderSubmit} />} />
          <Route path="/management/user/orders/new"
                 render={() => <OrderUserTableSearch orders={this.state.orders} />} />
        </div>
      </Router>
    )
  }
}

User.getCurrentUser().then(response => {
  axios.all([appApi.ready().get('/services'),
             appApi.ready().get('/cities'),
             appApi.ready().get('/orders')])
    .then(axios.spread((services, cities, orders) => {
      ReactDOM.render(<App currentUser={response.data.data}
                           services={services.data}
                           cities={cities.data}
                           orders={orders.data} />,
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
