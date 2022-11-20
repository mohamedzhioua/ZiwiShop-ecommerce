import React, { useEffect } from "react";
import {GoogleLogin} from "react-google-login";
import axios from "axios";
import { gapi } from 'gapi-script';

const GoogleAuth = ({ informParent }) => {
  useEffect(() => {
    function initClient (){
          gapi.client.init({
          clientId:process.env.REACT_APP_GOOGLE_CLIENT_ID ,
          scope: ''
        });
     };
     gapi.load('client:auth2', initClient);
 });

  const responseGoogle = (response) => {
    axios
      .post("/user/google-login", { idToken: response.tokenId },{withCredentials:true})
      .then((response) => {
        // inform parent component
        informParent(response);
        console.log(response);
      })
      .catch((error) => {
        console.log("GOOGLE SIGNIN ERROR", error.response);
      });
  };
  

  return (
    <GoogleLogin
      clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
      buttonText="Continue with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
      theme="dark"

    />
  );
};

export default GoogleAuth;
