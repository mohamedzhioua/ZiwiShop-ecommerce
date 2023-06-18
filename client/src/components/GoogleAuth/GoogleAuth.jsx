import { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import axiosInstance from "../../api/axios";
import { gapi } from "gapi-script";
import "../GoogleAuth/GoogleAuth.css";
import CustomButton from "../CustomButton";
import { FcGoogle } from "react-icons/fc";


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
      const result = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/user/google-login`,
        { idToken: response.tokenId },
        { withCredentials: true }
      );

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
          <CustomButton
            variant="outlined"
            fullWidth
            size="large"
            icon={FcGoogle}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            style={{ border: "2px solid black", color: 'black' }}
          >
            Continue with Google
          </CustomButton>
        )}
      />
    </div>
  );
};

export default GoogleAuth;
