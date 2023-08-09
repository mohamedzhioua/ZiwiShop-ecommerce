import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useMounted } from "../../hooks/use-mounted";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import CustomButton from "../ui/CustomButton";
import { FormHelperText, Link, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import { tokens } from "../../theme/theme";
import useTheme from "../../hooks/useTheme";


const initialValues = {
  email: '',
};

const validationSchema = Yup.object({
  email: Yup
    .string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required')
});
const Forgetpassword = () => {
  const { theme } = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMounted = useMounted()
  const navigate = useNavigate()
  const { forgotPassword } = useAuth();

  const onSubmitHandler = async (
    values,
    { setErrors, setStatus, setSubmitting }
  ) => {
    try {
      await forgotPassword(values.email);

      if (isMounted()) {
        // const searchParams = new URLSearchParams({ username: values.email }).toString();
        // const href = paths.auth.amplify.resetPassword + `?${searchParams}`;
        // navigate(href);
      }
    } catch (err) {
      console.error(err);

      if (isMounted()) {
        setStatus({ success: false });
        setErrors({ submit: err.message });
        setSubmitting(false);
      }
    }
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmitHandler
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
    <form
      noValidate
      onSubmit={handleSubmit}
    >
      <Stack spacing={2}>
        <TextField
          required
          error={!!(touched.email && errors.email)}
          fullWidth
          helperText={touched.email && errors.email}
          label="Email Address"
          placeholder="name@example.com"
          name="email"
          onBlur={handleBlur}
          onChange={handleChange}
          type="email"
          value={values.email}
        />
        {errors.submit && (
          <FormHelperText
            error
            sx={{ mt: 3 }}
          >
            {errors.submit}
          </FormHelperText>
        )}
        <CustomButton
          disabled={isSubmitting}
          fullWidth
          size="large"
          type="submit"
          color='secondary'
          variant="contained"
          sx={{ mt: 2 }}
        >
          {isSubmitting ? "loading..." : "Send reset link"}
        </CustomButton>
        <Link
        component={RouterLink}
        style={{
          color: colors.grey[100], textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          }
        }}
        to="/signin"
        variant="h5"
      >
        {"Remember your password?"}
      </Link>
      </Stack>

     
    </form>
  )
}

export default Forgetpassword