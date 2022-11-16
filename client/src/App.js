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
  const [isConnected, setIsconnected] = useState(false);
  // console.log(isConnected);
  const checkUserToken = () => {
    const userToken = JSON.parse(localStorage.getItem("user-token"));
    console.log(userToken);
    if (!userToken || userToken === "undefined") {
      setIsconnected(false);
    }
    setIsconnected(true);
  };
  const user = { isConnected: isConnected };
  console.log(user);
  useEffect(() => {
    checkUserToken();
}, [isConnected]);

  return (
    <BrowserRouter>
      <div className="bg-white" style={{ height: "100vh" }}>
        <Navbar user={user} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
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
