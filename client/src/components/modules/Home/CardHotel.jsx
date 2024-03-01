import React from "react";
import styles from "./CardHotel.module.css";
import FavoriteIcon from "../../../static/FavouriteIcon-03.svg";
import arrowToggleIcon from "../../../static/arrowToggle.svg";
import checkIcon from "../../../static/checkIcon.svg";

const HotelCard = ({ hotel }) => {
  const  { name, description, precio_por_habitacion, img, location, type } =
    hotel;
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

  return (
    <li className="flex justify-center">
      <div className={styles.hotelCard}>
        <div className={styles.imgDiv}>
          <button>
            <img
              className={styles.hotelImg}
              src={`http://localhost:3333/${img[0]}`}
              alt={`${name} - Imagen`}
            />
          </button>
        </div>

        <div className={styles.hotelDetails}>
          <div className={styles.hotelDetailsLeft}>
            <section>
              <h1 className={styles.hotelName}>{toCapitalCase(name)}</h1>
              <div>
                <button>
                  <img src={FavoriteIcon} alt="<3" className="w-7 h-7" />
                </button>
              </div>
            </section>
            <section className="pb-5">
              <h3>{location}</h3>
              <img src={arrowToggleIcon} alt="*" className="w-4 h-4 mr-1" />
            </section>
            <section className="pb-2 font-bold">
              <h4>{toCapitalCase(type)}</h4>
            </section>
            <section className=" pb-5">
              <p className=" text-sm zd">
                {acortarTexto(description, 150, true)}
              </p>
            </section>
            <section className="pb-2">
              <button>Ver detalles</button>
              <img src={arrowToggleIcon} alt="*" className="w-4 h-4 mr-1" />
            </section>
          </div>

          <div className={styles.hotelDetailsRight}>
            <div className="h-2/3 flex justify-between">
              <section className="w-1/2 p-1 flex">
                <div className="h-10 w-10 grid place-items-center font-bold rounded-md border bg-green-700 ">8.2</div>
                <div className="flex flex-col text-sm ml-1">
                <span><strong>Excelente</strong></span>
                <span>{99} Opiniones</span>
                </div>
                
              </section>
              <section className="w-1/2 p-1">
                <div className=" flex flex-col h-full w-full border text-sm  ">
                  {hotel.wifi?<span className="flex"><img className="h-4 w-4 mr-1 grid place-items-baseline" src={checkIcon} alt="" />Wi-Fi gratis</span>:null}
                  {hotel.lavanderia?<span className="flex"><img className="h-4 w-4 mr-1 grid place-items-baseline" src={checkIcon} alt="" />Lavanderia</span>:null}
                  {hotel.restaurant?<span className="flex"><img className="h-4 w-4 mr-1 grid place-items-baseline" src={checkIcon} alt="" />Restaurante</span>:null}
                  {hotel.aire_acondicionado?<span className="flex"><img className="h-4 w-4 mr-1 grid place-items-baseline" src={checkIcon} alt="" />Aire acondicionado</span>:null}
                  {hotel.parqueadero?<span className="flex"><img className="h-4 w-4 mr-1 grid place-items-baseline" src={checkIcon} alt="" />Parqueadero</span>:null}
                  
                  
                  
                </div>
              </section>
            </div>
            <div className=" flex justify-between pl-4">
              <p className={styles.hotelPrice}>
               $ COP <strong className=" text-3xl"> {precio_por_habitacion}</strong>
              </p>
              <button className={styles.bookNowBtn}>Reservar ahora</button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default HotelCard;
