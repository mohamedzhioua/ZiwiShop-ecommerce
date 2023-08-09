import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../ui/CustomInput";
import { Link,  Unstable_Grid2 as Grid} from "@mui/material";
import CustomButton from "../ui/CustomButton";
import useAuth from '../../hooks/useAuth';
import { tokens } from "../../theme/theme";
import useTheme from "../../hooks/useTheme";
import SocialAuth from "../SocialAuth";
import { toast } from "react-hot-toast";


const SigninForm = () => {
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
        toast.error(error);
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
    <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomInput
                required
                label="Email"
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
                required
                label="Password"
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
  )
}

export default SigninForm