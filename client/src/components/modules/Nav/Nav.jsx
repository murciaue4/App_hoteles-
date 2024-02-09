import style from "./Nav.module.css";
import { Link } from "react-router-dom";
import { loginContext } from "../../../context/loginContext";
import { useContext } from "react";

const nav = () => {
  const { isLogin, user, closeSession } = useContext(loginContext);

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
        </section>


      </nav>
    </div>
  );
};

export default nav;
