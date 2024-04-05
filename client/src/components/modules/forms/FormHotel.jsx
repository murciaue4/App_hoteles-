import React from "react";
import locationIcon from "../../../static/locationIcon.svg";
import searchLocationIcon from "../../../static/location-svgrepo-com.svg";

const LocationsHotelForm = () => {
  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-3xl text-center">
        ¿Dónde está ubicada su propiedad?
      </h1>
      <span className="text-md font-normal mb-4 text-center">
        Indica la ubicación exacta de tu propiedad para que tus clientes puedan
        encontrarte de forma rápida y precisa.
      </span>

      <div className="border-2 h-10 w-full max-w-[600px] mb-5 flex">
        <img className="w-6 h-6 mx-3 my-auto " src={locationIcon} alt="" />
        <input
          type="search"
          placeholder="Ej: Caserio El Porvenir, Rubiales"
          className=" border-r-2 w-full  outline-none text-xl"
        />
        <img
          className="w-6 h-6 mx-3 my-auto"
          src={searchLocationIcon}
          alt=""
          title="Encontrar mi ubicacion"
        />
      </div>

      <div className="w-full flex justify-center">
        <button className="border-2 h-10 w-full max-w-[600px] mb-5 flex justify-center items-center bg-blue-700 text-white font-semibold">
          Siguiente
        </button>
      </div>
      <span className=" text-xs text-center">
        {" "}
        Para aprovechar al máximo tu experiencia, te recomendamos{" "}
        <strong>activar la función de ubicación en tu dispositivo</strong>. Esto
        nos ayudará a brindarte servicios personalizados y optimizados para tu
        área local. No te preocupes, tu privacidad es nuestra prioridad, y la
        información de ubicación se utiliza únicamente para mejorar tu
        experiencia y la de tus clientes en nuestro sitio.
      </span>
    </div>
  );
};

export default LocationsHotelForm;
