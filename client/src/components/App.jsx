import React, { useEffect, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import style from "./styles/App.module.css";
import Logger from "./modules/log/Logger";
import Nav from "./modules/Nav/Nav";
import Footer from "./modules/Nav/Footer";
import Home from "./modules/Home/Home";
import Profile from "./modules/Dashboards/Dashboard";
import FormHotel from "./modules/forms/FormHotel";
import FormHotel02 from "./modules/forms/FormHotel02";
import { loginContext } from "../context/loginContext";

function App() {
  //global context...
  const { isLogin, setIsLogin, token } = useContext(loginContext);
  //global context...
  useEffect(() => {
    token ? setIsLogin(true) : null;
  }, []);

  return (
    <div className={style.App}>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={!isLogin ? <Logger /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={isLogin ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
