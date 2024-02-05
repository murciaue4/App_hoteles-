import React from 'react';
import styles from './CardHotel.module.css';

const HotelCard = ({ hotel }) => {
    const { name, description, precio_por_habitacion, img } = hotel;
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
    <div className={styles.hotelCard}>
      <img src={`http://localhost:3333/${img[0]}`} alt={`${name} - Imagen`} className={styles.hotelImg} />
      <div className={styles.hotelDetails}>
        <h2 className={styles.hotelName}>{name}</h2>
        <p className={styles.hotelDescription}>{acortarTexto(description, 25, true)}</p>
        <p className={styles.hotelPrice}>Precio por noche: ${precio_por_habitacion}</p>
        <button className={styles.bookNowBtn}>Reservar ahora</button>
      </div>
    </div>
  );
};

export default HotelCard;