import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Front from "./components/FRONTPAGE/Front";
import Ordering from "./components/MAIN/Orderwatch.js/Ordering";
import Cart from "./components/MAIN/ConfirmOrder/Cart";
import LoginPage from "./components/LOGIN/LoginPage";
import SignPage from "./components/SIGNUPPAGE/SignPage";
import { setUserId } from "./components/SIDEBAR-data/UserId";
import { setToken } from "./components/SIDEBAR-data/Authentication";
import { useDispatch } from "react-redux";
import React,{useEffect} from "react";
import Logout from "./components/LOGOUT/logout"
import Addresspage from "./components/ADDRESS/Addresspage";
const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
  

    if (token && userId) {
      dispatch(setToken(token));
      dispatch(setUserId({ userId }));
    }
  }, [dispatch]);

  return (
    <div className="bg-gray-800">
      <Routes>
      <Route path="/logout" element={<Logout />} />
      <Route path="/" element={<LoginPage />} />
        <Route path="/Ordering" element={<Ordering />} />
        <Route path="/Front" element={<Front />} />
        <Route path="/cart" element={<Cart />} />
       
        <Route path="/signup" element={<SignPage />} />
        <Route path="/info" element={<Addresspage />} />
      </Routes>
    </div>
  );
};

export default App;
