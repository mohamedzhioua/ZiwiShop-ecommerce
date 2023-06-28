import Toolbar from '@mui/material/Toolbar';
 import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'; import Container from '@mui/material/Container';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MenuItem from '@mui/material/MenuItem';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';
import { Link } from "react-router-dom";
import AccountPopover from './AccountPopover ';
import { Badge, Button ,IconButton ,Box} from '@mui/material';
import DarkButton from '../components/DarkButton/DarkButton';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from '../app/feature/cartSlice';



function Navbar() {
  const { IsLoggedIn } = useAuth();
  const theme = useTheme();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
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
          {/* <FaLaptopCode sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}size={20} /> */}
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to={"/"}
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
            Ziwi
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
                <MenuItem key={item.name} onClick={handleCloseNavMenu} PaperProps={{ sx: { width: 200 } }}
                  sx={{
                    width: 130, borderRadius: 1, px: 1,
                    py: 0.5, justifyContent: 'center'
                  }}
                >

                  <Typography
                    variant="h5"
                    component={Link}
                    to={item.href}
                    sx={{
                      textDecoration: 'none',
                      color: theme.palette.primary.main,
                    }}
                  >
                    {item.name}
                  </Typography>
                </MenuItem>

              ))}


            </Menu>
          </Box>
          {/* <FaLaptopCode sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} size={30}/> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
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
            Ziwi
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            {filteredLinks.map((item) => (

              <Button
                key={item.name}
                to={item.href}
                component={Link}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: theme.palette.primary.main, display: 'block' }}
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
              badgeContent={cart.length}
              color="secondary"
              invisible={cart.length === 0}
              sx={{
                "& .MuiBadge-badge": {
                  right: 5,
                  top: 5,
                  padding: "0 4px",
                  height: "14px",
                  minWidth: "13px",
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