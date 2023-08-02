 import Lottie from "react-lottie";
import animationData from "../../assets/animations/ZiwiShope_Spach_animation.json"
import { Box } from "@mui/system";

const Splash = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Box
    sx={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Lottie options={defaultOptions} width={300} height={300} />
  </Box>
  );
};

export default Splash;
