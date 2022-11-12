import React from "react";
import "../CustomInput/CustomInput.css";
function CustomInput({ label, type, placeholder, name,value, onChange }) {
  return (
    <div class="form-group">
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default CustomInput;
