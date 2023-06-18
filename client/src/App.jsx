import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound/NotFound";
 import ForceRedirect from "./components/ForceRedirect";
import Footer from "./components/Footer/Footer";
import useAuth from "./hooks/useAuth";
 
function App() {
  const { isAuthenticated ,logout} = useAuth();

  // const checkUserToken = () => {
  //   if (typeof window !== "undefined") {
  //     const user = JSON.parse(localStorage.getItem("user-token"));
  //     if (user) {
  //       setIsconnected(true);
  //     } else {
  //       setIsconnected(false);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   checkUserToken();
  // }, [isConnected]);

  // const Logout = () => {
  //   if (localStorage.getItem("user-token")) {
  //     localStorage.clear();
  //     setIsconnected(false);
  //   }
  // };

  return (
    <BrowserRouter>
      <div className="bg-white" style={{ height: "100vh" }}>
        <Header Logout={logout} user={isAuthenticated} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute user={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <ForceRedirect user={isAuthenticated}>
                <Signin />
              </ForceRedirect>
            }
          />
          <Route
            path="/signup"
            element={
              <ForceRedirect user={isAuthenticated}>
                <Signup />
              </ForceRedirect>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
