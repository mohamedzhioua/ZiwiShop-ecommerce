import PropTypes from "prop-types";
import { getIn } from "formik";
import { Unstable_Grid2 as Grid } from "@mui/material";
import CustomInput from "../ui/CustomInput";

const AddressForm = (props) => {
    const { values, touched, errors, handleBlur, handleChange } = props
 

    return (
        <Grid
            container
            spacing={3}>
            <Grid xs={12} md={6}>

            <CustomInput
                    required
                    fullWidth
                    type="text"
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                />
            </Grid>
            <Grid xs={12} md={6}>
                <CustomInput
                    required
                    fullWidth
                    type="text"
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                />
            </Grid>
            <Grid xs={12} md={12}>
                <CustomInput
                    required
                    fullWidth
                    type="text"
                    label="Country"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.country}
                    name="country" 
                    error={touched.country && Boolean(errors.country)}
                    helperText={touched.country && errors.country}
                />
            </Grid>
            <Grid xs={12} md={6}>
                <CustomInput
                    required
                    fullWidth
                    type="text"
                    label="Street Address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.street1}
                    name="street1" 
                    error={touched.street1 && Boolean(errors.street1)}
                    helperText={touched.street1 && errors.street1}
                />
            </Grid>
            <Grid xs={12} md={6}>
                <CustomInput
                    fullWidth
                    type="text"
                    label="Street Address 2 (optional)"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.street2}
                    name="street2" 
                    error={touched.street2 && Boolean(errors.street2)}
                    helperText={touched.street2 && errors.street2}
                />
            </Grid>
            <Grid xs={12} md={6}>
                <CustomInput
                    required
                    fullWidth
                    type="text"
                    label="City"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.city}
                    name="city" 
                    error={touched.city && Boolean(errors.city)}
                    helperText={touched.city && errors.city}
                />
            </Grid>
            <Grid xs={12} md={3}>
                <CustomInput
                    fullWidth
                    type="text"
                    label="State"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.state}
                    name="state" 
                    error={touched.state && Boolean(errors.state)}
                    helperText={touched.state && errors.state}
                />
            </Grid>
            <Grid xs={12} md={3}>
                <CustomInput
                    fullWidth
                    type="number"
                    label="Zip Code"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.zipCode}
                    name="zipCode" 
                    error={touched.zipCode && Boolean(errors.zipCode)}
                    helperText={touched.zipCode && errors.zipCode}
                />
            </Grid>

        </Grid >
    );
};
AddressForm.propTypes = {
    values: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        street1: PropTypes.string.isRequired,
        street2: PropTypes.string,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        zipCode: PropTypes.string.isRequired
    }).isRequired,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default AddressForm;
