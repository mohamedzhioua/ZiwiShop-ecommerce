import React, { useEffect } from "react";
import {GoogleLogin} from "react-google-login";
import axios from "axios";
import { gapi } from 'gapi-script';

const GoogleAuth = ({ informParent }) => {
  useEffect(() => {
    const initClient = () => {
          gapi.client.init({
          clientId: "12667906277-1jq6i2clda984gsrpn18omr0g5uqshvc.apps.googleusercontent.com",
          scope: ''
        });
     };
     gapi.load('client:auth2', initClient);
 });
  const responseGoogle = (response) => {
    console.log(response);

    axios
      .post("/user/google-login", { idToken: response.tokenId },{withCredentials:true})
      .then((response) => {
        // inform parent component
        informParent(response);
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
