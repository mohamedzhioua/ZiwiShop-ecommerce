import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({user,LogoutHandler}) {
  // const userToken = localStorage.getItem("user-token");
  console.log("navbar--->" , user);
  const navigate = useNavigate();

  const Logout = () => {
LogoutHandler()
    navigate("/signin");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          Mern Stack Zhioua-Mohamed
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            <div className="mx-4">
              {!user ? (
                <>
                  <Link className="btn btn-outline" to="/signin">
                    Login
                  </Link>
                  <Link className="btn btn-outline" to="/signup">
                    Register
                  </Link>
                </>
              ) : (
                <Link
                  className="btn btn-outline"
                  to="#"
                  onClick={Logout}
                >
                  logout
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
