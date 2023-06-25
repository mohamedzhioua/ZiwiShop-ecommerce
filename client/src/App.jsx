import { BrowserRouter } from "react-router-dom";
import Footer from "./layouts/Footer";
import Router from "./routes/Router";
import { CssBaseline } from "@mui/material";
import {  ThemeProvider } from '@mui/material/styles';
import Navbar from "./layouts/Navbar";
import useTheme from "./hooks/useTheme";

function App() {

  const {theme} = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar  />
        <Router />
        <Footer />
      </BrowserRouter>
    </ThemeProvider>

  );
}

export default App;
