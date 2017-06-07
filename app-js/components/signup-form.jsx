import React from 'react';

import appApi from 'services/app-api';

import UserForm from 'components/user-form';

export default class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDatepickerChange = this.handleDatepickerChange.bind(this);

    this.state = {
      datepicker: null,
      user: {
        first_name: '',
        last_name: '',
        birthday: '',
        email: '',
        address: '',
        phone_number: '',
        password: '',
        password_confirmation: ''
      },
      errors: ''
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    let user = _.clone(this.state.user);

    user[name] = value;

    this.setState({user: user})
  }

  handleDatepickerChange(date) {
    let user = _.clone(this.state.user);

    user['birthday'] = date.format("YYYYMMDD");

    this.setState({user: user, datepicker: date})
  }

  handleSubmit(event) {
    event.preventDefault();

    const target = event.target;

    let submitBtn = target.querySelectorAll("input[type='submit']")[0];
    submitBtn.disabled = true;
    this.setState({errors: ''});

    appApi.ready().post('/auth', { user: this.state.user })
    .then((response) => {
      alert('An confirmation email has been sent to you. Please check you email and follow instructions.')
      window.location.href = '/';
    })
    .catch((error) => {
      submitBtn.disabled = false;
      if (error.response) {
        this.setState({errors: error.response.data.errors.full_messages});
      }
    });
  }

  render() {
    return (
      <UserForm submitBtn="Sign up"
                header="Sign up"
                formClasses="form-center"
                user={this.state.user}
                date={this.state.datepicker}
                errors={this.state.errors}
                onSubmit={this.handleSubmit}
                inputChange={this.handleInputChange}
                datepickerChange={this.handleDatepickerChange} />
    );
  }
}
