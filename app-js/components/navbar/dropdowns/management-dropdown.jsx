import React from 'react';
import {NavDropdown} from 'react-bootstrap';

export default class ManagementDropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavDropdown eventKey={this.props.eventKey} title="Management" id="management">
        {this.props.children}
      </NavDropdown>
    )
  }
}