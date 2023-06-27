import { useTheme } from "@emotion/react";
import { TextField } from "@material-ui/core";
import { tokens } from "../theme/theme";

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
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); 4
  const inputStyle = {
    color: colors.primary[100],

  };
  return (

    <TextField
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
      InputProps={{
        style: inputStyle,
      }}
    />
  )
};

export default CustomInput;
