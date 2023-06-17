import { TextField } from "@material-ui/core";

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
}) => (
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
  />
);

export default CustomInput;
