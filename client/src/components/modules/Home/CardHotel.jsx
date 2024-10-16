import React, { useContext, useState } from "react";
import FavoriteIcon from "../../../static/FavouriteIcon-03.svg";
import arrowToggleIcon from "../../../static/arrowToggle.svg";
import checkIcon from "../../../static/checkIcon.svg";
import isFavoriteIcon from "../../../static/favouriteIconRed-02.svg";
import { loginContext } from "../../../context/loginContext";
import DetailsCard from "./DetailsCard";

const HotelCard = ({ hotel }) => {
  const [showDetailsCard, setShowDetailsCard] = useState(false);
  const handleShowDetailsCard = () => {
    setShowDetailsCard(!showDetailsCard);
  };
  const { id, name, description, precio_por_habitacion, img, location, type } =
    hotel;

  const {
    isLogin,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    showAlertLogUp,
    handleSetFavouriteClick,
    handleSetShowAlert,
  } = useContext(loginContext);

  function acortarTexto(texto, longitudMaxima, agregarPuntosSuspensivos) {
    if (texto.length > longitudMaxima) {
      texto = texto.substring(0, longitudMaxima);
      if (agregarPuntosSuspensivos) {
        texto += "...";
      }
    }
    return texto;
  }

  function toCapitalCase(string) {
    return string.replace(/\b\w/g, (match) => match.toUpperCase());
  }

  function getRateColor(promedio, totalRates) {
    if (totalRates === 0) {
        return "bg-gray-300"; // Gris si no hay calificaciones
    }

    let claseColor = "";
    if (promedio >= 9.0) {
        claseColor = "bg-green-500"; // Verde para calificaciones excelentes
    } else if (promedio >= 8.0) {
        claseColor = "bg-green-400"; // Verde para calificaciones muy buenas
    } else if (promedio >= 7.0) {
        claseColor = "bg-lime-400"; // Amarillo para calificaciones buenas
    } else if (promedio >= 6.0) {
        claseColor = "bg-yellow-400"; // Naranja para calificaciones aceptables
    } else if (promedio >= 5.0) {
        claseColor = "bg-orange-500"; // Naranja para calificaciones aceptables
    } else {
        claseColor = "bg-red-500"; // Rojo para calificaciones regulares o inferiores
    }

    return claseColor;
}

  return (
    <li className={`flex flex-col items-center justify-center `}>
      <div
        className={`font-sans  w-11/12 max-w-screen-lg h-auto sm:max-h-72 flex flex-row border-none overflow-hidden border border-gray-300 shadow-md  bg-white ${
          !showDetailsCard ? "rounded-lg m-3" : "rounded-t-lg"
        }`}
      >
        <div className={`w-1/4 max-h-full `} onClick={handleShowDetailsCard}>
          <button className="w-full h-full">
            <img
              className="w-full h-full object-cover aspect-video"
              src={`http://localhost:3333/${img[0]}`}
              alt={`${name} - Imagen`}
            />
          </button>
        </div>

        <div
          className={`p-0 w-3/4 flex flex-col sm:flex-row justify-center sm:justify-around`}
          onClick={handleShowDetailsCard}
        >
          <div className="py-1 px-3 md:p-4 lg:px-12 h-full w-full  sm:w-1/2 ">
            <section className="m-0 flex justify-between cursor-pointer">
              <h1 className="m-0 font-bold ">{toCapitalCase(name)}</h1>
              <div onClick={handleSetFavouriteClick}>
                <button
                  onClick={() =>
                    isLogin && isFavorite(id)
                      ? removeFromFavorites(id)
                      : addToFavorites(id)
                  }
                >
                  <img
                    src={
                      isLogin && isFavorite(id) ? isFavoriteIcon : FavoriteIcon
                    }
                    alt="<3"
                    className={`w-7 h-7 `}
                  />
                </button>
              </div>
            </section>
            <section className="pb-2 font-semibold m-0 flex justify-between cursor-pointer">
              <h4>{toCapitalCase(type)}</h4>
            </section>
            <section className="pb-5 m-0 flex justify-between cursor-pointer">
              <h3>{toCapitalCase(location)}</h3>
              <img src={arrowToggleIcon} alt="*" className="w-4 h-4 mr-1" />
            </section>

            <section className=" pb-5 m-0 flex justify-between cursor-pointer">
              <p className=" text-sm zd">
                {acortarTexto(description, 100, true)}
              </p>
            </section>
            <section
              onClick={handleShowDetailsCard}
              className=" hidden  pb-2 m-0 sm:flex justify-between cursor-pointer hover:bg-slate-100"
            >
              <button>Ver más</button>
              <img src={arrowToggleIcon} alt="*" className="w-4 h-4 mr-1" />
            </section>
          </div>

          <div className="flex flex-row sm:flex-col justify-between py-2 px-3 w-full sm:w-1/2 h-full bg-slate-100 sm:bg-white">
            <div className="flex justify-between mb-2 bg-slate-100 rounded-xl h-full">
              <section className="w-full md:w-1/2 p-1 flex flex-col">
                <div className={`h-10 w-full md:w-10 grid place-items-center font-bold rounded-lg border ${getRateColor(hotel.rating.promedio, hotel.rating.totalRates)} `}>
                  {hotel.rating.promedio > 9.9
                ? hotel.rating.promedio.toFixed(0)
                : hotel.rating.promedio.toFixed(1)}
                </div>
                <div className="flex flex-col text-sm ml-1 w-full">
                  <span>
                    <p className="font-semibold hidden sm:block">{'Basado en'}</p>
                  </span>
                  <span className="flex text-center">{hotel.rating.totalRates}   Opiniones</span>
                </div>
              </section>
              <section className="w-1/2 p-1 hidden md:block">
                <div className=" flex flex-col w-full  text-sm ">
                  {hotel.wifi ? (
                    <span className="flex">
                      <img
                        className="h-4 w-4 mr-1 grid place-items-baseline"
                        src={checkIcon}
                        alt=""
                      />
                      Wi-Fi gratis
                    </span>
                  ) : null}
                  {hotel.lavanderia ? (
                    <span className="flex">
                      <img
                        className="h-4 w-4 mr-1 grid place-items-baseline"
                        src={checkIcon}
                        alt=""
                      />
                      Lavanderia
                    </span>
                  ) : null}
                  {hotel.restaurant ? (
                    <span className="flex">
                      <img
                        className="h-4 w-4 mr-1 grid place-items-baseline"
                        src={checkIcon}
                        alt=""
                      />
                      Restaurante
                    </span>
                  ) : null}
                  {hotel.aire_acondicionado ? (
                    <span className="flex">
                      <img
                        className="h-4 w-4 mr-1 grid place-items-baseline"
                        src={checkIcon}
                        alt=""
                      />
                      Aire acondicionado
                    </span>
                  ) : null}
                  {hotel.parqueadero ? (
                    <span className="flex">
                      <img
                        className="h-4 w-4 mr-1 grid place-items-baseline"
                        src={checkIcon}
                        alt=""
                      />
                      Parqueadero
                    </span>
                  ) : null}
                </div>
              </section>
            </div>
            <div className=" flex flex-row justify-between items-center bg-slate-100 rounded-xl h-auto">
              <p className=" px-1 text-sm text-gray-700 mb-2 text-end flex flex-col w-1/2 pr-2 ">
                $ COP{" "}
                <strong className="text-xl ">{precio_por_habitacion}</strong>
              </p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded-xl sm:rounded-r-xl w-1/2 h-full flex justify-center">
                Reservar ahora
              </button>
            </div>
          </div>
        </div>
      </div>
      {!showDetailsCard ? null : (
        <div className="w-11/12 max-w-screen-lg flex justify-center">
          <DetailsCard onClose={handleShowDetailsCard} hotel={hotel} />
        </div>
      )}
    </li>
  );
};

export default HotelCard;
