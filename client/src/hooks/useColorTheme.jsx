import { createTheme } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { getDesignTokens } from "../theme/theme";

export const useColorTheme = () => {
  const storedMode = localStorage.getItem("themeMode");
  const [mode, setMode] = useState(storedMode || "light");

  const toggleColorMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  const modifiedTheme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  return {
    theme: modifiedTheme,
    mode,
    toggleColorMode,
  };
};
