import PropTypes from 'prop-types';
import { Stack } from "@mui/system";
import {
    Autocomplete,
    Card,
    CardContent,
    Chip,
    Unstable_Grid2 as Grid,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import FileDropzone from "../FileDropzone";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import { ProductvalidationSchema } from './ProductFormValidation';
import { toast } from 'react-hot-toast';
import { useMounted } from '../../hooks/use-mounted';
import { productApi } from '../../api/productApi';


const initialValues = {
    category: "",
    description: "",
    images: [],
    name: "",
    price: 0,
    sizes: [],
    brand: "",
    quantity: 0,
    isFeatured: false,
    isArchived: false,
};



const ProductForm = (props) => {
    const { options } = props
    const navigate = useNavigate();
    const isMounted = useMounted()
    const [files, setFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleDrop = (newFiles) => {
        if (files.length + newFiles.length > 5) {
            setErrorMessage('Maximum number of images exceeded. Please select up to 5 images.');
            return;
        }
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        formik.setFieldValue('images', [
            ...formik.values.images,
            ...newFiles,
        ]);

    };



    const handleRemove = (file) => {
        setFiles((prevFiles) =>
            prevFiles.filter((_file) => _file.path !== file.path)
        );
    };

    const handleRemoveAll = () => {
        setFiles([]);
    };

    const onSubmitHandler = async (
        values,
        { setErrors, setStatus, setSubmitting }
    ) => {
 
        try {
            let response;
            const formData = new FormData();
            formData.append('category', values.category);
            formData.append('description', values.description);
            values.images.forEach((image) => {
                formData.append("images", image);
            });
            formData.append('name', values.name);
            formData.append('price', values.price);
            values.sizes.forEach((size) => {
                formData.append("sizes", size);
            });
            formData.append('brand', values.brand);
            formData.append('quantity', values.quantity);
            formData.append('isFeatured', values.isFeatured);
            formData.append('isArchived', values.isArchived);
            formData.forEach((value, key) => {
                console.log(key + " " + value)
            });
            response = productApi.AddProduct(formData);
            toast.promise(
                response,
                {
                    loading: 'Adding data',
                    error: 'Error while adding the data',
                    success: ' Product Added !'
                },
            );
            response
                .then(() => {
                    if (isMounted()) {
                        setStatus({ success: true });
                        setSubmitting(false);
                        // navigate('/dashboard/sizes');
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
        validationSchema: ProductvalidationSchema,
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
        <>
            <form onSubmit={handleSubmit} noValidate>
                <Stack spacing={4}>
                    <Card>
                        <CardContent >
                            <Grid container
                                spacing={4}>
                                <Grid xs={12}
                                    md={4} mb={2}
                                >
                                    <Typography variant="h5" fontWeight="bold">
                                        Upload Images
                                    </Typography>
                                </Grid>
                                <Grid xs={12}
                                    md={8}>
                                    <FileDropzone
                                        caption="(SVG, JPG, PNG, or gif )"
                                        accept={{ 'image/*': ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'] }}
                                        files={files}
                                        onDrop={handleDrop}
                                        onRemove={handleRemove}
                                        onRemoveAll={handleRemoveAll}
                                        error={touched.images && errors.images ? errors.images : errorMessage}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent >
                            <Grid
                                container
                                spacing={3}>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <CustomInput
                                        required
                                        name="name"
                                        label="Product Name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.name && Boolean(errors.name)}
                                        helperText={touched.name && errors.name}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={3}
                                >
                                    <CustomInput
                                        required
                                        name="quantity"
                                        label="quantity"
                                        type="number"
                                        value={values.quantity}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.quantity && Boolean(errors.quantity)}
                                        helperText={touched.quantity && errors.quantity}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={3}
                                >
                                    <CustomInput
                                        required
                                        name="price"
                                        label="Price"
                                        type="number"
                                        value={values.price}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.price && Boolean(errors.price)}
                                        helperText={touched.price && errors.price}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <Autocomplete
                                        options={options.brands?.map((item) => ({ name: item.name, id: item._id }))}
                                        // value={values.brand}
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('brand', newValue ? newValue.id : '');
                                        }}
                                        isOptionEqualToValue={(option, value) => option.value === value.value}
                                        onBlur={handleBlur}
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                required
                                                name="brand"
                                                label="Brand Name"
                                                placeholder='Dior'
                                                error={touched.brand && Boolean(errors.brand)}
                                                helperText={touched.brand && errors.brand}
                                            />
                                        )}
                                    />

                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    {/*                                  
                                    <Autocomplete
                                        options={options.categories.flatMap((category) => [
                                            { category: category.name, childCategories: '' },
                                            ...category.childCategories.map((childCategory) => ({
                                                category: category.name,
                                                childCategories: childCategory.name
                                            }))
                                        ])}
                                        groupBy={(option) => option.category}
                                        getOptionLabel={(option) => option.childCategories}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                required
                                                name="category"
                                                label="Category"
                                                error={touched.category && Boolean(errors.category)}
                                                helperText={touched.category && errors.category}
                                            />
                                        )}
                                    /> */}
                                    <Autocomplete
                                        options={options.categories.flatMap((category) => [
                                            { category: category.name, childCategories: '' },
                                            ...category.childCategories.map((childCategory) => ({
                                                category: category.name,
                                                childCategories: { name: childCategory.name, id: childCategory._id },
                                            })),
                                        ])}
                                        groupBy={(option) => option.category}
                                        getOptionLabel={(option) => option.childCategories.name}
                                        sx={{ width: 300 }}
                                        onChange={(event, value) => {
                                            formik.setFieldValue('category', value.childCategories.id);
                                        }}
                                        isOptionEqualToValue={(option, value) => option.childCategories.id === value.childCategories.id}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                required
                                                name="category"
                                                label="Category"
                                                error={formik.touched.category && Boolean(formik.errors.category)}
                                                helperText={formik.touched.category && formik.errors.category}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <Autocomplete
                                        multiple
                                        options={options.sizes.map((item) => ({ name: item.name, id: item._id }))}
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('sizes', newValue.map((size) => size.id));
                                        }}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        onBlur={handleBlur}
                                        getOptionLabel={(option) => option.name}
                                        renderTags={(value, getTagProps) =>
                                            value.map((option, index) => (
                                                <Chip
                                                    key={index}
                                                    variant="outlined"
                                                    label={option.name}
                                                    onDelete={() => {
                                                        const newSizes = values.sizes.filter((size) => size !== option.id);
                                                        formik.setFieldValue('sizes', newSizes);
                                                    }}
                                                    {...getTagProps({ index })}
                                                />
                                            ))
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                required
                                                name="sizes"
                                                label="Size"
                                                error={touched.sizes && Boolean(errors.sizes)}
                                                helperText={touched.sizes && errors.sizes}
                                            />
                                        )}
                                    />


                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <CustomInput
                                        required
                                        name="description"
                                        label="Product Description"
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.description && Boolean(errors.description)}
                                        helperText={touched.description && errors.description}
                                        multiline={true}
                                        rows={4}
                                    />
                                </Grid>
                            </Grid>


                            <Stack
                                spacing={3}
                                sx={{ mt: 3 }}
                            >
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    justifyContent="space-between"
                                    spacing={3}
                                >
                                    <Stack spacing={1}>
                                        <Typography
                                            gutterBottom
                                            variant="subtitle1"
                                        >
                                            Archived
                                        </Typography>
                                        <Typography
                                            color="text.secondary"
                                            variant="body2"
                                        >
                                            This product will not appear anywhere in the store.

                                        </Typography>
                                    </Stack>
                                    <Switch
                                        checked={formik.values.isArchived}
                                        color="primary"
                                        edge="start"
                                        name="isArchived"
                                        onChange={formik.handleChange}
                                        value={formik.values.isArchived}
                                    />
                                </Stack>
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    justifyContent="space-between"
                                    spacing={3}
                                >
                                    <Stack spacing={1}>
                                        <Typography
                                            gutterBottom
                                            variant="subtitle1"
                                        >
                                            Featured
                                        </Typography>
                                        <Typography
                                            color="text.secondary"
                                            variant="body2"
                                        >
                                            This product will appear on the home page
                                        </Typography>
                                    </Stack>
                                    <Switch
                                        checked={formik.values.isFeatured}
                                        color="primary"
                                        edge="start"
                                        name="isFeatured"
                                        onChange={formik.handleChange}
                                        value={formik.values.isFeatured}
                                    />
                                </Stack>
                            </Stack>
                        </CardContent>
                        <Stack sx={{ p: 3 }} >
                            <CustomButton
                                variant="contained"
                                type="submit"
                                disabled={isSubmitting}
                                size="large"
                            >
                                {isSubmitting ? "loading..." : "Create"}
                            </CustomButton>
                        </Stack>
                    </Card>
                </Stack >
            </form >
        </>
    );
};
ProductForm.propTypes = {
    options: PropTypes.object.isRequired
};
export default ProductForm;
