import PropTypes from 'prop-types';
import * as Yup from "yup";
import { useFormik } from "formik";
import CustomButton from "../CustomButton";
import { Card, CardContent, Stack } from "@mui/material";
import CustomInput from "../CustomInput";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useMounted } from '../../hooks/use-mounted';
import { categoryApi } from '../../api/categoryApi';
 

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name must be at least 2 letters')
        .required('Name is required'),
    
});


const CategoryForm = (props) => {
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
                response = categoryApi.UpdateCategory(initialData._id, values)
            } else {
                response = categoryApi.AddCategory(values);
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
                        navigate('/dashboard/categories');
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
                            label="Category Name*"
                            placeholder="ex: BLAZERS"
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
CategoryForm.propTypes = {
    initialData: PropTypes.object,
};
export default CategoryForm