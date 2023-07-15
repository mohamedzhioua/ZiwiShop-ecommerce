import * as Yup from "yup";

export const BrandValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name must be at least 2 letters')
        .required('Name is required'),
    
});