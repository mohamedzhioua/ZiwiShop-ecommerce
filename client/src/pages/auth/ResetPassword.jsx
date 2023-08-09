import { Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";

function ResetPassword() {

  const CenteredContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '78vh',
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
        Password Reset
        </Typography>
        <ResetPasswordForm />
      </CustomPaper>
    </CenteredContainer>


  );

}

export default ResetPassword;
