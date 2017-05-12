import React from 'react';
import DatePicker from 'react-datepicker';
import _ from 'lodash';
import moment from 'moment';
import appApi from 'services/app-api';
import AuthorizedToken from 'services/authorized-token';

import datepickerCSS from 'react-datepicker/dist/react-datepicker.css';
import mainCSS from 'assets/stylesheets/main.scss';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: '',
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const target = event.target;

    let submitBtn = target.querySelectorAll("input[type='submit']")[0];
    submitBtn.disabled = true;

    appApi.ready().post(
      '/auth/sign_in',
      this.state.user
    )
    .then((response) => {
      window.location.href = '/';
    })
    .catch((error) => {
      alert('Email or password is not correct')
      submitBtn.disabled = false;
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    let user = _.clone(this.state.user);

    user[name] = value;

    this.setState({user: user})
  }


  render() {
    return (
      <form className="form-center" method="post" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" className="form-control" id='email' name='email' value={this.state.user.email} onChange={this.handleInputChange}/>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" className="form-control" id="password" name="password" value={this.state.user.password} onChange={this.handleInputChange}/>
        </div>

        <input type="submit" className="btn btn-primary" value="Log in"/>
      </form>
    );
  }
}
