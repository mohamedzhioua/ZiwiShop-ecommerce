import PropTypes from "prop-types";
import { Box, Checkbox, FormControlLabel, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import AddressForm from "./AddressForm";
import { Stack } from "@mui/system";

const Shipping = (props) => {
    const { values, touched, errors, handleBlur, handleChange } = props

    return (
        <Box m="30px auto">
            <Stack spacing={2}>
                <Typography variant="h4">
                    Billing Information
                </Typography>
                <AddressForm
                    type="billingAddress"
                    values={values.billingAddress}
                    touched={touched}
                    errors={errors}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                />
            </Stack>

            <Box mb="20px">
                <FormControlLabel
                    control={
                        <Checkbox
                            defaultChecked
                            value={values.shippingAddress.isSameAddress}
                            onChange={() =>
                                setFieldValue(
                                    "shippingAddress.isSameAddress",
                                    !values.shippingAddress.isSameAddress
                                )
                            }
                        />
                    }
                    label="Same for Shipping Address"
                />
            </Box>

            {/* SHIPPING FORM */}
            {!values.shippingAddress.isSameAddress && (
                <Stack spacing={2}>
                    <Typography variant="h4">
                        Shipping Information
                    </Typography>
                    <AddressForm
                        type="shippingAddress"
                        values={values.shippingAddress}
                        touched={touched}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                    />
                </Stack>
            )}
        </Box>
    );
};
Shipping.propTypes = {
    values: PropTypes.shape({
      billingAddress: PropTypes.shape({
        street: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        postalCode: PropTypes.string.isRequired,
      }).isRequired,
      shippingAddress: PropTypes.shape({
         street: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        postalCode: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
  };
  
export default Shipping;
