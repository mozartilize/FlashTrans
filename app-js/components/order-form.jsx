import React from 'react';
import axios from 'axios';
import _ from 'lodash';

import appApi from 'services/app-api';


export default class OrderForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      services: props.services,
      cities: props.cities,
      required: {
        service: true,
        street_name: true,
        city: true,
        stree_no: false,
        stree_no_min: 0
      }
    }
  }

  render() {
    return (
      <form method="post" onSubmit={this.props.handleOrderSubmit} className={this.props.formClasses}>
        <div className="form-group">
          <label htmlFor="service-id">Service:</label>
          <select className="form-control" id="service-id"
                  name="service_id"
                  required={this.state.required.service}
                  value={this.props.order.service_id}
                  onChange={this.props.handleOrderInputChange}>
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
            <input type="number" step="1" min={this.state.required.stree_no_min}
                   className="form-control" id="source-street-no"
                   data-parent={_.keys(this.props.order)[1]}
                   name="street_no"
                   required={this.state.required.street_no}
                   value={this.props.order.source_address.stree_no}
                   onChange={this.props.handleOrderInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="source-street-name">Street Name:</label>
            <input type="text" className="form-control" id="source-stree-name"
                   data-parent={_.keys(this.props.order)[1]} name="street_name"
                   value={this.props.order.source_address.street_name}
                   required={this.state.required.street_name}
                   onChange={this.props.handleOrderInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="source-city-id">City:</label>
            <select className="form-control" id="source-city-id"
                    data-parent={_.keys(this.props.order)[1]}
                    name="city_id"
                    required={this.state.required.city}
                    value={this.props.order.source_address.city_id}
                    onChange={this.props.handleOrderInputChange}>
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
            <input type="number" step="1" min={this.state.required.stree_no_min}
                   className="form-control" id="destination-street-no"
                   data-parent={_.keys(this.props.order)[2]} name="street_no"
                   required={this.state.required.street_no}
                   value={this.props.order.destination_address.stree_no}
                   onChange={this.props.handleOrderInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="destination-street-name">Street Name:</label>
            <input type="text" className="form-control" id="destination-street-name"
                   data-parent={_.keys(this.props.order)[2]} name="street_name"
                   required={this.state.required.street_name}
                   value={this.props.order.destination_address.street_name}
                   onChange={this.props.handleOrderInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="destination-city-id">City:</label>
            <select className="form-control" id="destination-city-id"
                    data-parent={_.keys(this.props.order)[2]} name="city_id"
                    required={this.state.required.city}
                    value={this.props.order.destination_address.city_id}
                    onChange={this.props.handleOrderInputChange}>
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
