 import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import "../FacebookAuth/FacebookAuth.css";
import CustomButton from "../CustomButton";
import { FaFacebook } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

function FacebookAuth() {
  const { facebookLogin } = useAuth();
  const responseFacebook = async (response) => {
    try {
      await facebookLogin(
        response.userID,
        response.accessToken,
      );
    } catch (error) {
      console.log("Facebook SIGNIN ERROR", error);
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
          <CustomButton
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            variant="outlined"
            fullWidth
            size="large"
            icon={FaFacebook}
            style={{ border: "2px solid black" }}

          >
            Continue with Facebook

          </CustomButton>
        )}
      />
    </div>
  );
}

export default FacebookAuth;
