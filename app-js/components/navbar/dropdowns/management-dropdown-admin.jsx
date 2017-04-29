import React from 'react';
import {MenuItem} from 'react-bootstrap';

import ManagementDropdown from './management-dropdown';

export default class ManagementDropdownAdmin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ManagementDropdown>
        <MenuItem eventKey={3.1} href="/management/shippers">Shippers</MenuItem>
        <MenuItem eventKey={3.2} href="/management/shipments">Shipments</MenuItem>
        <MenuItem eventKey={3.3} href="/management/rates">Rates</MenuItem>
      </ManagementDropdown>
    )
  }
}