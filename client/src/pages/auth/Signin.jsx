import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Avatar from '@mui/material/Avatar';
import CustomInput from "../../components/ui/CustomInput";
import { Link, Container, Unstable_Grid2 as Grid, Typography } from "@mui/material";
import CustomButton from "../../components/ui/CustomButton";
import { FaRegUserCircle } from "react-icons/fa";
import useAuth from '../../hooks/useAuth';
import { Box } from "@mui/system";
import { CardContent } from "@mui/material";
import { tokens } from "../../theme/theme";
import useTheme from "../../hooks/useTheme";
import SocialAuth from "../../components/SocialAuth";

function Signin() {
  const { login } = useAuth();
  const { theme } = useTheme();
  const colors = tokens(theme.palette.mode);
  const [serverErrors, setServerErrors] = useState({});
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmitHandler = async (values, { setStatus, setSubmitting }) => {
    try {
      await login(values.email, values.password);
    } catch (error) {
      console.error(error);
      setServerErrors(error);
      setStatus({ success: false });
      setSubmitting(false);

    }
  };


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmitHandler,
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = formik;

  return (

    <Container component="main" maxWidth="xs" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>

      <Box style={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <Box style={{
          display: 'grid',
          placeItems: 'center',
        }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <FaRegUserCircle />
          </Avatar>
          <Typography variant="h5">
            Sign in
          </Typography>
        </Box>
        <CardContent>
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomInput
                  label="Email*"
                  placeholder="name@example.com"
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && (errors.email || serverErrors.email)}
                  helperText={touched.email && (errors.email || serverErrors.email)}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomInput
                  label="Password*"
                  placeholder="password"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && (errors.password || serverErrors.password)}
                  helperText={touched.password && (errors.password || serverErrors.password)}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomButton
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                >
                  {isSubmitting ? "Signing in..." : "Continue"}
                </CustomButton>
              </Grid>
              <Grid item xs={12} >

                <SocialAuth />
              </Grid>

              <Grid container
                style={{
                  marginTop: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Grid item>
                  <Link
                    style={{
                      color: colors.grey[100]
                      , textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      }
                    }}
                    to="/ForgetPassword"
                  variant="h5"
                    component={RouterLink}
                  >
                    {'Forgot password?'}
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                   component={RouterLink}
                    style={{
                      color: colors.grey[100], textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      }
                    }}
                    to="/signup"
                    variant="h5"
                  >
                    {"If you don't have an account yet"}
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </CardContent>

      </Box>
    </Container >


  );

}

export default Signin;
