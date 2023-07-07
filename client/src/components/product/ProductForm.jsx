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



const initialValues = {
    category: "",
    description: "",
    images: [],
    name: "",
    price: 0,
    colorId: "",
    size: [],
    isFeatured: false,
    isArchived: false,
};



const ProductForm = (props) => {
    const { options } = props
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [sizes, setSizes] = useState([]);

    const handleSizeChange = (event, newSizes) => {
        setSizes(newSizes);
        formik.setFieldValue('size', newSizes);
    };

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
        console.log("🚀 ~ file: ProductForm.jsx:91 ~ ProductForm ~ values:", values)
        try {
            const formData = new FormData();
            formData.append('category', values.category);
            formData.append('description', values.description);
            values.images.forEach((base64, index) => {
                formData.append(`images[${index}]`, base64);
            });
            formData.append('name', values.name);
            formData.append('price', values.price);
            formData.append('colorId', values.colorId);
            formData.append('size', values.size);
            formData.append('isFeatured', values.isFeatured);
            formData.append('isArchived', values.isArchived);

            // Make your API request here using the formData

            setStatus({ success: true });
            setSubmitting(false);
            //   navigate('/dashboard/products');
        } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
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
                                        multiline
                                        rows={4}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
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
                                {/* <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <CustomInput
                                        required
                                        name="category"
                                        label="Category"
                                        value={values.category}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.category && Boolean(errors.category)}
                                        helperText={touched.category && errors.category}
                                        select
                                        SelectProps={{ native: true }}
                                        variant="outlined"
                                    >
                                        <option value="">Select a category</option>
                                        {options?.categories.map((category) => (
                                            <option
                                                key={category.value}
                                                value={category.value}
                                            >
                                                {category.label}
                                            </option>
                                        ))}
                                    </CustomInput>
                                </Grid> */}
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <Autocomplete
                                        options={options.categories}
                                        value={values.category}
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('category', newValue);
                                        }}
                                        onBlur={handleBlur}
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
                                    />

                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <Autocomplete
                                        multiple
                                        options={options.sizes}
                                        value={sizes}
                                        onChange={handleSizeChange}
                                        renderTags={(value, getTagProps) =>
                                            value.map((option, index) => (
                                                <Chip
                                                    key={index}
                                                    variant="outlined"
                                                    label={option}
                                                    onDelete={() => {
                                                        const newSizes = [...sizes];
                                                        newSizes.splice(index, 1);
                                                        setSizes(newSizes);
                                                    }}
                                                    {...getTagProps({ index })}
                                                />
                                            ))
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                required
                                                name="size"
                                                label="Size"
                                                error={touched.size && Boolean(errors.size)}
                                                helperText={touched.size && errors.size}
                                            />
                                        )}
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
                                            Archived                                        </Typography>
                                        <Typography
                                            color="text.secondary"
                                            variant="body2"
                                        >
                                            This product will not appear anywhere in the store.

                                        </Typography>
                                    </Stack>
                                    <Switch
                                        checked={formik.values.isVerified}
                                        color="primary"
                                        edge="start"
                                        name="isVerified"
                                        onChange={formik.handleChange}
                                        value={formik.values.isVerified}
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
                                        checked={formik.values.hasDiscount}
                                        color="primary"
                                        edge="start"
                                        name="hasDiscount"
                                        onChange={formik.handleChange}
                                        value={formik.values.hasDiscount}
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
