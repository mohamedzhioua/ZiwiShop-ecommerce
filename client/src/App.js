 import './App.css';
 import Signin from './pages/Signin/Signin'
 import Signup from './pages/Signup/Signup'
 import Home from './pages/Home/Home'
 import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route index element={<Signin />} />

        <Route  path="/"  element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/logout" element={<Logout />} /> */}
        
      </Routes>
  </BrowserRouter>
  );
}

export default App;
