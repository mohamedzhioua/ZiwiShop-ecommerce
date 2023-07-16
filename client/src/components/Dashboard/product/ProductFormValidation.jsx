import * as Yup from "yup";

export const ProductvalidationSchema = Yup.object().shape({
    category: Yup.string().required('category is required'),
    description: Yup.string().max(1000),

    name: Yup.string()
        .min(2, 'Name must contain more than 2 characters')
        .required('Name is required'),
    price: Yup.number()
        .min(1, 'Price must be greater than 0')
        .required('Price is required'),
    countInStock: Yup.number()
        .min(1, 'Stock must be greater than 0')
        .required('Stock is required'),
    sizes: Yup.array()
        .min(1, 'Please add at least one size'),
    brand: Yup.string().required('category is required'),
    isFeatured: Yup.boolean().default(false).optional(),
    isArchived: Yup.boolean().default(false).optional(),
});
