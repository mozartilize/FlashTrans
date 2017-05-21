import React from 'react';
import {MenuItem} from 'react-bootstrap';

import ManagementDropdown from './management-dropdown';

export default class ManagementDropdownUser extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ManagementDropdown>
        <MenuItem eventKey={3.1} href="/management/user/orders">Orders</MenuItem>
      </ManagementDropdown>
    )
  }
}
