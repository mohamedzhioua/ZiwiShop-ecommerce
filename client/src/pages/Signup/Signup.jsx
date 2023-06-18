import { useFormik } from "formik";
import * as Yup from "yup";
import { Link as RouterLink } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { AiOutlineLock } from 'react-icons/ai';
import axiosInstance from '../../api/axios'
import { Box, Link, Container, CssBaseline, Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

const Signup = () => {
  const [serverErrors, setServerErrors] = useState({});

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async(values, { setSubmitting }) => {
    setSubmitting(true);
    axiosInstance
      .post(`${import.meta.env.VITE_API_URL}/user/signup`, values)
      .then((response) => {

      })
      .catch((err) => {
        setSubmitting(false);
        setServerErrors(err.response.data);

      });
  };


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
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

    <Container component="main" maxWidth="xs"
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <CssBaseline />

      <Box
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10
        }}

      >  <Box style={{
        display: 'grid',
        placeItems: 'center',
      }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AiOutlineLock />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>

          <Typography variant="subtitle1" component="p" color="textSecondary" align="center">
            Create an account!
          </Typography>
        </Box>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomInput
                label="Name*"
                placeholder="name"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && !!(errors.name || serverErrors.name)}
                helperText={touched.name && (errors.name || serverErrors.name)}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                label="Email*"
                placeholder="name@example.com"
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && !!(errors.email || serverErrors.email)}
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
                error={touched.password && !!(errors.password || serverErrors.password)}
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
                {isSubmitting ? "Sign Up..." : "Continue"}
              </CustomButton>
            </Grid>
            <Grid container style={{ marginTop: '10px', display: 'grid', placeItems: 'center' }}>
              <Link
                color="textSecondary"
                to="/signin"
                variant="body2"
                component={RouterLink}>
                {" Already have an account?  Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;
