import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import BaseApp from 'layouts/base';
import ShipperCreationForm from 'components/shipper-creation-form';
import ShipperList from './shipper-list';

import appApi from 'services/app-api';
import User from 'services/user';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser
    }
  }

  render() {
    return (
      <BaseApp currentUser={this.state.currentUser}>
        <Router>
          <div>
            <div className="col-md-3">
              <ul>
                <li><Link to="/management/admin/shippers">Shipper list</Link></li>
                <li><Link to="/management/admin/shippers/new">Create shipper</Link></li>
              </ul>
            </div>
            <div className="col-md-8">
              <Route exact path="/management/admin/shippers" component={ShipperList} />
              <Route path="/management/admin/shippers/new" component={ShipperCreationForm} />
            </div>
          </div>
        </Router>
      </BaseApp>
    );
  }
}

User.getCurrentUser().then(response => {
  if (response.data.data.role.name === 'admin') {
    ReactDOM.render(<App currentUser={response.data.data}/>,
                    document.getElementById('app'));
  }
  else {
    window.location.href = '/';
  }
})
.catch(error => {
  alert(error);
  window.location.href = '/';
})

