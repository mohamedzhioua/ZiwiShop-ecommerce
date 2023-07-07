import * as Yup from "yup";

export const ProductvalidationSchema = Yup.object().shape({
    category: Yup.string().required('category is required'),
    description: Yup.string().max(1000),
    images: Yup.array()
        .min(1, 'Please upload at least one image'),
    name: Yup.string()
        .min(2, 'Name must contain more than 2 characters')
        .required('Name is required'),
    price: Yup.number()
        .min(1, 'Price must be greater than 0')
        .required('Price is required'),
    colorId: Yup.string().min(1),
    size: Yup.array()
        .min(1, 'Please add at least one size'),
    isFeatured: Yup.boolean().default(false).optional(),
    isArchived: Yup.boolean().default(false).optional(),
});