import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Header({ user, Logout }) {
  const navigate = useNavigate();

  const LogoutHandler = () => {
    Logout();
    navigate("/signin");
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">Mern Stack Zhioua-Mohamed</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="nav-link active" to="/">
              Profile
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            {!user ? (
              <>
                <Button className="me-1" variant="secondary" href="/signin">
                  {" "}
                  Login
                </Button>
                <Button className="me-1" variant="secondary" href="/signup">
                  {" "}
                  Register
                </Button>
              </>
            ) : (
              <Button variant="secondary" href="#" onClick={LogoutHandler}>
                {" "}
                logout
              </Button>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
