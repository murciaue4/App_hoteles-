import style from "./Dashboard.module.css";
import { useContext, useEffect, useState } from "react";
import { loginContext } from "../../../context/loginContext";
import axios from "axios";
import Errors from "../alerts/Errors";
import { Link, NavLink } from "react-router-dom";
import OwnerCard from "./CardOwner";

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
      <section className="w-full h-64 flex justify-center">
        <div className={style.banner}>
          <div className="flex flex-row justify-center items-center">
            <div className={style.photo}>
              <button className={style.button}>+</button>
            </div>
            <span className="mx-4">
              <h1>{`Hola, ${dataUser ? dataUser["name"] : "null"}`}</h1>
              <h4>{`${dataUser ? "@" + user["username"] : "null"}`}</h4>
            </span>
          </div>

          <div className={`h-full flex flex-col justify-center `}>
            <button>f</button>
            <button>X</button>
          </div>
        </div>
      </section>

      <div className={style.body}>
        <div className={style.bodySearchButton}>
          <button>
            <Link to={"/"}>Ir al buscador</Link>
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

        <section className="w-full flex flex-row justify-center items-center ">
          <div className={style.bodyButtons}>
            <div className={style.selectionBox}>
              <div onClick={ownerHandleShow} className={style.selection}>
                Mis propiedades
              </div>
            </div>
            <div className={style.selectionBox}>
              <Link to={"/hoteles/post"}>
                <div className={style.selection}>Publicar</div>
              </Link>
            </div>
            <div className={style.selectionBox}>
              <div className={style.selection}>Reservas</div>
            </div>
            <div className={style.selectionBox}>
              <div className={style.selection}>Suscribciones</div>
            </div>
            <div className={style.selectionBox}>
              <div className={style.selection}>Editar perfil</div>
            </div>
            <div className={style.selectionBox}>
              <div className={style.selection}> Ajustes</div>
            </div>
          </div>
        </section>

        {showOwner && dataOwner ? (
          <div className=" text-center">
            <h2>Mis propiedades</h2>
            <div className={style.bodyOwners}>
              {dataOwner.map((owner, index) => (
                <OwnerCard key={index} owner={owner} />
              ))}
            </div>
          </div>
        ) : null}

        {/* espacio para agregar la logica de los favoritos PENDIENTE PUES NEA */}
      </div>

      {err.error ? <Errors error={err} /> : null}
    </div>
  );
};

export default Dashboard;
