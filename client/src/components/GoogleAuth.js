import React from "react";
import GoogleLogin from "react-google-login";
import axios from "axios"

const GoogleAuth =({ informParent }) =>{
  const responseGoogle = (response) => {
    console.log(response);
    axios.post("/user/google-login" , {idToken:response.tokenId })
    .then(response => {
      console.log('GOOGLE SIGNIN SUCCESS', response);
      // inform parent component
      informParent(response);
    })
    .catch(error => {
      console.log('GOOGLE SIGNIN ERROR', error.response);
    });
 
  };
  return (
    <GoogleLogin
      clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
      buttonText="Continue with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
     
  );
}

export default GoogleAuth;
