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

import CityArea from './city-area';
import ServiceRateShow from './service-rate-show';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
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
                  this.props.services.map(service => (
                    <li key={service.id}><Link to={`/rates/${service.code}`}>{service.name}</Link></li>
                  ))
                }
              </ul>
            </div>
            <div className="col-md-8">
              {
                this.props.services.map(service => (
                  <Route key={service.code}
                          path={`/rates/${service.code}`}
                          render={() => <ServiceRateShow service={service}
                                                        areas={this.props.areas}
                                                        weights={this.props.weights}
                                                        rates={this.props.rates} />}
                  />
                ))
              }
              <CityArea cities={this.props.cities} areas={this.props.areas} />
            </div>
          </div>
        </Router>
      </BaseApp>
    )
  }
}


axios.all([appApi.ready().get('/services'),
           appApi.ready().get('/areas'),
           appApi.ready().get('/weights'),
           appApi.ready().get('/rates'),
           appApi.ready().get('/cities')])
  .then(axios.spread((services, areas, weights, rates, cities) => {
    ReactDOM.render(<App services={services.data}
                         areas={areas.data}
                         weights={weights.data}
                         rates={rates.data}
                         cities={cities.data} />,
                    document.getElementById('app'));
  }))
  .catch(error => {
    console.log(error);
  })
