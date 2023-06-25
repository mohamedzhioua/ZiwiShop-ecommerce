export const getDesignTokens = (mode) => {
  const isDarkMode = mode === "dark";

  const commonPalette = {
    background: {
      default: isDarkMode ? '#2F3746' : '#F9F5FF',
      paper: isDarkMode ? '#111927' : "#ffffff",
    },
    mode: mode,
    fifthary: {
      contrastText: "#ffffff",
      main: isDarkMode ? "#af52bf" : "#9c27b0",
    },
    fourthary: {
       main: isDarkMode ?  "#F5F7FF" :"#000000",
    },
    text: {
      primary: isDarkMode ? '#EDF2F7' : "#172b4d",
      secondary: isDarkMode ? '#A0AEC0' : "#6b778c",
    },
   };

  const darkModePalette = {
    ...commonPalette,
    action: {
      active: "#ffffff",
    },
    divider: "rgba(145, 158, 171, 0.24)",
    
  };

  const lightModePalette = {
    ...commonPalette,
    action: {
      active: "#6b778c",
    },
   
  };

  return {
    palette: {
      mode: mode,
      ...(isDarkMode ? darkModePalette : lightModePalette),
    },
  };
};
