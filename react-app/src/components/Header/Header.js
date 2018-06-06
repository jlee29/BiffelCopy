import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import initiateCreateBiffel from '../../actions/initiateCreateBiffel';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import './Header.css'

const Header = (props) => (
  <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand className="navbar-brand">
            <span><img className="logo" src="https://thumb.ibb.co/ctNaSo/34497858_1998022223846047_6463238276474994688_n.png"/></span>
            <h3 id="biffelTitle">biffel</h3>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse className="salmon">
          <Nav pullRight>
            <LinkContainer to="/buy">
              <NavItem className="navitem">Buy Slots</NavItem>
            </LinkContainer>
            <LinkContainer to="/sell">
              <NavItem className="navitem">Create Biffel</NavItem>
            </LinkContainer>
            <LinkContainer to="/profile">
              <NavItem className="navitem">Profile</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
)

// <div className="flexbox">
//   <img className="logo" src="https://thumb.ibb.co/hnAbiT/biffel_Logo.png"/>
//   <h3>Biffel</h3>
// </div>

Header.propTypes = {
  initiateCreateBiffel: PropTypes.func
};

function mapDispatchToProps(dispatch) {
  return {
    initiateCreateBiffel: bindActionCreators(initiateCreateBiffel, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps,
  null, 
  { pure: false }
)(Header);
