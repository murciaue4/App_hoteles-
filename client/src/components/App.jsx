import React, { useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import style from "./styles/App.module.css";
import Logger from "./modules/log/Logger";
import Nav from "./modules/Nav/Nav";
import Footer from "./modules/Nav/Footer";
import Home from "./modules/Home/Home";
import {loginContext} from '../context/loginContext';

function App() {
  //global context...
  const {isLogin, setIsLogin, user} = useContext(loginContext)
  //global context...

useEffect(() => {
  user ? setIsLogin(true):null;
}, [])


  return (
    <div className={style.App}>
      <Nav />

      <Routes>
        <Route path="/" element={!isLogin ? <Logger /> : <Home />} />
        {/* <Route path="/login" element={<Logger />} /> */}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
