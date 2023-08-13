import CustomButton from "../ui/CustomButton";
import { GoogleIcon } from "../icons";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { getGoogleOAuthURL } from "../../utils/getGoogleOAuthURL";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
 



const GoogleAuth = () => {
  const googleOAuthURL = getGoogleOAuthURL();
  const { googleLogin } = useAuth();
const {pathname}=useLocation()
 

  useEffect(() => {
    const getMe = async () => {
      try {
        if (pathname === "/auth/google" ){
          await googleLogin();
        }

      } catch (error) {
        console.log("error", error.message)
      }
    }
    getMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
 

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
