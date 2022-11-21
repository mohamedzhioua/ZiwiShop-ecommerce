import axios from "axios";
import React from "react";
import FacebookLogin from "react-facebook-login";

function FacebookAuth({ informParent }) {
  const responseFacebook = async (response) => {
    console.log(response);
    try {
      const result = await axios.post("/user/facebook-login", {
        userID: response.userID,
        accessToken: response.accessToken,
      });

      informParent(result);
      console.log(result);
    } catch (error) {
      console.log("Facebook SIGNIN ERROR", error.response);
    }
  };
  return (
    <FacebookLogin
      appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
       fields="name,email,picture"
      callback={(res) => responseFacebook(res)}
    />
  );
}

export default FacebookAuth;
