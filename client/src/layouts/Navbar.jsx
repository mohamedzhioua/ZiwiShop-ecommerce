import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Container from '@mui/material/Container';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';
import { Link } from "react-router-dom";
import AccountPopover from './AccountPopover ';
import { Badge, Button, IconButton, Box, useMediaQuery } from '@mui/material';
import DarkButton from '../components/ui/DarkButton';
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from '../app/feature/cartSlice';
import useTheme from '../hooks/useTheme';
import BrandsPopover from "./BrandsPopover"
 import { SideNav } from './SideNav';
import Logo from '../components/ui/Logo';


const brands = [
  {
    name: "brands",
    children: [{
      _id: '64a858793e772c0aad8c879c',
      name: 'Adidas'
    },
    {
      _id: '64a858993e772c0aad8c87a1',
      name: 'Louis Vuitton'
    },
    {
      _id: '64a858b63e772c0aad8c87a6',
      name: 'GUCCI'
    },
    {
      _id: '64a858cb3e772c0aad8c87ad',
      name: 'NIKE'
    },
    {
      _id: '64b03983ec95da3aad0ed8b5',
      name: 'Celio'
    }]
  }
];

function Navbar() {
  const { IsLoggedIn, user } = useAuth();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isMobileScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const handleOpenNavMenu = () => {
    setIsSideNavOpen(true);
  };

  const handleCloseNavMenu = () => {
    setIsSideNavOpen(false);
  };

  const navigationLinks = [

    { name: "Overview", href: "/dashboard/overview" },
    { name: "Sizes", href: "/dashboard/sizes" },
    { name: "Categories", href: "/dashboard/categories" },
    { name: "Brands", href: "/dashboard/brands" },
    { name: "Products", href: "/dashboard/products" },
    { name: "Home", href: "/" }
  ];

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
       style={{
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

          {!isMobileScreen && (<Logo />)}
          <Box sx={{ flexGrow: 1 }}>
            {isMobileScreen && (
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
            )}

            {isMobileScreen && isSideNavOpen && (
              <SideNav onClose={handleCloseNavMenu} open={handleOpenNavMenu} />
            )}
          </Box>
          {isMobileScreen && (<Logo />)}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            {filteredLinks.map((item) => (

              <Button
                variant='h4'
                key={item.name}
                to={item.href}
                component={Link}
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
            {!isMobileScreen && (<BrandsPopover brands={brands} />)}

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
