import React from "react";
import airIcon from '../../../static/aire-acondicionado-icon.svg';
import showerIcon from '../../../static/bañoP-icon.svg';
import washerIcon from '../../../static/lavanderia-icon.svg';
import parkingIcon from '../../../static/parking-icon.svg';
import restauranIcon from '../../../static/restaurant-icon.svg';
import wifiIcon from '../../../static/Wifi-Icon.svg';

const InfoDetails = ({ hotel }) => {
  return (
    <div className="flex justify-center w-full  h-auto">
      <div className="w-full h-full">
        <section className="DESCRIPCION  w-full h-full p-3">
          <h1>{hotel.name}</h1>
          <div>
            <p className=" text-justify">{hotel.description}</p>
          </div>
        </section>
        <section className="SERVICIOS flex flex-col w-full p-3">
          <h1>Servicios principales</h1>
          <div className="bloque-de-servicios flex justify-around w-full mt-4 ">
            <div className="bloque-de-servicios-1 flex flex-col">
              <span className="flex mb-3 items-center"> <img className="h-5 mr-2" src={airIcon} alt="" />Aire acondicionado</span>
              <span className="flex mb-3 items-center" > <img className="h-5 mr-2" src={showerIcon} alt="" />Baño privado</span>
              <span className="flex mb-3 items-center"> <img className="h-5 mr-2" src={washerIcon} alt="" />Lavanderia</span>
            </div>
            <div className="bloque-de-servicios-2 flex flex-col">
              <span className="flex mb-3 items-center"><img className="h-5 mr-2" src={parkingIcon} alt="" />Parqueadero</span>
              <span className="flex mb-3 items-center"><img className="h-5 mr-2" src={restauranIcon} alt="" />Restaurante</span>
              <span className="flex mb-3 items-center"><img className="h-5 mr-2" src={wifiIcon} alt="" />Wi-Fi gratis</span>
            </div>
          </div>
        </section>
        <section className="UBICACION w-full ">
          <h1 className="p-3">Ubicación</h1>
          <div className="bloque-mmapa w-full ">
            <div className="mapContainer w-full h-60 bg-emerald-100"></div>
          </div>
        </section>
        <section className="HORARIOS-Y-CONTACTO p-3">
          <div className="flex flex-col mb-6">
            <strong className="mb-2">Horarios de atención</strong>
            <span>Llegada: 15:00 Salida: 12:00</span>
          </div>
          <div className="flex flex-col mb-6">
            <strong className="mb-2">Contacto</strong>
            <span>
              Ejemplo: Avenida El Malecón Carrera 1 No. 5 - 82, Bocagrande,
              130015, Cartagena, Colombia Teléfono: +57 56657527 | Fax: +57
              56657559 | Página web oficial del hotel
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default InfoDetails;
