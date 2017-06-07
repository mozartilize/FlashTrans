import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


import appApi from 'services/app-api';
import User from 'services/user';

import BaseApp from 'layouts/base';
import Service from './service';

import ServiceForm from './service-form';

const ServiceList = (props) => (
  <section>
    <h2>Services</h2>
    {
      props.services.map(service => (
        <Service key={service.id} service={service} currentUser={props.currentUser}/>
      ))
    }
  </section>
)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: props.services,
      newService: this.initNewService(),
      creatingErrors: null
    }

    this.handleCreate = this.handleCreate.bind(this);
    this.handleCreatingServiceInputChange = this.handleCreatingServiceInputChange.bind(this);
  }

  handleCreate(history, e) {
    e.preventDefault();
    this.setState({creatingErrors: null});
    appApi.ready().post('/services', this.state.newService).then(res => {
      this.setState((prevState, props) => {
        prevState.services.push(res.data);
        return {
          services: prevState.services,
          newService: this.initNewService()
        }
      });
      history.push('/services');
    })
    .catch(err => {
      if (err.response) {
        this.setState({creatingErrors: err.response.data});
      }
    })
  }

  handleCreatingServiceInputChange(e) {
    const target = e.target;
    this.setState((prevState, props) => {
      prevState.newService[target.name] = target.value;
      return {newService: prevState.newService}
    })
  }

  initNewService() {
    return {
      name: '',
      code: '',
      description: ''
    }
  }

  render() {
    return (
      <BaseApp currentUser={this.props.currentUser}>
        <Router>
          <div>
            {this.props.currentUser && this.props.currentUser.role.name === 'admin' ? <Link to="/services/new">Create service</Link> : null}
            <Route exact path="/services" render={() => <ServiceList services={this.state.services}
                                                                     currentUser={this.props.currentUser}/>} />
            {
              this.props.currentUser && this.props.currentUser.role.name === 'admin' ?
                <Route path="/services/new"
                       render={(props) => <ServiceForm {...props}
                                                        handleInputChange={this.handleCreatingServiceInputChange}
                                                        handleSubmit={this.handleCreate}
                                                        service={this.state.newService}
                                                        errors={this.state.creatingErrors}/>} /> :
                null
            }
          </div>
        </Router>

      </BaseApp>
    )
  }
}

User.getCurrentUser().then(response => {
  axios.all([appApi.ready().get('/services')])
    .then(axios.spread((services) => {
      ReactDOM.render(<App currentUser={response.data.data}
                           services={services.data}/>,
                      document.getElementById('app'));
    }))
    .catch(error => {
      console.log(error);
    })
})
.catch(error => {
  axios.all([appApi.ready().get('/services')])
    .then(axios.spread((services) => {
      ReactDOM.render(<App currentUser={null}
                           services={services.data}/>,
                      document.getElementById('app'));
    }))
    .catch(error => {
      console.log(error);
    })
})
