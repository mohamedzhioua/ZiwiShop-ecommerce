import { useFormik } from "formik";
import * as Yup from "yup";
import { Link as RouterLink } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { AiOutlineLock } from 'react-icons/ai';
import { Box, Link, Container, Grid, Typography, CardContent } from "@material-ui/core";
import { useState } from "react";
import CustomInput from "../components/ui/CustomInput";
import CustomButton from "../components/ui/CustomButton";
 import useAuth from "../hooks/useAuth";
 import { tokens } from "../theme/theme";
import useTheme from "../hooks/useTheme";

const Signup = () => {
  const { register } = useAuth();
   const {theme} = useTheme();
  const colors = tokens(theme.palette.mode);
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

  const onSubmit = async (values, { setStatus, setSubmitting }) => {
    try {
      await register(values.email, values.name, values.password);
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
      <Box
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10
        }}

      >
        <Box style={{
          display: 'grid',
          placeItems: 'center',
        }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AiOutlineLock />
          </Avatar>
          <Typography variant="h5" >
            Sign Up
          </Typography>

          <Typography
            variant="body2"
            align="center">
            Create an account!
          </Typography>
        </Box>
        <CardContent>
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
                  style={{ color: colors.grey[100] }}
                  to="/signin"
                  variant="subtitle2"
                  component={RouterLink}>
                  {" Already have an account?  Sign In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </CardContent>

      </Box>
    </Container>
  );
};

export default Signup;
