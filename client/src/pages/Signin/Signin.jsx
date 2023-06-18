import { useState } from "react";
import axiosInstance from '../../api/axios'
import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Avatar from '@mui/material/Avatar';
import CustomInput from "../../components/CustomInput";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";
import FacebookAuth from "../../components/FacebookAuth/FacebookAuth";
import { CssBaseline, Link, Container, Grid, Typography } from "@material-ui/core";
import CustomButton from "../../components/CustomButton";
import { FaRegUserCircle } from "react-icons/fa";
import useAuth from '../../hooks/useAuth';
import useMounted from '../../hooks/useMounted';
import { Box } from "@mui/system";

function Signin() {
  const { login } = useAuth();
  const mounted = useMounted();

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
  
      if (mounted()) {
        setStatus({ success: false });
        setSubmitting(false);
      }
    }
  };
  
  const informParent = (response) => {
    const token = response.data.token;
    localStorage.setItem("user-token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(response.data.user));
    window.location.reload(false);

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
      <CssBaseline />

      <Box style={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <Box style={{
          display: 'grid',
          placeItems: 'center',
        }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <FaRegUserCircle />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </Box>
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
            <Grid item xs={12}>
              <GoogleAuth informParent={informParent} />
            </Grid>
            <Grid item xs={12}>
              <FacebookAuth informParent={informParent} />
            </Grid>

            <Grid container style={{ marginTop: '10px' }}
            >
              <Grid item xs>
                <Link
                  color="textSecondary"
                  href="#"
                  variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link color="textSecondary"
                  to="/signup"
                  variant="body2"
                  component={RouterLink}>
                  {"If you don't have an account yet"}
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>


  );

}

export default Signin;
