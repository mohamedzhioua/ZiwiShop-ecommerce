import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment } from "@mui/material";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useState } from "react";
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
  multiline,
  required
}) => {

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (

    <TextField
      required={required}
      label={label}
      placeholder={placeholder}
      type={showPassword ? 'text' : type}
      name={name}
      variant="outlined"
      fullWidth
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      multiline={multiline}
      InputProps={
        type === "password" && {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={handleClickShowPassword}>
                {showPassword ? <RemoveRedEyeOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }
      }
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
  multiline: PropTypes.string,
};
export default CustomInput;
