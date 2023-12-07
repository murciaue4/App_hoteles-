import style from "./Nav.module.css";
import { Link } from "react-router-dom";
import { loginContext } from "../../../context/loginContext";
import { useContext } from "react";

const nav = () => {
  const { isLogin, user, closeSession } = useContext(loginContext);

  return (
    <div className={style.Nav}>
      <nav>
        <div className={style.logo}>
          <h1>
            <Link to={"/"}>H!</Link>
          </h1>
          <span>Campo Rubiales</span>
        </div>

        <div className={style.searchBar}>
          <input type="search" />
          <div>
            <button type="submit">Buscar</button>
          </div>
        </div>

        <div className={style.account}>
          <div className={style.accountButton}>
            <Link to={"/login"} onClick={closeSession}>
              {isLogin ? "Salir" : "Iniciar Sesion"}
            </Link>
          </div>
          <div className={style.accountPhoto}>
            {isLogin ? (
              <Link to={"/profile"}>{user.username[0].toUpperCase()}</Link>
            ) : (
              <Link to={"/login"}>?</Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default nav;
