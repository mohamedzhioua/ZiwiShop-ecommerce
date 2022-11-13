import React from "react";
import classnames from "classnames"
import "../CustomInput/CustomInput.css";
function CustomInput({
  label,
  type,
  placeholder,
  name,
  value,
  onChange,
  errors,
}) {
  return (
    <div class="form-group">
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        className={classnames("form-control", { "is-invalid": errors })}
      />
      {errors && <div class="invalid-feedback">{errors}</div>}{" "}
    </div>
  );
}

export default CustomInput;
