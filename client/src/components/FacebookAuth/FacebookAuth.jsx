import axiosInstance from "../../api/axios";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import "../FacebookAuth/FacebookAuth.css";
import CustomButton from "../CustomButton";
import { FaFacebook } from "react-icons/fa";

function FacebookAuth({ informParent }) {
  const responseFacebook = async (response) => {
    console.log(response);
    try {
      const result = await axiosInstance.post(`${import.meta.env.VITE_API_URL}/user/facebook-login`, {
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
