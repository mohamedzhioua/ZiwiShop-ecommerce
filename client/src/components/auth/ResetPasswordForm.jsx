import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../ui/CustomInput";
import { Link, Unstable_Grid2 as Grid } from "@mui/material";
import CustomButton from "../ui/CustomButton";
import useAuth from '../../hooks/useAuth';
import { useState } from "react";

const initialValues = {
    password: '',
    cPassword: ''
};

const passwordValidationSchema = Yup.object({
    password: Yup.string()
        .required("Password is required")
        .matches(
            /^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[A-Z])(?=.*[a-z]).{8,}$/,
            "Password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long"
        ),
    cPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const ResetPasswordForm = () => {
    const [serverErrors, setServerErrors] = useState({});
    const { login } = useAuth();



    const onSubmit = async (values, { setStatus, setSubmitting }) => {
        try {
            await register({ email: values.email, cPassword: values.name, password: values.password });

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
                        name="cPassword"
                        value={values.cPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.cPassword && !!(errors.cPassword || serverErrors.cPassword)}
                        helperText={touched.cPassword && (errors.cPassword || serverErrors.cPassword)}
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
                            '@media (min-width: 600px)': {
                              width: '50%',
                            },
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