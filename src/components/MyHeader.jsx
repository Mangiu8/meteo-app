import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const MyHeader = () => {
  return (
    <Navbar bg="success" expand="lg">
      <Container>
        <Navbar.Brand>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Rai_Meteo_-_Logo_2018.svg/1200px-Rai_Meteo_-_Logo_2018.svg.png"
            alt="Logo"
            height="40"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <Nav.Link href="#previsioni">Previsioni</Nav.Link>
            <Nav.Link href="#regioni">Regioni</Nav.Link>
            <Nav.Link href="#notizie">Notizie</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyHeader;
