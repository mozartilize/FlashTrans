import React from 'react';
import axios from 'axios';
import config from 'config';
import AuthorizedToken from 'services/authorized-token';
import UserForm from 'components/user-form';

import mainCSS from 'assets/stylesheets/main.scss';

export default class ShipperCreattionForm extends React.Component {
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
        phone_number: ''
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
    this.setState({errors: ''})

    axios.post(
      config.apiUrl + '/auth',
      { user: this.state.user }
    )
    .then((response) => {
      // window.location.href = '/management/admin/shippers';
      this.props.history.push('/management/admin/shippers');
    })
    .catch((error) => {
      if (error.response) {
        this.setState({errors: error.response.data.errors.full_messages})
      }
      submitBtn.disabled = false;
    });
  }

  render() {
    return (
      <UserForm submitBtn="Create"
                errors={this.state.errors}
                user={this.state.user}
                date={this.state.datepicker}
                onSubmit={this.handleSubmit}
                inputChange={this.handleInputChange}
                datepickerChange={this.handleDatepickerChange} />
    );
  }
}
