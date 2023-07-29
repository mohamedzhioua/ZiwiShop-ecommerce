import { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import CustomButton from "../ui/CustomButton";
 import useAuth from "../../hooks/useAuth";
import { GoogleIcon } from "../icons";


const GoogleAuth = () => {
  const { googleLogin } = useAuth();


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
     await googleLogin(response.tokenId)    
     } catch (error) {
      console.log("GOOGLE SIGNIN ERROR", error);
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
            icon={GoogleIcon}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            color="primary"
          >
            Continue with Google
          </CustomButton>
        )}
      />
    </div>
  );
};

export default GoogleAuth;
