import React from 'react';
import axios from 'axios';
import _ from 'lodash';

import appApi from 'services/app-api';


export default class OrderForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      services: props.services,
      cities: props.cities,
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
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState((prevState, props) => {
      const parent = target.getAttribute('data-parent')
      parent ? prevState.order[parent][name] = value : prevState.order[name] = value;
      return {order: prevState.order}
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    const target = event.target;

    let submitBtn = target.querySelectorAll("input[type='submit']")[0];
    submitBtn.disabled = true;

    appApi.ready().post('/orders', {order: this.state.order}).then(res => {

    })
    .catch(error => {})
  }

  render() {
    return (
      <form method="post" onSubmit={this.onSubmit} className={ this.props.formClasses }>
        <div className="form-group">
          <label htmlFor="service-id">Service:</label>
          <select className="form-control" id="service-id"
                  name="service_id"
                  required
                  value={this.state.order.service_id}
                  onChange={this.handleInputChange}>
            {
              this.state.services.map(service => (
                <option key={service.id} value={service.id}>{service.name}</option>
              ))
            }
          </select>
        </div>
        <fieldset>
          <legend>Source Address</legend>
          <div className="form-group">
            <label htmlFor="sourcestreet-no">Street Number:</label>
            <input type="number" step="1" className="form-control" id="source-street-no"
                   data-parent={_.keys(this.state.order)[1]}
                   name="street_no"
                   value={this.state.order.source_address.stree_no}
                   onChange={this.handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="source-street-name">Street Name:</label>
            <input type="text" className="form-control" id="source-stree-name"
                   data-parent={_.keys(this.state.order)[1]} name="street_name"
                   value={this.state.order.source_address.street_name}
                   required
                   onChange={this.handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="source-city-id">City:</label>
            <select className="form-control" id="source-city-id"
                    data-parent={_.keys(this.state.order)[1]}
                    name="city_id"
                    required
                    value={this.state.order.source_address.city_id}
                    onChange={this.handleInputChange}>
              {
                this.state.cities.map(city => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))
              }
            </select>
          </div>
        </fieldset>

        <fieldset>
          <legend>Destination Address</legend>
          <div className="form-group">
            <label htmlFor="destination-street-no">Street Number:</label>
            <input type="number" step="1" className="form-control" id="destination-street-no"
                   data-parent={_.keys(this.state.order)[2]} name="street_no"
                   value={this.state.order.destination_address.stree_no}
                   onChange={this.handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="destination-street-name">Street Name:</label>
            <input type="text" className="form-control" id="destination-street-name"
                   data-parent={_.keys(this.state.order)[2]} name="street_name"
                   required
                   value={this.state.order.destination_address.street_name}
                   onChange={this.handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="destination-city-id">City:</label>
            <select className="form-control" id="destination-city-id"
                    data-parent={_.keys(this.state.order)[2]} name="city_id"
                    required
                    value={this.state.order.destination_address.city_id}
                    onChange={this.handleInputChange}>
              {
                this.state.cities.map(city => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))
              }
            </select>
          </div>
        </fieldset>
        <input type="submit" value="Create" className="button"/>
      </form>
    );
  }
}
