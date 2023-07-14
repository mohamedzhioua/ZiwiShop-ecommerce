import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name must be at least 2 letters')
        .required('Name is required'),
    value: Yup.string()
        .min(1, 'Value must be at least 1 letter')
        .required('Value is required'),
});
