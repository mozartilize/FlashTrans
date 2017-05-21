import React from 'react';

import CustomForm from 'components/custom-form';

import CustomDatePicker from 'components/custom-date-picker';


const UserForm = (props) => {
  let firstName,
      lastName,
      birthday,
      email,
      address,
      phoneNumber,
      password,
      passwordConfirmation;

  if (props.user.email !== undefined) {
    email = (
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" className="form-control" id='email' name='email' value={props.user.email} onChange={props.inputChange}/>
      </div>
    )
  }

  if (props.user.password !== undefined) {
    password = (
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" className="form-control" id="password" name="password" value={props.user.password} onChange={props.inputChange}/>
      </div>
    )
  }

  if (props.user.password_confirmation !== undefined) {
    passwordConfirmation = (
      <div className="form-group">
        <label htmlFor="password-confirmation">Password Confirmation:</label>
        <input type="password" className="form-control" id="password-confirmation" name="password_confirmation" value={props.user.password_confirmation} onChange={props.inputChange}/>
      </div>
    );
  }

  if (props.user.first_name !== undefined) {
    firstName = (
      <div className="form-group">
        <label htmlFor="first-name">First Name:</label>
        <input type="text" className="form-control" id='first-name' name='first_name' value={props.user.first_name} onChange={props.inputChange}/>
      </div>
    )
  }

  if (props.user.last_name !== undefined) {
    lastName = (
      <div className="form-group">
        <label htmlFor="last-name">Last Name:</label>
        <input type="text" className="form-control" id='last-name' name='last_name' value={props.user.last_name} onChange={props.inputChange}/>
      </div>
    )
  }

  if (props.user.birthday !== undefined) {
    birthday = (
      <div className="form-group">
        <label htmlFor="birthday">Birthday:</label>
        <CustomDatePicker
          className="form-control"
          selected={props.date}
          onChange={props.datepickerChange} />
      </div>
    )
  }

  if (props.user.address !== undefined) {
    address = (
      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input type="text" className="form-control" id='address' name='address' value={props.user.address} onChange={props.inputChange}/>
      </div>
    )
  }

  if (props.user.phone_number !== undefined) {
    phoneNumber = (
      <div className="form-group">
        <label htmlFor="phone-number">Phone Number:</label>
        <input type="text" className="form-control" id='phone-number' name='phone_number' value={props.user.phone_number} onChange={props.inputChange}/>
      </div>
    )
  }

  return (
    <CustomForm
      className={props.formClasses}
      onSubmit={props.onSubmit}
      header={props.headers}
      errors={props.errors}
      form= {
        <section>
          {firstName}

          {lastName}

          {birthday}

          {email}

          {password}

          {passwordConfirmation}

          {address}

          {phoneNumber}

          <input type="submit" className="btn btn-primary" value={props.submitBtn}/>
        </section>
      }
    />
  );
}

export default UserForm;
