import React, { useState } from "react";
import classnames from "classnames";
function CustomInput({
  label,
  type,
  icon,
  placeholder,
  name,
  onChange,
  errors,
  password,
}) {
  // const [passwordVisible, setPasswordVisible] = useState(password);

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <div className="input-group">
        <span className="input-group-text">
          <i className={icon}></i>
        </span>
        <input
          type={type}
           placeholder={placeholder}
          name={name}
          onChange={onChange}
          className={classnames("form-control", { "is-invalid": errors })}
        />
        {/* {password && (
          <span className="input-group-text">
            <i
              onClick={() => setPasswordVisible(!passwordVisible)}
              className={`fa ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`}
            ></i>
          </span>
        )} */}
        {errors && <div class="invalid-feedback">{errors}</div>}{" "}
      </div>
    </div>
  );
}

export default CustomInput;
