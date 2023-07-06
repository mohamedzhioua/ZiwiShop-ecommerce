import { Stack } from "@mui/system";
import {
    Card,
    CardContent,
   Unstable_Grid2 as Grid,
    MenuItem,
    Select,
    Switch,
    Typography,
} from "@mui/material";
import FileDropzone from "../FileDropzone";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import CustomButton from "../CustomButton";
import { fileToBase64 } from "../../utils/file-to-base64";
import CustomInput from "../CustomInput";

const categoryOptions = [
    {
        value: 'bloomers',
        label: 'Bloomers'
    },
    {
        value: 'blouse',
        label: 'Blouse'
    },
    {
        value: 'bodysuit',
        label: 'Bodysuit'
    },
    {
        value: 'bra',
        label: 'Bra'
    },
    {
        value: 'bustier',
        label: 'Bustier'
    },
    {
        value: 'caftan',
        label: 'Caftan'
    },
    {
        value: 'cardigan',
        label: 'Cardigan'
    },
    {
        value: 'cloak',
        label: 'Cloak'
    },
    {
        value: 'coat',
        label: 'Coat'
    },
    {
        value: 'corset',
        label: 'Corset'
    },
    {
        value: 'dress',
        label: 'Dress'
    },
    {
        value: 'dungarees',
        label: 'Dungarees'
    },
    {
        value: 'jacket',
        label: 'Jacket'
    },
    {
        value: 'jeans',
        label: 'Jeans'
    },
    {
        value: 'jumper',
        label: 'Jumper'
    },
    {
        value: 'jumpsuit',
        label: 'Jumpsuit'
    },
    {
        value: 'kilt',
        label: 'Kilt'
    },
    {
        value: 'kimono',
        label: 'Kimono'
    },
    {
        value: 'knickerbockers',
        label: 'Knickerbockers'
    },
    {
        value: 'leggings',
        label: 'Leggings'
    },
    {
        value: 'legwarmers',
        label: 'Legwarmers'
    },
    {
        value: 'leotard',
        label: 'Leotard'
    },
    {
        value: 'panties',
        label: 'Panties'
    },
    {
        value: 'pants',
        label: 'Pants / Trousers'
    },
    {
        value: 'petticoat',
        label: 'Petticoat'
    },
    {
        value: 'playsuit',
        label: 'Playsuit'
    },
    {
        value: 'poncho',
        label: 'Poncho'
    },
    {
        value: 'pajamas',
        label: 'Pajamas'
    },
    {
        value: 'sarong',
        label: 'Sarong'
    },
    {
        value: 'shawl',
        label: 'Shawl'
    },
    {
        value: 'shirt',
        label: 'Shirt'
    },
    {
        value: 'shorts',
        label: 'Shorts'
    },
    {
        value: 'skirt',
        label: 'Skirt'
    },
    {
        value: 'skort',
        label: 'Skort'
    },
    {
        value: 'sock',
        label: 'Sock'
    },
    {
        value: 'sweater',
        label: 'Sweater'
    },
    {
        value: 'swimsuit',
        label: 'Swimsuit'
    },
    {
        value: 'teddy',
        label: 'Teddy'
    },
    {
        value: 'tie',
        label: 'Tie'
    },
    {
        value: 'tights',
        label: 'Tights'
    },
    {
        value: 'tops',
        label: 'Tops'
    },
    {
        value: 'tracksuit',
        label: 'Tracksuit'
    },
    {
        value: 't-shirt',
        label: 'T-Shirt'
    },
    {
        value: 'waistcoat',
        label: 'Waistcoat'
    }
];

const initialValues = {
    category: "",
    description: "",
    images: [],
    name: "",
    price: 0,
    colorId: "",
    sizeId: "",
    isFeatured: false,
    isArchived: false,
};

const validationSchema = Yup.object().shape({
    category: Yup.string().max(255),
    description: Yup.string().max(1000),
    images: Yup.array(),
    name: Yup.string().max(255).required(),
    price: Yup.number().min(1).required(),
    colorId: Yup.string().min(1),
    sizeId: Yup.string().min(1),
    isFeatured: Yup.boolean().default(false).optional(),
    isArchived: Yup.boolean().default(false).optional(),
});

const ProductForm = () => {
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleDrop = (newFiles) => {
        if (files.length + newFiles.length > 5) {
            setErrorMessage('Maximum number of images exceeded. Please select up to 5 images.');
            return;
        }
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);

        const base64Promises = newFiles.map((file) => fileToBase64(file));
        Promise.all(base64Promises)
            .then((base64Results) => {
                formik.setFieldValue('images', [
                    ...formik.values.images,
                    ...base64Results,
                ]);
            })
            .catch((error) => {
                console.error(error);
            });
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
            const formData = new FormData();
            formData.append('category', values.category);
            formData.append('description', values.description);
            values.images.forEach((base64, index) => {
                formData.append(`images[${index}]`, base64);
            });
            formData.append('name', values.name);
            formData.append('price', values.price);
            formData.append('colorId', values.colorId);
            formData.append('sizeId', values.sizeId);
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
        <>
            <form onSubmit={handleSubmit} noValidate>
                <Stack spacing={4}>
                    <Card>
                        <CardContent>
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
                                        error={errorMessage}
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
                                <Grid
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
                                        {categoryOptions.map((category) => (
                                            <option
                                                key={category.value}
                                                value={category.value}
                                            >
                                                {category.label}
                                            </option>
                                        ))}
                                    </CustomInput>
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <Select
                                        fullWidth
                                        name="colorId"
                                        label="Color"
                                        value={values.colorId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.colorId && Boolean(errors.colorId)}
                                        helperText={touched.colorId && errors.colorId}
                                    >
                                        <MenuItem value="">Select a color</MenuItem>
                                        {/* Render color options here */}
                                    </Select>
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <Select
                                        fullWidth
                                        name="sizeId"
                                        label="Size"
                                        value={values.sizeId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.sizeId && Boolean(errors.sizeId)}
                                        helperText={touched.sizeId && errors.sizeId}
                                    >
                                        <MenuItem value="">Select a size</MenuItem>
                                        {/* Render size options here */}
                                    </Select>
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
                        <CustomButton
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                        >
                            Submit
                        </CustomButton>
                    </Card>
                </Stack >
            </form >
        </>
    );
};

export default ProductForm;
