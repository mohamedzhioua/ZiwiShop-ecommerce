import PropTypes from 'prop-types';
import {
    Autocomplete,
    Card,
    CardContent,
    Chip,
    Unstable_Grid2 as Grid,
    Switch,
    TextField,
    Typography,Stack
} from "@mui/material";
import FileDropzone from "../../FileDropzone";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import CustomButton from "../../ui/CustomButton";
import CustomInput from "../../ui/CustomInput";
import { ProductvalidationSchema } from './ProductFormValidation';
import { toast } from 'react-hot-toast';
import { useMounted } from '../../../hooks/use-mounted';
import { productApi } from '../../../api/productApi';
import { flattenCategories } from "../../../utils/flattenCategories"



const ProductForm = (props) => {
    const { initialData, options } = props
    const navigate = useNavigate();
    const isMounted = useMounted()
    const [files, setFiles] = useState([]);
    const [updatefiles, setUpdateFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSizes, setSelectedSizes] = useState([]);


    const initialValues = initialData
        ? {
            ...initialData,
            images: [],
        }
        : {
            category: "",
            description: "",
            images: [],
            name: "",
            price: 0,
            sizes: [],
            brand: "",
            countInStock: 0,
            isFeatured: false,
            isArchived: false,
        };

    const initialBrandId = initialData ? initialData.brand : null;
    const initialCategoryId = initialData ? initialData.category : null;
    const initialSizesId = initialData ? initialData.sizes : null;

    useEffect(() => {
        if (initialBrandId) {
            const brand = options.brands?.find((item) => item._id === initialBrandId);
            setSelectedBrand(brand);
        }
        if (initialCategoryId) {
            const category = flattenCategories(options?.categories).find(option => option.childCategories.id === initialCategoryId)
            setSelectedCategory(category);
        }
        if (initialSizesId) {
            const sizes = options.sizes.filter(size => initialSizesId.includes(size._id));
            setSelectedSizes(sizes);
        }
        if (initialData?.images) {
            setUpdateFiles(initialData.images)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialBrandId, initialCategoryId, initialSizesId]);

    const handleDrop = (newFiles) => {
        const totalFiles = [...files, ...newFiles, ...updatefiles];
        const remainingSlots = 5 - totalFiles.length;
        if (remainingSlots < 0) {
            setErrorMessage('Maximum number of images exceeded. Please select up to 5 images.');
            newFiles.splice(remainingSlots);
        }
        else {
            setFiles((prevFiles) => [...prevFiles, ...newFiles]);
            formik.setFieldValue('images', [
                ...formik.values.images,
                ...newFiles,
            ]);
        }
    };


    const handleRemove = (file) => {
        setFiles((prevFiles) =>
            prevFiles.filter((_file) => _file.path !== file.path)
        );
        setUpdateFiles((prevFiles) =>
            prevFiles.filter((_file) => _file.url !== file.url)
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
            formData.append('countInStock', values.countInStock);
            formData.append('isFeatured', values.isFeatured);
            formData.append('isArchived', values.isArchived);
            formData.forEach((value, key) => {
                console.log(key + " " + value)
            });
            if (initialData) {
                response = productApi.UpdateProduct(initialData._id, formData)
            } else {
                response = productApi.AddProduct(formData);
            }
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
                        navigate('/dashboard/products');
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
                                        caption="(SVG, JPG, PNG, or gif)"
                                        accept={{ "image/*": [] }}
                                        files={files}
                                        updatefiles={updatefiles}
                                        onDrop={handleDrop}
                                        onRemove={handleRemove}
                                        onRemoveAll={handleRemoveAll}
                                        error={touched.images && errors.images ? errors.images : errorMessage}
                                        id={initialData?._id}
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
                                        name="countInStock"
                                        label="Stock"
                                        type="number"
                                        value={values.countInStock}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.countInStock && Boolean(errors.countInStock)}
                                        helperText={touched.countInStock && errors.countInStock}
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
                                        value={selectedBrand}
                                        onChange={(event, newValue) => {
                                            setSelectedBrand(newValue);
                                            formik.setFieldValue('brand', newValue ? newValue.id : '');
                                        }}
                                        isOptionEqualToValue={useCallback((option, value) => option?.id === value?._id, [])}
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
                                <Grid xs={12} md={6}>

                                    <Autocomplete
                                        options={flattenCategories(options.categories)}
                                        groupBy={(option) => option.category}
                                        value={selectedCategory}
                                        getOptionLabel={(option) => option.childCategories ? option.childCategories.name : ''}
                                        onChange={(event, newValue) => {
                                            setSelectedCategory(newValue);
                                            formik.setFieldValue('category', newValue ? newValue?.childCategories?.id : '');
                                        }}
                                        isOptionEqualToValue={useCallback((option, value) => option?.childCategories && option?.childCategories?.id === value?.childCategories?.id, [])}
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
                                        options={options.sizes.map((item) => ({ _id: item._id, name: item.name }))}
                                        value={selectedSizes}
                                        onChange={(event, newValue) => {
                                            const selectedSizes = newValue ? newValue.map(size => size._id) : [];
                                            setSelectedSizes(newValue)
                                            formik.setFieldValue('sizes', selectedSizes);
                                        }}
                                        isOptionEqualToValue={useCallback((option, value) => {
                                            return option?._id === value?._id;
                                        }, [])}
                                        onBlur={handleBlur}
                                        getOptionLabel={(option) => option.name}
                                        renderTags={(value, getTagProps) =>
                                            value
                                                .map((option, index) => (
                                                    <Chip
                                                        key={index}
                                                        variant="outlined"
                                                        label={option.name}
                                                        onDelete={() => {
                                                            const newSizes = values.sizes.filter((size) => size !== option._id);
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
                                    <TextField
                                        fullWidth
                                        required
                                        name="description"
                                        label="Product Description"
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.description && Boolean(errors.description)}
                                        helperText={touched.description && errors.description}
                                        multiline={true}
                                        maxRows={4}
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
                                {isSubmitting ? "loading..." : initialData ? "Save changes" : "Create"}
                            </CustomButton>
                        </Stack>
                    </Card>
                </Stack >
            </form >
        </>
    );
};
ProductForm.propTypes = {
    initialData: PropTypes.object,
    options: PropTypes.object.isRequired,
};

export default ProductForm;
