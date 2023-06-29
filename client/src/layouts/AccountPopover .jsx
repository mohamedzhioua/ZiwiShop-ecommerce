import { Avatar, Divider, Popover, Typography } from '@mui/material'
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
            <Box
                onClick={handleOpenUserMenu}
                sx={{
                    '&:hover': {
                        cursor: "pointer"
                    }, alignItems: 'center',
                    display: 'flex'
                }}
            >
                <Avatar
                    sx={{
                        height: 34,
                        width: 34
                    }}
                    src={user?.image}
                />
            </Box>
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
                        <Box sx={{ p: 2 }} >
                            <Typography variant="h5">
                                {`${(user?.name)}`}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ p: 1.5 }}>
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
            </Popover>
        </>
    )
}

export default AccountPopover 