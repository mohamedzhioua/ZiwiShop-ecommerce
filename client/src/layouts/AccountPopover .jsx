import { Avatar, Popover, Typography } from '@mui/material'
import { useState } from 'react'
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import CustomButton from '../components/CustomButton';

const AccountPopover = () => {
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
            <Box onClick={handleOpenUserMenu}>
                <Avatar src={user?.image}
                    sx={{
                        height: 40,
                        width: 40
                    }} />
            </Box>
            <Popover
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
              
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
             >

                {IsLoggedIn ? (
                    <>
                        <Box sx={{ p: 2 }} >
                            <Typography color="textPrimary" variant="subtitle2">
                                {`${(user?.name)}`}
                            </Typography>
                        </Box>
                        <Box sx={{ p: 2 }}>
                            <CustomButton
                                color="primary"
                                fullWidth
                                onClick={LogoutHandler}
                                variant="outlined"
                            >
                                Logout
                            </CustomButton>
                        </Box>
                    </>
                ) : (
                     <Box sx={{ p: 2 }} gutterBottom>
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
            </Popover>
        </>
    )
}

export default AccountPopover 