import React from "react";
import classnames from "classnames";
import "../CustomInput/CustomInput.css";
function CustomInput({ label, type, icon, placeholder, name, onChange, errors }) {
  return (
    <div className="mb-3">
      <label  className="form-label">{label}</label>
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
      {errors && <div class="invalid-feedback">{errors}</div>}{" "}
    </div>
    </div>
  );
}

export default CustomInput;
