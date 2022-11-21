import axios from "axios";
import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import "../FacebookAuth/FacebookAuth.css";

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
    <div>
      <FacebookLogin
        appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
        fields="name,email,picture"
        autoLoad={false}
        callback={(res) => responseFacebook(res)}
        render={(renderProps) => (
          <button
            className="social-icon-facebook"
            onClick={renderProps.onClick}
          >
            <i className="fab fa-facebook-f" />
          </button>
        )}
      />
    </div>
  );
}

export default FacebookAuth;
