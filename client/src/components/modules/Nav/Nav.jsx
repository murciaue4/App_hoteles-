import style from "./Nav.module.css";
import { Link } from "react-router-dom";
import { loginContext } from "../../../context/loginContext";
import { useContext, useState } from "react";
import searchIconW from "../../../static/searchIconW.svg";
import userIcon from "../../../static/userIconBold-06.svg";
import menuIcon from "../../../static/menuIconlight-07.svg";
import FavouriteIcon from "../../../static/FavouriteIcon2-03.svg";

const nav = () => {
  const [showMenuToggle, setShowMenuToggle] = useState(false)
  const { isLogin, user, closeSession } = useContext(loginContext);

  function toCapitalCase(string) {
    return string.replace(/\b\w/g, (match) => match.toUpperCase());
  }
  return (
    <div className={style.Nav}>
      <nav>
        <section className={style.logo}>
          <Link to={"/"}>
            <h1>H!</h1>
          </Link>

          <span>Campo Rubiales</span>
        </section>

        <section className={style.account}>
        <button className={style.menuButton}>
              <div className="flex h-full w-6">
                <img src={FavouriteIcon} alt="" className="h-full mt-1" />
              </div>
              <div className="h-full  grid items-center ml-2">
                <span>Favoritos</span>
              </div>
            </button>
          <button>
            

            {isLogin ? (
              <Link to={"/profile"}>
                <div className={style.accountPhoto}>
                  <div
                    className="w-full h-full flex justify-center
                "
                  >
                    <img src={userIcon} alt="" />
                  </div>
                </div>
              </Link>
            ) : (
              <Link to={"/login"}>
                <div className={style.accountPhoto}>
                  <div className=" h-full flex justify-center">
                    <img src={userIcon} alt="" />
                  </div>
                </div>
              </Link>
            )}

            <div className={style.accountButton}>
              {isLogin ? (
                <Link to={"/profile"} >{toCapitalCase(user.username)}</Link>
              ) : (
                <Link to={"/login"}>Iniciar Sesion</Link>
              )}
            </div>
          </button>
          <button className={style.menuButton} onClick={() => {
            setShowMenuToggle(!showMenuToggle)
          }}>
            <div className="flex h-full w-6">
              <img src={menuIcon} alt="" className="h-full mt-1" />
            </div>
            <div className="h-full  grid items-center ml-2">
              <span>Menu</span>
            </div>
          </button>
         {showMenuToggle? <div className={`absolute w-auto h-auto -bottom-28 right-0  z-20 border flex flex-col bg-white rounded-lg ${style.shadowBox} ${style.toggleMenu}`}>
            <button className=" text-left" >
              {isLogin? <span onClick={
              () => {
               closeSession() 
              }
            }>Salir</span>:null}
            </button>
            <button className=" text-left"> 
              Vistos recientemente
            </button>
            <button  className="text-left">
              Ayuda y atencion al cliente
            </button>
          </div>
          :null}
        </section>
      </nav>
    </div>
  );
};

export default nav;
