import { Avatar, Badge, Divider, IconButton, ListItemButton, ListItemText, Popover, Typography } from '@mui/material'
import { useState } from 'react'
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import CustomButton from '../../components/ui/CustomButton';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { styled } from '@mui/material/styles'



const BadgeContentSpan = styled('span')(({ theme }) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: theme.palette.success.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = () => {
     const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate();
    const { user, IsLoggedIn, logout } = useAuth();

    const LogoutHandler = async () => {
        try {
            handleCloseUserMenu()
            await logout();
            navigate('/signin');
        } catch (err) {
            console.error(err);

        }
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        < >
            <Badge
                onClick={handleOpenUserMenu}
                sx={{
                    '&:hover': {
                        cursor: "pointer"
                    }, alignItems: 'center',
                    display: 'flex',

                }}
                badgeContent={IsLoggedIn ? <BadgeContentSpan/>  : ""}
                overlap='circular'
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}

            >
                <Avatar
                    sx={{ width: 40, height: 40 }}
                    src={user?.image}
                />
            </Badge>
            <Popover
                slotProps={{
                    paper: {
                        sx: {
                            width: 240,
                            borderRadius: 3,
                            px: 1,
                            py: 0.5,
                            mt: '45px'
                        }
                    }
                }}
                disableScrollLock
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMountedF
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}

                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >

                {IsLoggedIn ? (
                    <>
                        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Badge
                                    badgeContent={<BadgeContentSpan />}
                                    overlap='circular'
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}

                                >
                                    <Avatar
                                        sx={{ width: '2.5rem', height: '2.5rem'  }}
                                        src={user?.image}
                                    />
                                </Badge>
                                <Box sx={{ display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
                                    <Typography sx={{ fontFamily: 'monospace', letterSpacing: '.3rem', align: 'center', fontWeight: "bold" }}>
                                        {`${(user?.name)}`}
                                    </Typography>
                                    <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                                        {`${(user?.role === "USER" ? "Client" : user?.role)}`}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Divider />
                        <ListItemButton
                            component={Link}
                            to="/profile"
                            onClick={handleCloseUserMenu}
                            sx={{
                                borderRadius: 1,
                                px: 1,
                                py: 0.5
                            }}
                        >
                            <IconButton
                                color="primary"
                            >
                                <PersonOutlineOutlinedIcon />

                            </IconButton>
                            <ListItemText
                                primary={(
                                    <Typography variant="h4" >
                                        Profile
                                    </Typography>
                                )}
                            />
                        </ListItemButton>
                        <ListItemButton
                            component={Link}
                            onClick={handleCloseUserMenu}
                            to="/OrderHistory"
                            sx={{
                                borderRadius: 1,
                                px: 1,
                                py: 0.5
                            }}
                        >
                            <IconButton
                                color="primary"
                            >
                                <ShoppingBasketOutlinedIcon />

                            </IconButton>
                            <ListItemText
                                primary={(
                                    <Typography variant="h4" >

                                        Order History
                                    </Typography>
                                )}
                            />
                        </ListItemButton>
                        <ListItemButton
                            component={Link}
                            to="/ZiwiShop/FAQ"
                            onClick={handleCloseUserMenu}
                            sx={{
                                borderRadius: 1,
                                px: 1,
                                py: 0.5
                            }}
                        >
                            <IconButton
                                color="primary"
                            >
                                <HelpOutlineOutlinedIcon />

                            </IconButton>
                            <ListItemText
                                primary={(
                                    <Typography variant="h4" >

                                        FAQ
                                    </Typography>
                                )}
                            />
                        </ListItemButton>
                        <Box sx={{ p: 1.5 }}>
                            <CustomButton
                                color="primary"
                                fullWidth
                                onClick={LogoutHandler}
                                variant="outlined"
                                startIcon={<ExitToAppOutlinedIcon />}

                            >
                                Logout

                            </CustomButton>
                        </Box>
                    </>
                ) : (
                    <Box sx={{ p: 2 }} >
                        <CustomButton
                            component={Link}
                            to="/signin"
                            color="primary"
                            fullWidth
                            variant="outlined"
                            includeSpacing
                        >
                            LOGIN
                        </CustomButton>
                        <CustomButton
                            component={Link}
                            to="/signup"
                            color="primary"
                            fullWidth
                            variant="outlined"
                        >
                            REGISTER
                        </CustomButton>
                    </Box>
                )}
            </Popover >
        </>
    )
}

export default UserDropdown 