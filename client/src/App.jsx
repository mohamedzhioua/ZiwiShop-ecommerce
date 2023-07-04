import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Footer from "./layouts/Footer";
import Router from "./routes/Router";
import { CssBaseline } from "@mui/material";
import Navbar from "./layouts/Navbar";
import useTheme from "./hooks/useTheme";
import './index.css'
import CartMenu from "./components/CartMenu";
import useAuth from "./hooks/useAuth";

// const ScrollToTop = () => {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   return null;
// };

function App() {
  const auth = useAuth();
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <div className="content">
          {auth.isInitialized ? <Router /> : ""}
          <Toaster position="top-center" />
          <CartMenu />
        </div>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>


  );
}

export default App;
