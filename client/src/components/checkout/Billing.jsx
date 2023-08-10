import PropTypes from "prop-types";
import {Stack, Box, Typography, Unstable_Grid2 as Grid, TextField } from "@mui/material";
 import CustomInput from "../ui/CustomInput";
import { getIn } from "formik";
import Autocomplete from '@mui/material/Autocomplete';
import { countries } from '../../utils/countries'
const Billing = (props) => {
    const { values, touched, errors, handleBlur, handleChange } = props
    const formattedName = (field) => `shippingAddress.${field}`;

    const formattedError = (field) =>
        Boolean(
            getIn(touched, formattedName(field)) &&
            getIn(errors, formattedName(field))
        );

    const formattedHelper = (field) =>
        getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));

    const formattedValue = (field) =>
        getIn(values, formattedName(field))

    return (
        <Box m="30px auto">
            <Stack spacing={2}>
                <Typography variant="h4">
                    Billing Information
                </Typography>
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
                            value={formattedValue("firstName")}
                            name={formattedName("firstName")}
                            error={formattedError("firstName")}
                            helperText={formattedHelper("firstName")}
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
                            value={formattedValue("lastName")}
                            name={formattedName("lastName")}
                            error={formattedError("lastName")}
                            helperText={formattedHelper("lastName")}
                        />
                    </Grid>
                    <Grid xs={12} md={12}>
                        <Autocomplete
                            value={formattedValue("country")}
                            options={countries}
                            autoHighlight
                            onChange={(event, newValue) => {
                                handleChange(formattedName("country"))(newValue); 
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                    label="Country"
                                    variant="outlined"
                                    name={formattedName("country")}
                                    onBlur={handleBlur}
                                    error={formattedError("country")}
                                    helperText={formattedHelper("country")}
                                />
                            )}
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
                            value={formattedValue("street1")}
                            name={formattedName("street1")}
                            error={formattedError("street1")}
                            helperText={formattedHelper("street1")}
                        />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <CustomInput
                            fullWidth
                            type="text"
                            label="Street Address 2 (optional)"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={formattedValue("street2")}
                            name={formattedName("street2")}
                            error={formattedError("street2")}
                            helperText={formattedHelper("street2")}
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
                            value={formattedValue("city")}
                            name={formattedName("city")}
                            error={formattedError("city")}
                            helperText={formattedHelper("city")}
                        />
                    </Grid>
                    <Grid xs={12} md={3}>
                        <CustomInput
                            required
                            fullWidth
                            type="text"
                            label="State"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={formattedValue("state")}
                            name={formattedName("state")}
                            error={formattedError("state")}
                            helperText={formattedHelper("state")}
                        />
                    </Grid>
                    <Grid xs={12} md={3}>
                        <CustomInput
                            required
                            fullWidth
                            type="number"
                            label="Zip Code"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={formattedValue("zipCode")}
                            name={formattedName("zipCode")}
                            error={formattedError("zipCode")}
                            helperText={formattedHelper("zipCode")}
                        />
                    </Grid>

                </Grid >
            </Stack>
        </Box>
    );
};
Billing.propTypes = {
    values: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
};


export default Billing;
