import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Footer from "./layouts/Footer";
import Router from "./routes/Router";
import { CssBaseline } from "@mui/material";
import Navbar from "./layouts/Navbar";
import useTheme from "./hooks/useTheme";
import './index.css'
import useAuth from "./hooks/useAuth";
import CartMenu from './components/Cart/index';
import { ScrollToTop } from './utils/scrollToTop';
import ScrollToTopBtn from './components/ui/ScrollToTopBtn';
import Splash from './components/ui/Splash';




function App() {
  const { isInitialized } = useAuth();
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
            <div className='content-wrap'>
              <Navbar />
              {isInitialized ? <Router /> : <Splash />}
              <Toaster position="top-center" />
              <CartMenu />
            </div>
            <Footer />
            <ScrollToTop />
            <ScrollToTopBtn />
      </BrowserRouter>
    </ThemeProvider>


  );
}

export default App;
