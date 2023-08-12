import CustomButton from "../ui/CustomButton";
 import { GoogleIcon } from "../icons";
import { Link as RouterLink } from "react-router-dom";
import { getGoogleOAuthURL } from "../../utils/getGoogleOAuthURL";




const GoogleAuth = () => {
  const googleOAuthURL = getGoogleOAuthURL();

 

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
