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
          <div><button>Filtrar</button></div>
          <input type="search" />
          <div><button type="submit">Search</button></div>
        </div>

        <div className={style.account}>
          <div className={style.accountButton}>
            <Link to={"/login"} onClick={closeSession}>
              {isLogin ? "LogOut" : "LogIn"}
            </Link>
          </div>
          <div className={style.accountPhoto}>
            {isLogin ? <Link to={"/profile"}>{user.username[0].toUpperCase()}</Link> : <Link to={"/login"}>?</Link>}
            
          </div>
        </div>
      </nav>
    </div>
  );
};

export default nav;
