import React from 'react';
import {MenuItem} from 'react-bootstrap';

import ManagementDropdown from './management-dropdown';

export default class ManagementDropdownShipper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ManagementDropdown>
        <MenuItem eventKey={3.1} href="/management/shipper/shipments">Shipments</MenuItem>
      </ManagementDropdown>
    )
  }
}
