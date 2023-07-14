import PropTypes from 'prop-types';
import { useFormik } from "formik";
import CustomButton from "../ui/CustomButton";
import { Card, CardContent, Stack } from "@mui/material";
import CustomInput from "../ui/CustomInput";
import { sizeApi } from "../../api/sizeApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useMounted } from '../../hooks/use-mounted';
 


const SizeForm = (props) => {
    const { initialData } = props
    const isMounted = useMounted()
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
                    if (isMounted()) {
                        setStatus({ success: true });
                        setSubmitting(false);
                        navigate('/dashboard/sizes');
                    }
                })
                .catch((error) => {
                    if (isMounted()) {
                        setStatus({ success: false });
                        setErrors(error);
                        setSubmitting(false);
                    }
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