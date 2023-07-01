import { Box, IconButton } from "@mui/material";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import useTheme from "../hooks/useTheme";

const NightModeToggle = () => {
  const { mode, toggleColorMode } = useTheme();

  return (
    <Box>
      <IconButton sx={{ ml: 1}} onClick={toggleColorMode}
      color="primary">
        {mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
      </IconButton>
    </Box>
  );
};

export default NightModeToggle;
