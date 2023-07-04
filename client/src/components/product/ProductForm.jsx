import { Box, Stack } from "@mui/system";
import Heading from "../Heading";
import {
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import FileDropzone from "../FileDropzone";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import CustomButton from "../CustomButton";
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

    const handleDrop = (newFiles) => {
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        formik.setFieldValue('images', [...formik.values.images, ...newFiles]);
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
        console.log("🚀 ~ file: ProductForm.jsx:248 ~ ProductForm ~ values:", values)
        try {
            const formData = new FormData();
            formData.append('category', values.category);
            formData.append('description', values.description);
            values.images.forEach((file, index) => {
                formData.append(`images[${index}]`, file);
            });
            formData.append('name', values.name);
            formData.append('price', values.price);
            formData.append('colorId', values.colorId);
            formData.append('sizeId', values.sizeId);
            formData.append('isFeatured', values.isFeatured);
            formData.append('isArchived', values.isArchived);

            // Make your API request here using the formData
            console.log("🚀 ~ file: ProductForm.jsx:250 ~ ProductForm ~ formData:", formData)

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
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginLeft: "1rem",
                    marginRight: "1rem",
                    marginTop: "5rem",
                }}
            >
                <Heading title="Create product" description="Add a new product" />
            </Box>
            <Divider
                sx={{
                    marginY: 2,
                    marginLeft: "1rem",
                    marginRight: "1rem",
                }}
            />
            <Box sx={{ mt: 3, px: 2 }}>

                <Card>
                    <CardContent  >
                        <form onSubmit={handleSubmit}     noValidate>
                         
                            <Stack spacing={3}>
                            <Card  >
                                <CardHeader title="Upload Images" />
                                <CardContent>
                                    <FileDropzone
                                        accept={['image/*']}
                                        files={files}
                                        onDrop={handleDrop}
                                        onRemove={handleRemove}
                                        onRemoveAll={handleRemoveAll}
                                    />
                                </CardContent>
                            </Card>
                            <TextField
                                name="name"
                                label="Product Name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                            />

                            <TextField
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
                            <TextField
                                name="price"
                                label="Price"
                                type="number"
                                value={values.price}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.price && Boolean(errors.price)}
                                helperText={touched.price && errors.price}
                            />

                            <TextField
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
                            </TextField>
                            <Select
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
                            <Select
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
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="isFeatured"
                                        checked={values.isFeatured}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                }
                                label={
                                    <div>
                                        Archived
                                        <Typography variant="body2" color="textSecondary">
                                            This product will appear on the store home page
                                        </Typography>
                                    </div>
                                }
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="isArchived"
                                        checked={values.isArchived}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                }
                                label={
                                    <div>
                                        Archived
                                        <Typography variant="body2" color="textSecondary">
                                            This product will not appear anywhere in the store.
                                        </Typography>
                                    </div>
                                }
                            />
                        </Stack>

                        <CustomButton
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                            sx={{ mt: 2 }}
                        >
                            Submit
                        </CustomButton>
                    </form>
                </CardContent>
            </Card>
        </Box >
        </>
    );
};

export default ProductForm;
