import { BrowserRouter } from "react-router-dom";
import Footer from "./layouts/Footer";
import Router from "./routes/Router";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
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
        {auth.isInitialized ? <Router /> :""}
          <CartMenu />
        </div>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>


  );
}

export default App;
