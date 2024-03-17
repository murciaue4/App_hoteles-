import style from "./Dashboard.module.css";
import { useContext, useEffect, useState } from "react";
import { loginContext } from "../../../context/loginContext";
import axios from "axios";
import Errors from "../alerts/Errors";
import { Link, NavLink } from "react-router-dom";
import OwnerTable from "./OwnerTable";
import ProfilePictureModal from "../forms/ProfilePictureModal";

import searchIconB from "../../../static/searchIconB-02.svg";
import propertyIcon from "../../../static/propertyIcon-10.svg";
import publishIcon from "../../../static/publishIcon-12.svg";
import reservedIcon from "../../../static/ReservasIcon-13.svg";
import subsIcon from "../../../static/MembershipIcon-11.svg";
import editIcon from "../../../static/editIcon-02.svg";
import ajustesIcon from "../../../static/AjustesIcon-03.svg";
import userIcon from "../../../static/userIconBold-06.svg";
import editIconLight from "../../../static/editIconLight-15.svg";

const Dashboard = () => {
  const { URLStatic, user, closeSession, token, imgUser } =
    useContext(loginContext);
  const [err, setErr] = useState(false);
  const [dataUser, setDtaUser] = useState();
  const [dataOwner, setDataOwner] = useState(null);
  const [showOwner, setShowOwner] = useState(false);
  const [showFavourites, setShowFavourites] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleUpload = (file) => {
    setModalIsOpen(false);
  };

  const ownerHandleShow = () => {
    setShowOwner(!showOwner);
  };
  const favouritesHandleShow = () => {
    setShowFavourites(!showFavourites);
  };

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
          `${URLStatic}user/users/${user.id}`,
          config
        );
        const propiedades = await axios.get(
          `${URLStatic}user/hoteles/id_user/${user.id}`,
          config
        );

        if (!propiedades.data.body.length == 0) {
          setDataOwner(propiedades.data.body);
        }

        setDtaUser(data.data.body[0]);
      } catch (error) {
        setErr(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={style.Dashboard}>
      <section className={`w-full h-64 flex justify-center ${style.bannerBg}`}>
        <div className={style.banner}>
          <div className="flex flex-row justify-center items-center">
            <div className={style.photo}>
              <img
                className=""
                src={imgUser ? URLStatic + imgUser : userIcon}
                alt={`Imagen`}
              />
              <button className={style.button} onClick={handleOpenModal}>
                <img src={editIconLight} alt="" />
              </button>
            </div>

            <ProfilePictureModal
              isOpen={modalIsOpen}
              onClose={handleCloseModal}
              onUpload={handleUpload}
              existingImage={imgUser ? URLStatic + imgUser : userIcon}
            />
            <span className="mx-4">
              <h1>{`Hola, ${dataUser ? dataUser["name"] : "null"}`}</h1>
              <h4>{`${dataUser ? "@" + user["username"] : "null"}`}</h4>
            </span>
          </div>

          <div className={`h-full flex flex-col justify-center `}>
            <button className={style.buttonLink}>f</button>
            <button className={style.buttonLink}>X</button>
          </div>
        </div>
      </section>

      <div className={style.body}>
        <div className={style.bodySearchButton}>
          <Link to={"/"}>
            <button>
              <img src={searchIconB} alt="searchIconB" className="h-10" />
              <span>Buscar hoteles</span>
            </button>
          </Link>
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
                <img src={propertyIcon} alt="" />
                Mis propiedades
              </div>
            </div>
            <div className={style.selectionBox}>
              <Link to={"/hoteles/post"}>
                <div className={style.selection}>
                  <img src={publishIcon} alt="" />
                  Publicar
                </div>
              </Link>
            </div>
            <div className={style.selectionBox}>
              <div className={style.selection}>
                <img src={reservedIcon} alt="" />
                Reservas
              </div>
            </div>
            <div className={style.selectionBox}>
              <div className={style.selection}>
                <img src={subsIcon} alt="" />
                Suscribciones
              </div>
            </div>
            <div className={style.selectionBox}>
              <div className={style.selection}>
                <img src={editIcon} alt="" />
                Editar perfil
              </div>
            </div>
            <div className={style.selectionBox}>
              <div className={style.selection}>
                <img src={ajustesIcon} alt="" /> Ajustes
              </div>
            </div>
          </div>
        </section>

        <div className="text-center w-full mt-10">
          {showOwner && dataOwner ? (
            <div>
              <div className=" flex justify-between items-baseline rounded-t-md  ">
                <h2 className="text-3xl font-bold mb-2 pl-1">
                  Lista de propiedades
                </h2>
                <button
                  className="border h-7 w-7 rounded-md flex justify-center items-center text-2xl text-white font-semibold bg-red-600 "
                  onClick={ownerHandleShow}
                >
                  <p>X</p>
                </button>
              </div>
              <div className={style.bodyOwners}>
                <OwnerTable owners={dataOwner} />
              </div>
            </div>
          ) : null}
        </div>

        {/* espacio para agregar la logica de los favoritos PENDIENTE PUES NEA */}
      </div>

      {err.error ? <Errors error={err} /> : null}
    </div>
  );
};

export default Dashboard;
