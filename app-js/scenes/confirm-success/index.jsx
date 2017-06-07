import React from 'react';
import ReactDOM from 'react-dom';

import {getUrlParameter} from 'services/url';
import AuthorizedToken from 'services/authorized-token';
import User from 'services/user';

import BaseApp from 'layouts/base';

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
        <div className="alert alert-success" role="alert">
          <p>Hello <strong>{this.state.currentUser.full_name}</strong>!</p>
          <p>You successfully confirmed your email.</p>
          <p>Welcome to FlashTrans.</p>
        </div>
      </BaseApp>
    )
  }
}

const credentials = {
  'access-token': getUrlParameter('token'),
  'uid': getUrlParameter('uid'),
  'client': getUrlParameter('client_id')
}

AuthorizedToken.storeCredentials(credentials);

User.getCurrentUser().then(response => {
    ReactDOM.render(<App currentUser={response.data.data}/>,
                    document.getElementById('app'));
  })
  .catch(error => {
    alert(error);
    window.location.href = '/';
  })

