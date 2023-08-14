import { Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";
import SigninForm from "../../components/auth/SigninForm";

function Signin() {

  const CenteredContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100dvh',
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
        <Typography variant="h2" fontWeight="bold" align="center" marginBottom='20px'>
          Sign in
        </Typography>
        <SigninForm />
      </CustomPaper>
    </CenteredContainer>


  );

}

export default Signin;
