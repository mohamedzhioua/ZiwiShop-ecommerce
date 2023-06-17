import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import RegisterIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/ExitToApp";

function Header({ user, Logout }) {
  const navigate = useNavigate();

  const LogoutHandler = () => {
    Logout();
    navigate("/signin");
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Mern Stack Zhioua-Mohamed
        </Typography>
        <div>
          <Button component={Link} to="/" color="inherit">
            <HomeIcon style={{ marginRight: "0.5rem" }} />
            Profile
          </Button>
          {!user ? (
            <>
              <Button component={Link} to="/signin" color="inherit">
                <LoginIcon style={{ marginRight: "0.5rem" }} />
                Login
              </Button>
              <Button component={Link} to="/signup" color="inherit">
                <RegisterIcon style={{ marginRight: "0.5rem" }} />
                Register
              </Button>
            </>
          ) : (
            <Button onClick={LogoutHandler} color="inherit">
              <LogoutIcon style={{ marginRight: "0.5rem" }} />
              Logout
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  user: PropTypes.any,
  Logout: PropTypes.func.isRequired,
};

export default Header;
