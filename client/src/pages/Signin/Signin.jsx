import axios from "axios";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../components/CustomInput";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";
import FacebookAuth from "../../components/FacebookAuth/FacebookAuth";
import { CssBaseline, Link, Avatar, Container, Grid, Typography } from "@material-ui/core";
import CustomButton from "../../components/CustomButton";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import { Box } from "@mui/system";

function Signin() {
  const [serverErrors, setServerErrors] = useState({});
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmitHandler = (values, { setSubmitting }) => {
    setSubmitting(true);
    axios
      .post(`${import.meta.env.VITE_API_URL}/user/signin`, values)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("user-token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(response.data.user));

        window.location.reload(false);

      })
      .catch((err) => {
        setSubmitting(false);
        setServerErrors(err.response.data);
      });
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <AccountCircleOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

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
                color="primary"
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
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2" component={RouterLink}>
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
