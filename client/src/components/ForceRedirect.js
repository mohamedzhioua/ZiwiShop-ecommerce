import React from 'react'
import { Navigate } from 'react-router-dom'

const ForceRedirect = ({user, children}) =>{
    console.log("redirect--->" ,user);

    if(user){
        return <Navigate to="/" replace/> 
      } 
      return children
}


export default ForceRedirect