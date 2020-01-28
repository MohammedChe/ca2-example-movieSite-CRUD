import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'

export default class MyNavbar extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand to="/">Movies</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/movies/create">Create</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
