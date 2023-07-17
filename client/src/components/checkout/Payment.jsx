import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import CustomInput from "../ui/CustomInput";

const Payment = (props) => {
    const { values, touched, errors, handleBlur, handleChange }=props
  return (
    <Box m="30px 0">
       <Box>
        <Typography  variant="h4">
          Contact Info
        </Typography>
        <CustomInput
          fullWidth
          type="text"
          label="Email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          name="email"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          sx={{ gridColumn: "span 4", marginBottom: "15px" }}
        />
        <CustomInput
          fullWidth
          type="text"
          label="Phone Number"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phoneNumber}
          name="phoneNumber"
          error={!!touched.phoneNumber && !!errors.phoneNumber}
          helperText={touched.phoneNumber && errors.phoneNumber}
          sx={{ gridColumn: "span 4" }}
        />
      </Box>
    </Box>
  );
};

Payment.propTypes = {
    values:PropTypes.shape({  
      email:PropTypes.string.isRequired,
      phoneNumber:PropTypes.string.isRequired,
    }).isRequired,
    touched:  PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange:PropTypes.func.isRequired,
  };
export default Payment;
