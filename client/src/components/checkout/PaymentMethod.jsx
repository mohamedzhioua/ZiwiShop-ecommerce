 import PropTypes from "prop-types";
import { Box, Typography, Grid, Radio, FormControlLabel, RadioGroup, FormHelperText } from "@mui/material";
import { Stack } from "@mui/system";

const PaymentMethod = ({ values, touched, errors, handleBlur, handleChange }) => {
 
  const paymentMethods = [
    {
      label: 'PayPal',
      value: 'paypal'
    },
    { value: "stripe", label: "Stripe" },
    {
      value: 'cash',
      label: 'Payment at Home'
    }
  ];

  return (
    <Box m="30px 0">
      <Stack spacing={2}>
        <Typography variant="h4">Payment Method</Typography>
        <Grid container spacing={3}>
        <RadioGroup
              name="paymentMethod"
              onChange={handleChange}
               value={values.paymentMethod}
            >
              {paymentMethods.map((paymentMethod) => (
                <FormControlLabel
                  control={<Radio />}
                  key={paymentMethod.value}
                  label={(
                    <Typography variant="body1">
                      {paymentMethod.label}
                    </Typography>
                  )}
                  value={paymentMethod.value}
                />
              ))}
            </RadioGroup>
            </Grid>
       </Stack>
       {touched.paymentMethod && errors.paymentMethod && (
        <FormHelperText error sx={{fontSize:'14px'}}>{errors.paymentMethod}</FormHelperText>
      )}
    </Box>
  );
};

PaymentMethod.propTypes = {
  values: PropTypes.shape({
    paymentMethod: PropTypes.string.isRequired,
  }).isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default PaymentMethod;
