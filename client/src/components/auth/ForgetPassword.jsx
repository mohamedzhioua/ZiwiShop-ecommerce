import * as Yup from 'yup';
import { useFormik } from 'formik';
import CustomButton from "../ui/CustomButton";
import { FormHelperText, Link } from "@mui/material";
import { Stack } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import { tokens } from "../../theme/theme";
import useTheme from "../../hooks/useTheme";
import CustomInput from "../ui/CustomInput";
import { authApi } from "../../api/authApi";
import PropTypes from 'prop-types';


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
const Forgetpassword = (props) => {
  const {onSuccess} = props 
  const { theme } = useTheme();
  const colors = tokens(theme.palette.mode);
 
  const onSubmitHandler = async (
    values,
    { setErrors, setStatus, setSubmitting }
  ) => {
    try {
      const res = await authApi.forgotPassword({email:values.email});
      if (res.success === true) {
        onSuccess(res.message)
      }
    } catch (err) {
      console.error(err);
      setStatus({ success: false });
      setErrors({ submit: err.message });
      setSubmitting(false);

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
    <>
        <form
          noValidate
          onSubmit={handleSubmit}
        >
          <Stack spacing={2} alignItems='center'>
            <CustomInput
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
              sx={{
                mt: 2,
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
      

    </>
  )
}
Forgetpassword.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};
export default Forgetpassword