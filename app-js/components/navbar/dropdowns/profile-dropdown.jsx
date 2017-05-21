import React from 'react';
import {NavDropdown, MenuItem} from 'react-bootstrap';

import appApi from 'services/app-api';
import AuthorizedToken from 'services/authorized-token';

export default class ProfileDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.handleProfileClicked = this.handleProfileClicked.bind(this);
    this.handleSignoutClicked = this.handleSignoutClicked.bind(this);
  }

  handleProfileClicked() {

  }

  handleSignoutClicked() {
    appApi.ready().delete('/auth/sign_out')
    .then(response => {
      AuthorizedToken.removeCredentials();
      window.location.href = '/';
    })
    .catch(error => {})
  }

  render() {
    return (
      <NavDropdown eventKey={1} title={this.props.user.email} id="profile">
        <MenuItem eventKey={1.1} href="/profile">Profile</MenuItem>
        <MenuItem eventKey={1.2} onClick={this.handleSignoutClicked}>Sign out</MenuItem>
      </NavDropdown>
    )
  }
}
