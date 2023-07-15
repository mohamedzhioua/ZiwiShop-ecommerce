import PropTypes from 'prop-types';
import { useFormik } from "formik";
import CustomButton from '../../ui/CustomButton';
import { Card, CardContent, Stack } from "@mui/material";
import CustomInput from "../../ui/CustomInput";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useMounted } from '../../../hooks/use-mounted';
import { brandApi } from '../../../api/brandApi';
import { BrandValidationSchema } from './BrandFormValidation';





const BrandForm = (props) => {
    const { initialData } = props
    const isMounted = useMounted()
    const navigate = useNavigate()

    const initialValues = initialData || {
        name: "",
    };
    const onSubmitHandler = async (
        values,
        { setErrors, setStatus, setSubmitting }
    ) => {
        try {
            let response;
            if (initialData) {
                response = brandApi.UpdateBrand(initialData._id, values)
            } else {
                response = brandApi.AddBrand(values);
            }
            toast.promise(
                response,
                {
                    loading: initialData ? 'data updated' : 'Adding data',
                    error: initialData ? 'Error while updating the data' : 'Error while adding the data',
                    success: initialData ? 'Brand Updated' : ' Brand Added !'
                },
            );
            response
                .then(() => {
                    if (isMounted()) {
                        setStatus({ success: true });
                        setSubmitting(false);
                        navigate('/dashboard/brands');
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
        validationSchema: BrandValidationSchema,
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
                            required
                            name="name"
                            label="Brand Name"
                            placeholder="ex: Nike"
                            type="text"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
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
BrandForm.propTypes = {
    initialData: PropTypes.object,
};
export default BrandForm