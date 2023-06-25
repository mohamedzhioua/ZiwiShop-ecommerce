import { Box, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import useTheme from "../../hooks/useTheme";
 
const NightModeToggle = () => {
  const { mode, toggleColorMode } = useTheme();

  return (
    <Box
      
    >
     
      <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
        {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
};

export default NightModeToggle;
