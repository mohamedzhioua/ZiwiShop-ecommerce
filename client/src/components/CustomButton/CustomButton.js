import React from 'react'
import '../CustomButton/CustomButton.css'
function CustomButton({label,type , handleSubmit}) {
  return (
    <button  type={type} onSubmit={handleSubmit}>
      {label}
    </button>
  )
}

export default CustomButton