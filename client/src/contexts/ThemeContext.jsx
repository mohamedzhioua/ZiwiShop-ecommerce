import PropTypes from "prop-types";
import { createTheme } from "@mui/material";
import { createContext } from "react";
import { useColorTheme } from "../hooks/useColorTheme";
 


export const ThemeContext = createContext({
    mode: "light",
    toggleColorMode: () => { },
    theme: createTheme(),
});

export const ThemeContextProvider = ({ children }) => {
    const value = useColorTheme();
 
    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};

ThemeContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
export default ThemeContext
