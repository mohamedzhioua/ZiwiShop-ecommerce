import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from '@mui/material';
import CustomButton from '../components/ui/CustomButton';
import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useLocation } from 'react-router-dom';

const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}));

const Error403 = () => {
  const { pathname } = useLocation()
  const { logout } = useAuth();

  useEffect(() => {
    if (pathname === '/403') {
      const handleLogout = async () => {
        try {
          await logout();
        } catch (error) {
          console.log(" error", error.message);
        }
      };
      handleLogout();
    }
  }, [pathname]);

  return (
    <Box className='content-center'>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <BoxWrapper>
          <Typography variant='h1'>403</Typography>
          <Typography variant='h5' sx={{ mb: 1, fontSize: '1.5rem !important' }}>
            Session Expired! ⌛️
          </Typography>
          <Typography variant='body2'>
            Your session has expired for security reasons. Please log in again to continue.
          </Typography>
        </BoxWrapper>
        <Link passHref href='/signin'>
          <CustomButton component='a' variant='contained' sx={{ px: 5.5, mt: 2 }}>
            Log In
          </CustomButton>
        </Link>
      </Box>
    </Box>
  );
}

export default Error403;
