import React from 'react';
import _ from 'lodash';

import appApi from 'services/app-api';

export default class ShipperList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shippers: null
    }
  }

  componentDidMount() {
    appApi.ready().get('/shippers').then(response => {
      this.setState({shippers: response.data.data})
    })
    .catch(error => {})
  }

  handleDeleteShipper(shipperId, e) {
    if (confirm('Are you sure to delete this shipper?')) {
      appApi.ready().delete(`/shippers/${shipperId}`).then(res => {
        this.setState((prevState, props) => {
          const newShippers = _.reject(prevState.shippers, ['id', shipperId]);
          return {shippers: newShippers};
        })
      })
    }
  }

  render() {
    let list;
    if (this.state.shippers === null) {
      list = <tr><td colSpan={6}>Loading</td></tr>
    }
    else if (this.state.shippers !== null && this.state.shippers.length == 0) {
      list = <tr><td colSpan={6}>No shipper to show</td></tr>
    }
    else {
      list = this.state.shippers.map((shipper, index) => (
        <tr key={shipper.id}>
          <td>{index}</td>
          <td>{`${shipper.first_name} ${shipper.last_name}`}</td>
          <td>{shipper.email}</td>
          <td>{shipper.birthday}</td>
          <td>{shipper.address}</td>
          <td>{shipper.phone_number}</td>
          <td><button className="btn" onClick={e => this.handleDeleteShipper(shipper.id, e)}>Delete</button></td>
        </tr>
      ))
    }
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Shipper List</div>

        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Birthday</th>
              <th>Address</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            { list }
          </tbody>
        </table>
      </div>
    )
  }
}
