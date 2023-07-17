import PropTypes from "prop-types";
import { getIn } from "formik";
import { Unstable_Grid2 as Grid } from "@mui/material";
import CustomInput from "../ui/CustomInput";

const AddressForm = (props) => {
    const { type, values, touched, errors, handleBlur, handleChange } = props
    // these functions allow for better code readability
    const formattedName = (field) => `${type}.${field}`;

    const formattedError = (field) =>
        Boolean(
            getIn(touched, formattedName(field)) &&
            getIn(errors, formattedName(field))
        );

    const formattedHelper = (field) =>
        getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));

    return (
        <Grid
            container
            spacing={3}>
            <Grid
                xs={12}
                md={6}
            >
                <CustomInput
                    fullWidth
                    type="text"
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name={formattedName("firstName")}
                    error={formattedError("firstName")}
                    helperText={formattedHelper("firstName")}
                    sx={{ gridColumn: "span 2" }}
                />
            </Grid>
            <Grid
                xs={12}
                md={6}
            >
                <CustomInput
                    fullWidth
                    type="text"
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name={formattedName("lastName")}
                    error={formattedError("lastName")}
                    helperText={formattedHelper("lastName")}
                    sx={{ gridColumn: "span 2" }}
                />
            </Grid>
            <Grid
                xs={12}
                md={12}
            >
                <CustomInput
                    fullWidth
                    type="text"
                    label="Country"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.country}
                    name={formattedName("country")}
                    error={formattedError("country")}
                    helperText={formattedHelper("country")}
                    sx={{ gridColumn: "span 4" }}
                />
            </Grid>
            <Grid
                xs={12}
                md={6}
            >
                <CustomInput
                    fullWidth
                    type="text"
                    label="Street Address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.street1}
                    name={formattedName("street1")}
                    error={formattedError("street1")}
                    helperText={formattedHelper("street1")}
                    sx={{ gridColumn: "span 2" }}
                />
            </Grid>
            <Grid
                xs={12}
                md={6}
            >
                <CustomInput
                    fullWidth
                    type="text"
                    label="Street Address 2 (optional)"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.street2}
                    name={formattedName("street2")}
                    error={formattedError("street2")}
                    helperText={formattedHelper("street2")}
                    sx={{ gridColumn: "span 2" }}
                />
            </Grid>
            <Grid
                xs={12}
                md={6}
            >
                <CustomInput
                    fullWidth
                    type="text"
                    label="City"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.city}
                    name={formattedName("city")}
                    error={formattedError("city")}
                    helperText={formattedHelper("city")}
                    sx={{ gridColumn: "span 2" }}
                />
            </Grid>
            <Grid
                xs={12}
                md={3}
            >
                <CustomInput
                    fullWidth
                    type="text"
                    label="State"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.state}
                    name={formattedName("state")}
                    error={formattedError("state")}
                    helperText={formattedHelper("state")}
                    sx={{ gridColumn: "1fr" }}
                />
            </Grid>
            <Grid
                xs={12}
                md={3}
            >
                <CustomInput
                    fullWidth
                    type="text"
                    label="Zip Code"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.zipCode}
                    name={formattedName("zipCode")}
                    error={formattedError("zipCode")}
                    helperText={formattedHelper("zipCode")}
                    sx={{ gridColumn: "1fr" }}
                />
            </Grid>
        </Grid >
    );
};
AddressForm.propTypes = {
    type: PropTypes.string.isRequired,
    values: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      street1: PropTypes.string.isRequired,
      street2: PropTypes.string,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zipCode: PropTypes.string.isRequired,
    }).isRequired,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
  };
  
export default AddressForm;
