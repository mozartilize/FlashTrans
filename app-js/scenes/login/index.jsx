import React from 'react';
import ReactDOM from 'react-dom';

import User from 'services/user';

import LoginForm from 'components/login-form';

User.getCurrentUser().then(response => {
  window.location.href = '/';
}).catch(err => {
  ReactDOM.render(<LoginForm />, document.getElementById('app'))
})
