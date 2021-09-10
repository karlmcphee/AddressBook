import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';

const Header = () => {
    return (
        <div><Navbar bg="primary" variant="dark" expand="lg"  style={{backgroundColor: '#63a4ff'}}>
    <Container>
      <Navbar.Brand href="/">Address Book</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="ViewBook">View Book</Nav.Link>
          <Nav.Link href="AddEntry">Add Entry</Nav.Link>
          <Nav.Link href="Search">Search</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
        </div>
    )
}

export default Header
