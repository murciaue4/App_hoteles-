import React from "react";
import styles from "./CardHotel.module.css";
import FavoriteIcon from "../../../static/FavouriteIcon-03.svg";

const HotelCard = ({ hotel }) => {
  const { name, description, precio_por_habitacion, img, location, type } =
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
  return (
    <li className="flex justify-center">
      <div className={styles.hotelCard}>
        <div className={styles.imgDiv}>
          <button>
            <span>
              <img
                className={styles.hotelImg}
                src={`http://localhost:3333/${img[0]}`}
                alt={`${name} - Imagen`}
              />
            </span>
          </button>
        </div>

        <div className={styles.hotelDetails}>
          <div className={styles.hotelDetailsLeft}>
            <section>
              <h1 className={styles.hotelName}>{name}</h1>
              <div>
                <button>
               <img src={FavoriteIcon} alt="<3" className="w-7 h-7" />
                </button>
              </div>
            </section>
            <h4>{type}</h4>
            <h3>{location}</h3>
            <p className={styles.hotelDescription}>
              {!description?('sin descripcion'):
                acortarTexto(description, 20, true)
              }
            </p>
            <button>Ver detalles</button>
          </div>
          <div className={styles.hotelDetailsRight}>
            <p className={styles.hotelPrice}>
              Precio por noche: ${precio_por_habitacion}
            </p>
            <button className={styles.bookNowBtn}>Reservar ahora</button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default HotelCard;
