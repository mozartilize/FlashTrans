import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import MainNavbar from 'components/navbar/main-navbar';
import ShipperCreationForm from 'components/shipper-creation-form';

import appApi from 'services/app-api';
import User from 'services/user';


class ShipperList extends React.Component {
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
          <td>{shipper.phone}</td>
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


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser
    }
  }

  render() {
    return (
      <Router>
        <div>
          <MainNavbar currentUser={this.state.currentUser} />
          <ul>
            <li><Link to="/management/admin/shippers">Shipper list</Link></li>
            <li><Link to="/management/admin/shippers/new">Create shipper</Link></li>
          </ul>

          <Route exact path="/management/admin/shippers" component={ShipperList} />
          <Route path="/management/admin/shippers/new" component={ShipperCreationForm} />
        </div>
      </Router>
    );
  }
}

User.getCurrentUser().then(response => {
  ReactDOM.render(<App currentUser={response.data.data}/>,
                  document.getElementById('app'));
})
.catch(error => {
  // alert(error);
  // window.location.href = '/';
})

