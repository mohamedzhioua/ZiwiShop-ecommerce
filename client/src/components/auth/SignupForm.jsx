import { useFormik } from "formik";
import * as Yup from "yup";
import { Link as RouterLink } from "react-router-dom";
import { Link, Unstable_Grid2 as Grid } from "@mui/material";
import { useState } from "react";
import CustomInput from "../../components/ui/CustomInput";
import CustomButton from "../../components/ui/CustomButton";
import { tokens } from "../../theme/theme";
import useTheme from "../../hooks/useTheme";
import SocialAuth from "../../components/SocialAuth";
import useAuth from "../../hooks/useAuth";



const SignupForm = () => {
    const { register } = useAuth();
    const { theme } = useTheme();
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
        password: Yup.string()
            .required("Password is required")
            .matches(
                /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/,
                "Password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long"
            ),
    });


    const onSubmit = async (values, { setStatus, setSubmitting }) => {
        try {
            await register({ email: values.email, name: values.name, password: values.password });

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
                <Grid item xs={12} >
                    <SocialAuth />
                </Grid>
                <Grid container style={{ marginTop: '10px', display: 'grid', placeItems: 'center' }}>
                    <Link
                        style={{
                            color: colors.grey[100],
                            textDecoration: "none",
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                        to="/signin"
                        variant="h5"
                        component={RouterLink}>
                        {" Already have an account?  Sign In"}
                    </Link>
                </Grid>
            </Grid>
        </form>
    )
}

export default SignupForm