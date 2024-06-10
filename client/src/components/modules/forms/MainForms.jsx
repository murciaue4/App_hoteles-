import React from 'react';
import hotelSvg from "../../../static/hotel-svg.svg";
import houselSvg from "../../../static/house-svg.svg";
const selectTypeOfPropertyRender = ({onClose, next}) => {
  return (
    <>
        <div className="w-full h-screen bg-gray-100 p-3 " >
          <span className="w-full flex flex-col items-center justify-center">
            <h1 className="text-3xl text-center mb-3">
              {" "}
              Selecciona el tipo de propiedad de desas anunciar...
            </h1>
            <span className="text-justify">
              Registra tu propiedad y has que mas personas se hagan tus
              huespedes, unete a la red de anunciantes mas grande de tu region y
              empieza a crecer.
            </span>
          </span>
          <section className=" w-full flex max-md:flex-col justify-center items-center mt-10">
            <div className="w-60 md:h-72 rounded-lg p-3 bg-white flex flex-col justify-center items-center border shadow-lg md:mr-3 max-md:mb-4 cursor-pointer hover:scale-105" onClick={() => {
            onClose(false)
            next(true)
        }}>
              <img src={hotelSvg} className=" h-28" alt="" />
              <div className="text-center">
                <h1>Alojamiento</h1>
                <span className="text-sm">Hotel, motel o campamentos</span>
              </div>
            </div>
            <div className="w-60 md:h-72 rounded-lg p-3 bg-white flex flex-col justify-center items-center border shadow-lg md:ml-3 cursor-pointer hover:scale-105">
              <img src={houselSvg} className=" h-28 " alt="" />
              <div className="text-center">
                <h1>Arriendos</h1>
                <span className="text-sm">
                  Habitaciones, apartamentos, casas
                </span>
              </div>
            </div>
          </section>
        </div>
      </>
  );
};

export default selectTypeOfPropertyRender;