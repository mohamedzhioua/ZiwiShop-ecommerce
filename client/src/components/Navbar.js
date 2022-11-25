import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
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
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {!user ? (
              <>
                <Nav.Link className="btn btn-outline" to="/signin">
                  {" "}
                  Login
                </Nav.Link>
                <Nav.Link className="btn btn-outline" to="/signup">
                  {" "}
                  Register
                </Nav.Link>
              </>
            ) : (
              <Nav.Link
                className="btn btn-outline"
                to="#"
                onClick={LogoutHandler}
              >
                {" "}
                logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
