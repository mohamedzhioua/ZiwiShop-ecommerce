import axios from "axios";
 import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import "../FacebookAuth/FacebookAuth.css";

function FacebookAuth({ informParent }) {
  const responseFacebook = async (response) => {
    console.log(response);
    try {
      const result = await axios.post(`${import.meta.env.VITE_API_URL}/user/facebook-login`, {
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
        appId={`${import.meta.env.VITE_FACEBOOK_APP_ID}`}
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
