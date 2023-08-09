import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { styled } from "@mui/system";
import { Link as RouterLink } from 'react-router-dom';
import { Paper, Typography } from '@mui/material';
import { authApi } from "../../api/authApi";
import CustomButton from "../../components/ui/CustomButton";

function EmailVerfication() {
  const [error, setError] = useState('');
  const [isverified, setIsverified] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activationToken = searchParams?.get('activationToken')


  const handleVerfication = async () => {
    try {
      const res = await authApi.emailverification(activationToken);
      if (res && res.success === true) {
        setIsverified(true);
      }
    } catch (error) {
      setError("Invalid Token! Please request a Email verification again by Login"
      );
    }
  };


  const CenteredContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    '@media (min-width: 600px)': {
      gap: '52px',
    },
    width: '100%',
    height: '100vh',
  });

  const CustomPaper = styled(Paper)({
    width: '75%',
    '@media (min-width: 600px)': {
      width: '50%',
    },
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
    color: 'primary',
  });


  const CustomLink = styled(Link)({
    color: 'white',
    '&:hover': {
      fontSize: '18px',
    },
  });
  return (
    <CenteredContainer>
      <CustomPaper>
        {isverified ? (
          <div>
            <Typography variant="h4" fontWeight="bold">
              Email verified Successfully.
            </Typography>
            <Typography align="center">
              Please{' '}
              <CustomLink component={RouterLink} to="/auth/signin">
                Login Now.
              </CustomLink>
            </Typography>
          </div>
        ) : error ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h4" fontWeight="bold" align="center" color="error">
              {error}
            </Typography>
          </div>
        ) : (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
            <Typography variant="h4" fontWeight="bold">
              Email Verification
            </Typography>
            <Typography variant="body1" align="center" fontSize="16px">
              Click on the Link below to Verify Your email.
            </Typography>
            <CustomButton variant="contained" sx={{
              width: '50%',
              padding: '15px',
              borderRadius: '16px',
               fontWeight: 'bold',
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }} onClick={handleVerfication}>
              Verify Email
            </CustomButton>
          </div>
        )}
      </CustomPaper>
    </CenteredContainer>
  );
}

export default EmailVerfication;
