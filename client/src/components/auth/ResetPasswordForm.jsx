import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../ui/CustomInput";
import { Unstable_Grid2 as Grid } from "@mui/material";
import CustomButton from "../ui/CustomButton";
import useAuth from '../../hooks/useAuth';
import { useState } from "react";
import { useLocation } from "react-router-dom";

const initialValues = {
    password: '',
    confirmPassword: ''
};

const passwordValidationSchema = Yup.object({
    password: Yup.string()
        .required("Password is required")
        .matches(
            /^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[A-Z])(?=.*[a-z]).{8,}$/,
            "Password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long"
        ),
    confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const ResetPasswordForm = () => {
    const [serverErrors, setServerErrors] = useState({});
    const { resetpassword } = useAuth();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const resetPasswordToken = searchParams?.get('resetPasswordToken')
  
    const onSubmit = async (values, { setStatus, setSubmitting }) => {
        try {
            await resetpassword( resetPasswordToken , values.password , values.confirmPassword);

        } catch (error) {
            console.error(error);
            setServerErrors(error);
            setStatus({ success: false });
            setSubmitting(false);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema:passwordValidationSchema,
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
        <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CustomInput
                        required
                        label="New Password"
                        placeholder="name@example.com"
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
                    <CustomInput
                        required
                        label="Confirm New Password"
                        placeholder="name@example.com"
                        type="password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.confirmPassword && !!(errors.confirmPassword || serverErrors.confirmPassword)}
                        helperText={touched.confirmPassword && (errors.confirmPassword || serverErrors.confirmPassword)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomButton
                        variant="contained"
                        color="secondary"
                        type="submit"
                        disabled={isSubmitting}
                        fullWidth
                        sx={{
                            
                            padding: '15px',
                            borderRadius: '16px',
                            cursor: 'pointer',
                            '&:hover': {
                              transform: 'scale(1.1)',
                            },
                          }}                    >
                        {isSubmitting ? "Loading..." : "Continue"}
                    </CustomButton>
                </Grid>
             
            </Grid>
        </form>
    )
}

export default ResetPasswordForm