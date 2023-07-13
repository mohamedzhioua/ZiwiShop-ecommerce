import PropTypes from 'prop-types';
import { useFormik } from "formik";
import CustomButton from "../CustomButton";
import {
    Autocomplete, Card, CardContent, TextField, Unstable_Grid2 as Grid, Switch, Typography,
} from "@mui/material";
import CustomInput from "../CustomInput";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useMounted } from '../../hooks/use-mounted';
import { categoryApi } from '../../api/categoryApi';
import useCategory from '../../hooks/useCategory';
import { CategoryFormValidation } from './CategoryFormValidation';
import { useEffect, useState } from 'react';
import { Stack } from '@mui/system';



const CategoryForm = (props) => {
    const { initialData, categoryParents } = props;
    const isMounted = useMounted()
    const navigate = useNavigate()
    const { saveCategories } = useCategory()
    const [selectedCategory, setSelectedCategory] = useState(null);



    const initialValues = initialData || {
        name: "",
        parentCategory: null,
        isLeaf: false,
    };
    const initialCategoryId = initialData ? initialData.parentCategory : null;
    
     useEffect(() => {
        if (initialCategoryId) {
            const category = categoryParents?.find((item) => item.name === initialCategoryId);
             setSelectedCategory(category);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialCategoryId]);

    const onSubmitHandler = async (
        values,
        { setErrors, setStatus, setSubmitting }
    ) => {
         try {
            let response;
            if (initialData) {
                response = categoryApi.UpdateCategory(initialData._id, values);
            } else {
                response = categoryApi.AddCategory(values);
            }

            toast.promise(response, {
                loading: initialData ? 'Updating data' : 'Adding data',
                error: initialData ? 'Error while updating data' : 'Error while adding data',
                success: initialData ? 'Data updated' : 'Data added',
            });
            response
                .then(() => {
                    if (isMounted()) {
                        setStatus({ success: true });
                        saveCategories((categories) => {
                            if (initialData) {
                                return categories.map((category) =>
                                    category._id === initialData._id ? { ...response } : category
                                );
                            } else {
                                return [...categories, response];
                            }
                        });

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
        validationSchema: CategoryFormValidation,
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
        <form onSubmit={handleSubmit} noValidate>
            <Card>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid xs={12} md={6}>
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
                        </Grid>
                        <Grid xs={12} md={6}>
                            <Autocomplete
                                options={categoryParents?.map((item) => ({ name: item.name, id: item._id }))}
                                value={selectedCategory}
                                onChange={(event, newValue) => {
                                    setSelectedCategory(newValue);
                                    formik.setFieldValue('parentCategory', newValue ? newValue.id : '');
                                }}
                                isOptionEqualToValue={(option, value) => option.value === value.value}
                                onBlur={handleBlur}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        name="parentCategory"
                                        label="Parent Category"
                                        placeholder="Select parent category"
                                        error={touched.parentCategory && Boolean(errors.parentCategory)}
                                        helperText={touched.parentCategory && errors.parentCategory}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Stack spacing={3} sx={{ mt: 3 }}>
                        <Stack alignItems="center" direction="row" justifyContent="space-between" spacing={3}>
                            <Stack spacing={1}>
                                <Typography gutterBottom variant="subtitle1">
                                    Is this a leaf category?
                                </Typography>
                                <Typography color="text.secondary" variant="body2">
                                    Toggle this switch if the category does not have any subcategories.
                                </Typography>
                            </Stack>
                            <Switch
                                checked={values.isLeaf}
                                color="primary"
                                edge="start"
                                name="isLeaf"
                                onChange={handleChange}
                                value={values.isLeaf}
                            />
                        </Stack>
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
                </CardContent>
            </Card>
        </form>
    )
}
CategoryForm.propTypes = {
    initialData: PropTypes.object,
    categoryParents: PropTypes.array.isRequired,
};
export default CategoryForm