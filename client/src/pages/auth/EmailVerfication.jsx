import { useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/system";
import { Paper, Typography } from '@mui/material';
import CustomButton from "../../components/ui/CustomButton";
import useAuth from "../../hooks/useAuth";

function EmailVerfication() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activationToken = searchParams?.get('activationToken')

  const { verifyemail } = useAuth();

  const handleVerfication = async () => {
    setLoading(true);  
    setError(''); 
    try {
      await verifyemail(activationToken);
   } catch (error) {
     setError(error);
   } finally {
     setLoading(false);  
   }
  };


  const CenteredContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '78dvh',
  });

  const CustomPaper = styled(Paper)({
    width: '85%',
    '@media (min-width: 600px)': {
      width: '50%',
    },
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
    color: 'primary',
  });



  return (
    <CenteredContainer>
      <CustomPaper>
        {error ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h4" fontWeight="bold" align="center" color="error">
              {error}
            </Typography>
          </div>
        ) : (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
            <Typography variant="h2" fontWeight='bold' align='center'>
              Email Verification
            </Typography>
            <Typography variant="h4" align="center" >
              Click on the Link below to Verify Your <b>email</b>.
            </Typography>
            <CustomButton
              variant="contained"
              fullWidth
              color="secondary"
              sx={{
                '@media (min-width: 600px)': {
                  width: '50%',
                },
                padding: '15px',
                borderRadius: '16px',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
              onClick={handleVerfication}
            >
              {loading ? "Verifying....." :'Verify Email'}
            </CustomButton>
          </div>
        )}
      </CustomPaper>
    </CenteredContainer>
  );
}

export default EmailVerfication;
