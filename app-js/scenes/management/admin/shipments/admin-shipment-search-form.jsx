import React from 'react';
import moment from 'moment';

import CustomDatePicker from 'components/custom-date-picker';


class AdminShipmentSearchForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      createdFrom: null,
      createdTo: null,
    }

    this.handleCreatedFromChange = this.handleCreatedFromChange.bind(this);
    this.handleCreatedToChange = this.handleCreatedToChange.bind(this);
  }

  handleCreatedFromChange(date) {
    this.setState({createdFrom: date})
  }

  handleCreatedToChange(date) {
    this.setState({createdTo: date})
  }

  render() {
    return (
      <form onSubmit={this.props.handleAdminShipmentSearch}>
        <table className="table">
          <tbody>
            <tr>
              <th>Service</th>
              <td>
                <select name="service">
                  <option value=""></option>
                  {
                    this.props.services.map(service => (
                      <option key={service.id} value={service.id}>{service.name}</option>
                    ))
                  }
                </select>
              </td>
            </tr>
            <tr>
              <th>Code</th>
              <td>
                <input className="form-control" type="text" name="code"/>
              </td>
            </tr>
            <tr>
              <th>Customer</th>
              <td><input className="form-control" type="text" name="customer" /></td>
            </tr>
            <tr>
              <th>Source street name</th>
              <td><input className="form-control" type="text" name="sourceStreetName"/></td>
              <th>Source city</th>
              <td><input className="form-control" type="text" name="sourceCity"/></td>
            </tr>
            <tr>
              <th>Destination street name</th>
              <td><input className="form-control" type="text" name="destinationStreetName"/></td>
              <th>Destination City</th>
              <td><input className="form-control" type="text" name="destinationCity"/></td>
            </tr>
            <tr>
              <th>Created at</th>
              <td colSpan="3">
                <div className="form-inline">
                  <label htmlFor="created-from">From:</label>
                  <CustomDatePicker
                    selected={this.state.createdFrom}
                    onChange={this.handleCreatedFromChange}
                    className="form-control"
                    name="createdFrom" />
                  <label htmlFor="created-to">To:</label>
                  <CustomDatePicker
                    selected={this.state.createdTo}
                    onChange={this.handleCreatedToChange}
                    className="form-control"
                    name="createdTo" />
                </div>
              </td>
            </tr>
            <tr>
              <th>Shipper</th>
              <td>
                <select name="shipper">
                  <option value=""></option>
                  {
                    this.props.shippers.map(shipper => (
                      <option key={shipper.id} value={shipper.id}>{`${shipper.first_name} ${shipper.last_name}`}</option>
                    ))
                  }
                </select>
              </td>
            </tr>
            <tr>
              <th>Status</th>
              <td colSpan="3">
                <div className="form-inline">
                  <select className="form-control" name="status">
                    <option value=""></option>
                    {
                      this.props.orderStatuses.map(status => (
                        <option key={status.id} value={status.id}>{status.status}</option>
                      ))
                    }
                  </select>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className="button">Search</button>
      </form>
    )
  }
}

export default AdminShipmentSearchForm;
