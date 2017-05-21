import React from 'react';
import _ from 'lodash';

import appApi from 'services/app-api';

import CustomForm from 'components/custom-form';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: '',
      },
      errors: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const target = event.target;

    let submitBtn = target.querySelectorAll("input[type='submit']")[0];
    submitBtn.disabled = true;
    this.setState({errors: ''});

    appApi.ready().post(
      '/auth/sign_in',
      this.state.user
    )
    .then((response) => {
      window.location.href = '/';
    })
    .catch((error) => {
      this.setState({errors: 'Email or password is not correct'});
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
      <CustomForm
        header={"Login"}
        errors={this.state.errors}
        className="form-center"
        onSubmit={this.handleSubmit}
        form={
          <section>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" className="form-control" id='email' name='email' value={this.state.user.email} onChange={this.handleInputChange}/>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" className="form-control" id="password" name="password" value={this.state.user.password} onChange={this.handleInputChange}/>
            </div>

            <input type="submit" className="btn btn-primary" value="Log in"/>
          </section>
        }
      />
    );
  }
}
