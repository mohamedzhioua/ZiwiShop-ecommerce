import { Box, IconButton } from "@mui/material";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import useTheme from "../../hooks/useTheme";

const NightModeToggle = () => {
  const { mode, toggleColorMode } = useTheme();

  return (
    <Box

    >


      <IconButton sx={{ ml: 1 }} onClick={toggleColorMode}
        color="inherit">
        {mode === "dark" ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
      </IconButton>
    </Box>
  );
};

export default NightModeToggle;
