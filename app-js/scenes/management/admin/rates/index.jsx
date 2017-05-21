import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import BaseApp from 'layouts/base';
import appApi from 'services/app-api';
import User from 'services/user';

import ServiceRate from 'components/service-rate';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      services: props.services,
      areas: props.areas,
      weights: props.weights,
      rates: props.rates
    }
  }

  render() {
    return (
      <BaseApp currentUser={this.state.currentUser}>
        <Router>
          <div>
            <div className="col-md-3">
              <ul>
                {
                  this.state.services.map(service => (
                    <li key={service.id}><Link to={`/management/admin/rates/${service.code}`}>{service.name}</Link></li>
                  ))
                }
              </ul>
            </div>
            <div className="col-md-8">
              {
                this.state.services.map(service => (
                  <Route key={service.code}
                        path={`/management/admin/rates/${service.code}`}
                        render={() => <ServiceRate service={service}
                                                    areas={this.state.areas}
                                                    weights={this.state.weights}
                                                    rates={this.state.rates} />}
                  />
                ))
              }
            </div>
          </div>
        </Router>
      </BaseApp>
    )
  }
}


User.getCurrentUser().then(response => {
  axios.all([appApi.ready().get('/services'),
            appApi.ready().get('/areas'),
            appApi.ready().get('/weights'),
            appApi.ready().get('/rates')])
    .then(axios.spread((services, areas, weights, rates) => {
      ReactDOM.render(<App currentUser={response.data.data}
                           services={services.data}
                           areas={areas.data}
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
