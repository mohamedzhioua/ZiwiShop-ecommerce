import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";

const CustomInput = ({
  label,
  placeholder,
  type,
  name,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required
}) => {

  return (

    <TextField
    required={ required}
      label={label}
      placeholder={placeholder}
      type={type}
      name={name}
      variant="outlined"
      fullWidth
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}

    />
  )
};
CustomInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.bool,
  required: PropTypes.bool,
  helperText: PropTypes.string,
};
export default CustomInput;
