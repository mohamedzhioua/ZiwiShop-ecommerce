import PropTypes from "prop-types";
import { Box, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import CustomInput from "../ui/CustomInput";
import { Stack } from "@mui/system";

const ContactInfo = (props) => {
    const { values, touched, errors, handleBlur, handleChange } = props;
  
    return (
        <Box m="30px 0">
            <Stack spacing={2}>
                <Typography variant="h4">Contact Info</Typography>
                <Grid container spacing={3}>
                    <Grid xs={12} md={6}>
                        <CustomInput
                            required
                            fullWidth
                            type="text"
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={!!touched.email && !!errors.email}
                            helperText={touched.email && errors.email}
                        />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <CustomInput
                            required
                            fullWidth
                            type="number"
                            label="Phone Number"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.phoneNumber}
                            name="phoneNumber"
                            error={!!touched.phoneNumber && !!errors.phoneNumber}
                            helperText={touched.phoneNumber && errors.phoneNumber}
                        />
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    );
};

ContactInfo.propTypes = {
    values: PropTypes.shape({
        email: PropTypes.string.isRequired,
        phoneNumber: PropTypes.number.isRequired,
    }).isRequired,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default ContactInfo;
