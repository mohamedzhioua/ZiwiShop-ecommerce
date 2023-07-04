import PropTypes from 'prop-types';
import * as Yup from "yup";
import { useFormik } from "formik";
import CustomButton from "../CustomButton";
import { Card, CardContent, Stack } from "@mui/material";
import CustomInput from "../CustomInput";
import { sizeApi } from "../../api/sizeApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name must be at least 2 letters')
        .required('Name is required'),
    value: Yup.string()
        .min(1, 'Value must be at least 1 letter')
        .required('Value is required'),
});


const SizeForm = (props) => {
    const { initialData } = props

    const navigate = useNavigate()

    const initialValues = initialData || {
        name: "",
        value: "",
    };
    const onSubmitHandler = async (
        values,
        { setErrors, setStatus, setSubmitting }
    ) => {
        try {
            let response;
            if (initialData) {
                 response = sizeApi.UpdateSize(initialData._id, values)
            } else {
                response = sizeApi.AddSize(values);
            }
            toast.promise(
                response,
                {
                    loading: initialData ? 'data updated' : 'Adding data',
                    error: initialData ? 'Error while updating the data' : 'Error while adding the data',
                    success: initialData ? 'Size Updated' : ' Size Added !'
                },
            );
            response
                .then(() => {
                    setStatus({ success: true });
                    setSubmitting(false);
                    navigate('/dashboard/sizes');
                })
                .catch((error) => {
                    setStatus({ success: false });
                    setErrors({ submit: error.message });
                    setSubmitting(false);
                });
        } catch (err) {
            toast.error('Something went wrong!');
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
        <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                        <CustomInput
                            name="name"
                            label="Size Name*"
                            placeholder="ex: Extra Large"
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
                            placeholder="ex: XL"
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
                        {isSubmitting ? "loading..." : initialData ? "Save changes" : "Create"}
                    </CustomButton>
                </form>
            </CardContent>
        </Card>
    )
}
SizeForm.propTypes = {
    initialData: PropTypes.object,
};
export default SizeForm