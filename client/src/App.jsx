import { BrowserRouter } from "react-router-dom";
import Footer from "./layouts/Footer/Footer";
import Router from "./routes/Router";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from "./layouts/Navbar";

function App() {

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
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
