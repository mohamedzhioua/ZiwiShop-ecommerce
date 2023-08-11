import CustomButton from "../ui/CustomButton";
// import useAuth from "../../hooks/useAuth";
import { GoogleIcon } from "../icons";
import { Link as RouterLink } from "react-router-dom";
import { getGoogleOAuthURL } from "../../utils/getGoogleOAuthURL";





const GoogleAuth = () => {
  const googleOAuthURL = getGoogleOAuthURL();

  // const { googleLogin } = useAuth();

 
  // const responseGoogle = async (response) => {
  //    try {
  //    await googleLogin(response.tokenId)    
  //    } catch (error) {
  //     console.log("GOOGLE SIGNIN ERROR", error);
  //   }
  // };

  return (
    <>
      <CustomButton
        component={RouterLink}
        variant="outlined"
        fullWidth
        size="large"
        startIcon={<GoogleIcon />}
        color="primary"
        to={googleOAuthURL}
      >
        Continue with Google
      </CustomButton>
    </>
  );
};

export default GoogleAuth;
