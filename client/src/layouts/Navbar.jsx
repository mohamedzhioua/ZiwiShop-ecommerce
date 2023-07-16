import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Container from '@mui/material/Container';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MenuItem from '@mui/material/MenuItem';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';
import { Link } from "react-router-dom";
import AccountPopover from './AccountPopover ';
import { Badge, Button, IconButton, Box } from '@mui/material';
import DarkButton from '../components/ui/DarkButton';
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from '../app/feature/cartSlice';
import useTheme from '../hooks/useTheme';



function Navbar() {
  const { IsLoggedIn, user } = useAuth();

  const { theme } = useTheme();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigationLinks = [
    { name: "Overview", href: "/dashboard/overview" },
    { name: "Sizes", href: "/dashboard/sizes" },
    { name: "Categories", href: "/dashboard/categories" },
    { name: "Brands", href: "/dashboard/brands" },
    { name: "Products", href: "/dashboard/products" },
    { name: "Home", href: "/" },


  ];
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  let filteredLinks = navigationLinks.filter(
    (item) => IsLoggedIn || item.name === "Home"
  );

  if (IsLoggedIn && user?.role === "ADMIN") {
    // If logged in and role is ADMIN, show all navigation links
    filteredLinks = navigationLinks;
  } else if (IsLoggedIn && user?.role !== "ADMIN") {
    // If logged in but not an ADMIN, show only Home and Profile
    filteredLinks = filteredLinks.filter(
      (item) => item.name === "Home" || item.name === "Profile"
    );
  }

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        backdropFilter: 'blur(6px)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '60px',
        zIndex: 1,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: theme.palette.primary.main,
              textDecoration: 'none',
            }}
          >
            ZiwiShop
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
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
                <MenuItem key={item.name} onClick={handleCloseNavMenu}
                  sx={{
                    width: 150, borderRadius: 3, px: 1,
                    py: 0.5, justifyContent: 'center'
                  }}
                >

                  <Typography

                    variant="h6"
                    component={Link}
                    to={item.href}
                    sx={{
                      textDecoration: 'none',
                      color: theme.palette.primary.main,
                      fontWeight: "bold"
                    }}
                  >
                    {item.name}
                  </Typography>
                </MenuItem>

              ))}


            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              letterSpacing: '.3rem',
              color: theme.palette.primary.main,
              textDecoration: 'none',
            }}
          >
            ZiwiShop
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            {filteredLinks.map((item) => (

              <Button
                variant='h4'
                key={item.name}
                to={item.href}
                component={Link}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: theme.palette.primary.main, display: 'block', fontWeight: "bold" }}
              >{item.name}
              </Button>

            ))}


          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center" gap="5px"
          >
            <IconButton
              aria-label="Search"
              color="primary"
            >
              <SearchOutlinedIcon />
            </IconButton>
            <DarkButton />
            <Badge
              badgeContent={cart.reduce((a, c) => a + Number(c.quantity), 0)}
              color="secondary"
              invisible={cart.length === 0}
              sx={{
                "& .MuiBadge-badge": {
                  right: 5,
                  top: 5,
                  padding: "0 4px",
                  height: "20px",
                  minWidth: "20px",
                  fontSize: "14px",
                  fontWeight: "800"
                },
              }}
            >
              <IconButton
                onClick={() => dispatch(setIsCartOpen({}))}
                aria-label="Shopping Cart"
                color="primary"
              >
                <ShoppingCartOutlinedIcon />
              </IconButton>
            </Badge>
            <AccountPopover />
          </Box>
        </Toolbar>
      </Container>
    </Box >
  );
}
export default Navbar;
