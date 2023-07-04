import * as Yup from "yup";
import { useFormik } from "formik";
import CustomButton from "../CustomButton";
import { Card, CardContent } from "@mui/material";
import CustomInput from "../CustomInput";
import { Box, Stack } from "@mui/system";

const initialValues = {
    name: "",
    value: "",
};
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name must be at least 2 letters')
        .required('Name is required'),
    value: Yup.string()
        .min(1, 'Value must be at least 1 letter')
        .required('Value is required'),
});


const SizeForm = () => {

    const onSubmitHandler = async (
        values,
        { setErrors, setStatus, setSubmitting }
    ) => {
        try {

            setStatus({ success: true });
            setSubmitting(false);
            //   navigate('/dashboard/size');
        } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
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
        <Box mt={3} px={2}>
            <Card>
                <CardContent>

                    <form onSubmit={handleSubmit} noValidate>
                        <Stack spacing={3}>

                            <CustomInput
                                name="name"
                                label="Size Name*"
                                type="text"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                            />

                            <CustomInput
                                name="value"
                                label="Size Value*"
                                type="text"
                                value={values.value}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.value && Boolean(errors.value)}
                                helperText={touched.value && errors.value}
                            />
                        </Stack>
                        <CustomButton
                            variant="contained"
                            type="submit"
                            disabled={isSubmitting}
                             size="large"
                            sx={{ mt: 2 }}
                        >
                            {isSubmitting ? "loading..." : "Creat"}
                        </CustomButton>
                    </form>
                </CardContent>
            </Card>
        </Box>
    )
}

export default SizeForm