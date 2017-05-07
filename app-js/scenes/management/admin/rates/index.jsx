import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import appApi from 'services/app-api';
import ServiceRate from 'components/service-rate';

import mainCSS from 'assets/stylesheets/main.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: props.services,
      areas: props.areas,
      weights: props.weights,
      rates: props.rates
    }
  }

  render() {
    return (
      <div>
        <ServiceRate service={this.state.services[0]}
                     areas={this.state.areas}
                     weights={this.state.weights}
                     rates={this.state.rates} />
      </div>
    )
  }
}


axios.all([appApi.ready().get('/services'),
           appApi.ready().get('/areas'),
           appApi.ready().get('/weights'),
           appApi.ready().get('/rates')])
  .then(axios.spread((services, areas, weights, rates) => {
    ReactDOM.render(<App services={services.data}
                         areas={areas.data}
                         weights={weights.data}
                         rates={rates.data} />,
                    document.getElementById('app'));
  }))
  .catch(error => {
    console.log(error);
  })
