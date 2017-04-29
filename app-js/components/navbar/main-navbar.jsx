import React from 'react';

import {Nav, Navbar, NavItem} from 'react-bootstrap';
import ProfileDropdown from './dropdowns/profile-dropdown';
import ManagementDropdownAdmin from './dropdowns/management-dropdown-admin';
import ManagementDropdownUser from './dropdowns/management-dropdown-user';
import ManagementDropdownShipper from './dropdowns/management-dropdown-shipper';


export default class MainNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({currentUser: nextProps.currentUser});
  }

  render() {
    const currentUser = this.state.currentUser;
    let pullRightItem, managementDropdown;
    // if (Object.keys(currentUser).length !== 0) {
    if (currentUser !== null) {
      console.log(currentUser);
      pullRightItem = <Nav pullRight><ProfileDropdown user={currentUser} /></Nav>;

      switch (currentUser.role.name) {
        case 'admin':
          managementDropdown = <ManagementDropdownAdmin eventKey={3} />;
          break;
        case 'user':
          managementDropdown = <ManagementDropdownUser eventKey={3} />;
          break;
        case 'shipper':
          managementDropdown = <ManagementDropdownShipper eventKey={3} />;
          break;
      }
    }
    else {
      pullRightItem = (
        <Nav pullRight>
          <NavItem eventKey={1} href="/login">Log in</NavItem>
          <NavItem eventKey={2} href="/signup">Sign up</NavItem>
        </Nav>
      );
    }

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">FlashTrans</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="/services">Services</NavItem>
          <NavItem eventKey={2} href="/rates">Rates</NavItem>
          {managementDropdown}
        </Nav>
        {pullRightItem}
      </Navbar>
    );
  }
}