import { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { gapi } from "gapi-script";
import "../GoogleAuth/GoogleAuth.css";

const GoogleAuth = ({ informParent }) => {
   useEffect(() => {
    function initClient() {
      gapi.client.init({
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: "",
      });
    }
    gapi.load("client:auth2", initClient);
  });

  const responseGoogle = async (response) => {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/google-login`,
        { idToken: response.tokenId },
        { withCredentials: true }
      );
      // console.log("🚀 ~ file: GoogleAuth.jsx:25 ~ responseGoogle ~ result:", result)
 
      informParent(result);
    } catch (error) {
      console.log("GOOGLE SIGNIN ERROR", error.response);
    }
  };

  return (
    <div>
      <GoogleLogin
        clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}
        buttonText="Continue with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <button
            className="social-icon-google"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <i className="fab fa-google" />
          </button>
        )}
      />
    </div>
  );
};

export default GoogleAuth;
