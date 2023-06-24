import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';
import { Link } from "react-router-dom";
import AccountPopover from './AccountPopover ';
import { Button } from '@mui/material';



function Navbar() {
  const { IsLoggedIn } = useAuth();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigationLinks = [
    { name: "Home", href: "/home" },
    { name: "Profile", href: "/" },
    { name: "Blog", href: "/blog" },
  ];
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const filteredLinks = navigationLinks.filter(
    (item) => IsLoggedIn || (item.name == "Home")
  );

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={"/"}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >

              {filteredLinks.map((item) => (
                <MenuItem key={item.name} onClick={handleCloseNavMenu}>

                  <Typography
                    component={Link}
                    to={item.href}
                    textAlign="center"
                    sx={{
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    {item.name}
                  </Typography>
                </MenuItem>

              ))}


            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            {filteredLinks.map((item) => (

              <Button
                key={item.name}
                to={item.href}
                component={Link}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >{item.name}
              </Button>

            ))}


          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <AccountPopover />
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  );
}
export default Navbar;
