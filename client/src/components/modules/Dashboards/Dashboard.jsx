import style from "./Dashboard.module.css";
import { useContext, useEffect, useState } from "react";
import { loginContext } from "../../../context/loginContext";
import axios from "axios";
import Errors from "../alerts/Errors";
import { Link, NavLink} from "react-router-dom";

const Dashboard = () => {
  const { user, closeSession, token } = useContext(loginContext);
  const [err, setErr] = useState(false);
  const [dataUser, setDtaUser] = useState();
  const [dataOwner, setDataOwner] = useState(null);
  const [showOwner, setShowOwner] = useState(false);
  const [showFavourites, setShowFavourites] = useState(false);

  const ownerHandleShow = () => {
    setShowOwner(!showOwner);
  };
  const favouritesHandleShow = () => {
    setShowFavourites(!showFavourites);
  };

  console.log(dataUser);
  console.log(dataOwner);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        };
        const data = await axios.get(
          `http://localhost:3333/user/users/${user.id}`,
          config
        );
        const propiedades = await axios.get(
          `http://localhost:3333/user/hoteles/id_user/${user.id}`,
          config
        );

        if (!propiedades.data.body.length == 0) {
          setDataOwner(propiedades.data.body);
        }

        console.log("propiedades : ", propiedades);

        setDtaUser(data.data.body[0]);
      } catch (error) {
        setErr(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={style.Dashboard}>
      <div className={style.banner}>
        <button>f</button>
        <NavLink to={"/"}><button>X</button></NavLink>
        <h1>{`Hola, ${dataUser ? dataUser["name"] : "null"}`}</h1>
        <h4>{`${dataUser ? "@" + user["username"] : "null"}`}</h4>
        <div className={style.photo}>
          <button className={style.button}>+</button>
        </div>
      </div>

      <div className={style.body}>
        <div className={style.bodySearchButton}>
          <button>
            <Link to={"/"}>Inicio</Link>
          </button>
        </div>

        <div className={style.bodyMisDatos}>
          <div className={style.divDatos}>
            <div className={style.box}>
              <div>
                <div>
                  <b>Nombre</b> :{` ${dataUser ? dataUser["name"] : "null"}`}
                </div>
              </div>
              <div>
                <div>
                  <b>Apellidos :</b>
                  {` ${dataUser ? dataUser["lastname"] : "null"}`}
                </div>
              </div>
              <div>
                <div>
                  <b>Email</b> :{` ${dataUser ? dataUser["email"] : "null"}`}
                </div>
              </div>
            </div>

            <div className={style.box}>
              <div>
                <div>
                  <b>Creado</b> :{" "}
                  {` ${
                    dataUser ? dataUser["createtime"].split("T")[0] : "null"
                  }`}
                </div>
              </div>
              <div>
                <div>
                  <b>Tipo</b> :{` ${dataUser ? dataUser["usertype"] : "null"}`}
                </div>
              </div>
              <div>
                <div>
                  <b>Usuario</b> :
                  {` ${dataUser ? "@" + user["username"] : "null"}`}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={!showOwner ? style.titles : style.titlesHover}>
          <h1 onClick={ownerHandleShow}>Propiedades</h1>
        </div>
        {showOwner ? (
          dataOwner ? (
            <div className={style.bodyOwners}>
              <div className={style.ownerCard}>
                <i>{`${dataOwner ? dataOwner[0]["type"] : "null"}`}</i>
                <h3>{`${dataOwner ? dataOwner[0]["name"] : "null"}`}</h3>

                <img
                  src={
                    dataOwner
                      ? `http://localhost:3333/${dataOwner[0]["img"][0]}`
                      : "/"
                  }
                  alt="img"
                />

                <p>{`${dataOwner ? dataOwner[0]["location"] : "null"}`}</p>
              </div>
            </div>
          ) : null
        ) : null}

        <div className={!showFavourites ? style.titles : style.titlesHover}>
          <h1 onClick={favouritesHandleShow}>favoritos</h1>
        </div>
        {showFavourites ? (
          dataOwner ? (
            <div className={style.bodyFavourites}>
              <div className={style.favouritesCard}>
                <i>{`${dataOwner ? dataOwner[0]["type"] : "null"}`}</i>
                <h3>{`${dataOwner ? dataOwner[0]["name"] : "null"}`}</h3>

                <img
                  src={
                    dataOwner
                      ? `http://localhost:3333/${dataOwner[0]["img"][0]}`
                      : "/"
                  }
                  alt="img"
                />

                <p>{`${dataOwner ? dataOwner[0]["location"] : "null"}`}</p>
              </div>
            </div>
          ) : null
        ) : null}
        <div className={style.bodyButtons}>
          <div className={style.selectionBox}>
            <div onClick={ownerHandleShow} className={style.selection}></div>Mis
            propiedades
          </div>
          <div className={style.selectionBox}>
            <div className={style.selection}></div>
            <Link to={"/hoteles/post"}>Publicar</Link>
          </div>
          <div className={style.selectionBox}>
            <div className={style.selection}></div>
            Editar perfil
          </div>
          <div className={style.selectionBox}>
            <div className={style.selection}></div>
            Ajustes
          </div>
          <div className={style.selectionBox}>
            <div
              style={{
                color: "red",
              }}
              className={style.selection}
              onClick={closeSession}
            ></div>
            Salir
          </div>
        </div>
      </div>
      
      {err.error ? <Errors error={err} /> : null}
    </div>
  );
};

export default Dashboard;
