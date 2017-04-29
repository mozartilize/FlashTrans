import React from 'react';
import DatePicker from 'react-datepicker';
import _ from 'lodash';
import moment from 'moment';

import datepickerCSS from 'react-datepicker/dist/react-datepicker.css';


export default class UserForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let firstName,
        lastName,
        birthday,
        email,
        address,
        phoneNumber,
        password,
        passwordConfirmation;

    if (this.props.user.email !== undefined) {
      email = (
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" className="form-control" id='email' name='email' value={this.props.user.email} onChange={this.props.inputChange}/>
        </div>
      )
    }

    if (this.props.user.password !== undefined) {
      password = (
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" className="form-control" id="password" name="password" value={this.props.user.password} onChange={this.props.inputChange}/>
        </div>
      )
    }

    if (this.props.user.password_confirmation !== undefined) {
      passwordConfirmation = (
        <div className="form-group">
          <label htmlFor="password-confirmation">Password Confirmation:</label>
          <input type="password" className="form-control" id="password-confirmation" name="password_confirmation" value={this.props.user.password_confirmation} onChange={this.props.inputChange}/>
        </div>
      );
    }

    if (this.props.user.first_name !== undefined) {
      firstName = (
        <div className="form-group">
          <label htmlFor="first-name">First Name:</label>
          <input type="text" className="form-control" id='first-name' name='first_name' value={this.props.user.first_name} onChange={this.props.inputChange}/>
        </div>
      )
    }

    if (this.props.user.last_name !== undefined) {
      lastName = (
        <div className="form-group">
          <label htmlFor="last-name">Last Name:</label>
          <input type="text" className="form-control" id='last-name' name='last_name' value={this.props.user.last_name} onChange={this.props.inputChange}/>
        </div>
      )
    }

    if (this.props.user.birthday !== undefined) {
      birthday = (
        <div className="form-group">
          <label htmlFor="birthday">Birthday:</label>
          <DatePicker
            className="form-control"
            selected={this.props.date}
            onChange={this.props.datepickerChange}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            maxDate={moment()} />
        </div>
      )
    }

    if (this.props.user.address !== undefined) {
      address = (
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" className="form-control" id='address' name='address' value={this.props.user.address} onChange={this.props.inputChange}/>
        </div>
      )
    }

    if (this.props.user.phone_number !== undefined) {
      phoneNumber = (
        <div className="form-group">
          <label htmlFor="phone-number">Phone Number:</label>
          <input type="text" className="form-control" id='phone-number' name='phone_number' value={this.props.user.phone_number} onChange={this.props.inputChange}/>
        </div>
      )
    }

    return (
      <form method="post" onSubmit={this.props.onSubmit} className={ this.props.formClasses }>

        {firstName}

        {lastName}

        {birthday}

        {email}

        {password}

        {passwordConfirmation}

        {address}

        {phoneNumber}

        <input type="submit" className="btn btn-primary" value={this.props.submitBtn}/>
      </form>
    );
  }
}
