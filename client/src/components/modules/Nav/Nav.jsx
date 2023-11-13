import style from "./Nav.module.css";
import { Link } from "react-router-dom";

const nav = () => {
  return (
    <div className={style.Nav}>
      <nav>
        <div className={style.logo}>
          <h1><Link to={"/"}>H!</Link></h1>
          <span>Campo Rubiales</span>
        </div>
        <div>
          <ul>
            <li>
              <a href="/">RDP</a>
            </li>

            <li>
              <a href="/" title="fdsfdsf">
                Servicios
              </a>
            </li>
            <li>
              <a href="/">Contactanos</a>
            </li>
          </ul>
        </div>
        <div className={style.Link}>
          {/* manejar el enunciado del Link con el estado global isLogin           */}
          <Link to={"/login"}>Iniciar sesión</Link>
        </div>
      </nav>
    </div>
  );
};

export default nav;
