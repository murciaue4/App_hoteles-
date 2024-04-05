import React, { useEffect, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import style from "./styles/App.module.css";
import Logger from "./modules/log/Logger";
import Nav from "./modules/Nav/Nav";
import Footer from "./modules/Nav/Footer";
import Home from "./modules/Home/Home";
import Profile from "./modules/Dashboards/Dashboard";
import AddHotelForm from "./modules/forms/AddHotelForm";
import Favourites from "./modules/Dashboards/Favourites";
import ComponentePrueba from "./modules/alerts/AlertLogUp";
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

      <div className={style.body}>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={!isLogin ? <Logger /> : <Navigate to="/profile" />}
        />
        <Route
          path="/profile"
          element={isLogin ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="/hoteles">
            <Route path="post" element = {isLogin? <AddHotelForm/> : <Navigate to="/login" />}> </Route>
        </Route>
      <Route path="/favorites" element = {isLogin? <Favourites/> : <Navigate to="/login" /> }/>
      <Route
          path="/blank"
          element={<ComponentePrueba />}
        />
      </Routes>
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default App;
