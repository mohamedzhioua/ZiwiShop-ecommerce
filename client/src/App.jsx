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
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from 'react';
import { paymentApi } from './api/PaymentApi';



function App() {
  const { isInitialized } = useAuth();
  const { theme } = useTheme();
  const [stripeApiKey, setStripeApiKey] = useState("");
  useEffect(() => {
    async function fetchStripeApiKey() {
      const data = await paymentApi.getstripeapikey();
      setStripeApiKey(data);
    }
    fetchStripeApiKey();
  }, []);
  const stripePromise = loadStripe(stripeApiKey);
 
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        {stripeApiKey && (
          <Elements stripe={stripePromise}>
            <div className='content-wrap'>
              <Navbar />
              {isInitialized ? <Router /> : <Splash />}
              <Toaster position="top-center" />
              <CartMenu />
            </div>
            <Footer />
            <ScrollToTop />
            <ScrollToTopBtn />
          </Elements>
        )}
      </BrowserRouter>
    </ThemeProvider>


  );
}

export default App;
