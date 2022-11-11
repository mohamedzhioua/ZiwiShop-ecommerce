import React from 'react'
import '../CustomInput/CustomInput.css'
function CustomInput({label}) {
  return (
    <div class="form-group">
    <label >{label}</label>
    <input type="password"  placeholder="Password" />
  </div>
    )
}

export default CustomInput