import React from "react";
import styles from "./CardHotel.module.css";

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
    <li>
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
                <svg
                  className="w-4 h-4"
                  id="Capa_1"
                  data-name="Capa 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100.57 83.29"
                >
                  <defs></defs>
                  <path
                    d="M56.21,96.8,93.64,59.37c5.47-5.47-3-14-8.48-8.49L47.72,88.32c-5.47,5.47,3,14,8.49,8.48Z"
                    transform="translate(0.26 -15.28)"
                  />
                  <path
                    d="M56.21,88.32,14.6,46.71c-5.47-5.46-13.95,3-8.48,8.49l41.6,41.6c5.47,5.47,14-3,8.49-8.48Z"
                    transform="translate(0.26 -15.28)"
                  />
                  <path
                    d="M59,40.17c-.67-15.43-15.1-24.89-29.63-24.89-14,0-29.62,9.47-29.62,24.89S15.35,65.05,29.36,65.05c14.53,0,29-9.45,29.63-24.88.41-9.66-14.59-9.64-15,0-.58,13.34-29.25,13.33-29.25,0s28.67-13.35,29.25,0C44.4,49.78,59.4,49.83,59,40.17Z"
                    transform="translate(0.26 -15.28)"
                  />
                  <path
                    d="M100.3,43.83C99.64,28.4,85.21,18.94,70.68,18.94c-14,0-29.62,9.47-29.62,24.89S56.67,68.72,70.68,68.72c14.53,0,29-9.46,29.62-24.89.42-9.65-14.58-9.63-15,0-.57,13.35-29.24,13.34-29.24,0s28.67-13.35,29.24,0C85.72,53.45,100.72,53.5,100.3,43.83Z"
                    transform="translate(0.26 -15.28)"
                  />
                  <path
                    d="M33.25,34.74l-1.15.52,3.78-1c-1.81.18-3.85-1.78-5.56-2.54-2.94-1.31-5.81-1.32-9-1.51l3.79,1-.34-.28,2.2,5.3,0-1.11-1,3.78c-2.5,3.38-1.26.73-.22,1.16.62.26,1.69.06,2.4.27,1.14.34,3.18,1.2,3.09,2.62l1-3.78c2.05-1.23,2.31-1.61.76-1.16a28.67,28.67,0,0,1-3.34.1,13.06,13.06,0,0,1-3-.34q-3-1.29-.61,1v4l.25-1.07L21.05,47c10.38-1.46,20.79,2.9,30.93,4.38A18.33,18.33,0,0,0,65.85,48.4c1.72-1.17,2.85-1.95,5-2.11.94-.07,9.73.81,5.2-4-.4-.42-3.14-.8-3.83-1a33.56,33.56,0,0,0-5.6-1.73c-4.75-.84-9.63.79-12.2,5-2.45,4-2.59,9-2.27,13.62.13,1.92,1.89,11.57-.71,12.13h4c-3-.43-12.69-3.67-11-7.91L41,66.92c-1.52.8,0-.75.38.33.16.49.83.55.88,1.28a7.74,7.74,0,0,0,5.5,7.24A16.23,16.23,0,0,0,55,76c4-.56,6.23-5.69,5.24-9.23C59,62.44,55.07,61,51,61.52l-1.67.24h4l-1.62-.46,5.51,7.23c-.43-7.14-4.76-13.54-11.8-15.75C37.55,50.29,28.87,54.27,29,63.35c.14,8.27,6.23,14.71,13.32,18.13C49.61,85,57.18,87.08,63.09,80c5.5-6.59,4.41-14.79,4-22.7,0,0,0-5.48.26-5.38L65.6,53.1q-3,1.08-1,1.37c.53.55,2.1.72,2.87,1,3.39,1.25,6.74,2.17,10.38,1.68,7.39-1,13.31-7.56,11.26-15.25-2.19-8.22-10.65-11-18.31-10.62A22.47,22.47,0,0,0,58.9,35c-1.71,1.13-2.51,1.82-4.56,1.61A64.09,64.09,0,0,1,47,35.11C36.89,32.89,27.36,31,17.06,32.49c-2.41.34-4.71,3-5.24,5.23-3.19,13.82,15,16.8,24.82,14.83,6-1.2,10.37-5.93,9.53-12.24-.7-5.29-4.85-9.91-9.33-12.48-7.5-4.31-25-4.2-24.86,7.84a9.62,9.62,0,0,0,4.48,8c2.59,1.7,5.11.85,7.77,1.72,2.47.81,4.46,2.87,7.1,3.55,3.41.88,6.37.21,9.49-1.21,3.72-1.68,4.55-7,2.69-10.26-2.17-3.82-6.59-4.35-10.26-2.69Z"
                    transform="translate(0.26 -15.28)"
                  />
                </svg>
                </button>
              </div>
            </section>
            <h4>{type}</h4>
            <h3>{location}</h3>
            <p className={styles.hotelDescription}>
              {acortarTexto(description, 50, true)}
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
