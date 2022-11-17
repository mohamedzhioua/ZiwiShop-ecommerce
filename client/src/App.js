import "./App.css";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound/NotFound";
import { useEffect, useState } from "react";

function App() {
  const [isConnected, setIsconnected] = useState("");

  console.log("isConnected-->", isConnected);

  const checkUserToken = () => {
    const user = JSON.parse(localStorage.getItem("user-token"));
    if (user) {
      setIsconnected(user);
    } else {
      setIsconnected("");
    }
  };
  useEffect(() => {
    checkUserToken();
  }, [isConnected]);

  const LogoutHandler = () => {
    if (localStorage.getItem("user-token")) {
      localStorage.removeItem("user-token");
      setIsconnected("");
    }
  };

  return (
    <BrowserRouter>
      <div className="bg-white" style={{ height: "100vh" }}>
        <Navbar LogoutHandler={LogoutHandler} user={isConnected} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute user={isConnected}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
