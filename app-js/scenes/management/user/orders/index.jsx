import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import MainNavbar from 'components/navbar/main-navbar';
import OrderForm from 'components/order-form';

import User from 'services/user';
import appApi from 'services/app-api';


import mainCSS from 'assets/stylesheets/main.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      cities: props.cities,
      services: props.services,
    }
  }

  render() {
    return (
      <div>
        <MainNavbar currentUser={this.state.currentUser} />
        <div className="container">
          <OrderForm cities={this.state.cities}
                          services={this.state.services} />
        </div>
      </div>
    )
  }
}

User.getCurrentUser().then(response => {
  axios.all([appApi.ready().get('/services'),
             appApi.ready().get('/cities')])
    .then(axios.spread((services, cities) => {
      ReactDOM.render(<App currentUser={response.data.data}
                           services={services.data}
                           cities={cities.data} />,
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
