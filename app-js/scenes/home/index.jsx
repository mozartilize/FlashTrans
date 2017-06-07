import React from 'react';
import ReactDOM from 'react-dom';
import User from 'services/user';

import BaseApp from 'layouts/base';

import UserHome from './user-home';
import AdminHome from './admin-home';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BaseApp currentUser={this.props.currentUser}>
        {
          (this.props.currentUser && this.props.currentUser.role.name == 'admin') ?
            <AdminHome /> : <UserHome />
        }
      </BaseApp>
    )
  }
}

User.getCurrentUser().then((response) => {
    ReactDOM.render(<App currentUser={response.data.data}/>,
                    document.getElementById('app'));
  })
  .catch((error) => {
    console.log(error);
    ReactDOM.render(<App currentUser={null}/>,
                    document.getElementById('app'));
  });
