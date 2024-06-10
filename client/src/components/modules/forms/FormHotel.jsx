import React, { useState } from "react";
import locationIcon from "../../../static/locationIcon.svg";
import searchLocationIcon from "../../../static/location-svgrepo-com.svg";
import AutocompleteClassic from "../Maps/autocomplete/AutocompleteClassic";
import Mapa from "../Maps/ModuleMap";
import MapHandler from "../Maps/autocomplete/MapHandler";
import Alert from "../alerts/AlertStandard";

const LocationsHotelForm = ({ onClose, next, handleChangeForms }) => {
  const [capturedChoords, setCapturedChoords] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };
  console.log(capturedChoords);
  return (
    <div className=" flex flex-col items-center w-full border">
      <h1 className="text-3xl text-center">
        ¿Dónde está ubicada su propiedad?
      </h1>
      <span className="text-md font-normal mb-4 text-center w-11/12 max-w-[600px]">
        Indica la ubicación exacta de tu propiedad para que tus clientes puedan
        encontrarte de forma rápida y precisa.
      </span>

      <div className="border-2 h-auto  w-11/12 max-w-[500px] mb-5 flex justify-between">
        <img className="w-1/12 h-5 mx-2 my-auto " src={locationIcon} alt="" />
        {/* <input
          type="search"
          placeholder="Ej: Caserio El Porvenir, Rubiales"
          className=" border-r-2 w-full  outline-none text-xl"
        /> */}
        <div className="w-10/12">
          <AutocompleteClassic onPlaceSelect={setSelectedPlace} />
        </div>
        <img
          className="w-1/12 h-5 mx-3 my-auto"
          src={searchLocationIcon}
          alt=""
          title="Encontrar mi ubicacion"
        />
      </div>
      {selectedPlace && (
        <div>
          <Mapa
            defaultCenter={{
              lat: selectedPlace.geometry.location.lat(),
              lng: selectedPlace.geometry.location.lng(),
            }}
            capturedChoords={setCapturedChoords}
            onPlaceSelected={setSelectedPlace}
          ></Mapa>
        </div>
      )}
      <div className="w-full flex justify-center">
        <button
          className={`border-2 h-9 w-11/12 max-w-[500px] mb-5 flex justify-center items-center  ${
            capturedChoords ? "bg-blue-700" : "bg-blue-200"
          } text-white font-semibold`}
          onClick={() => {
            if (selectedPlace === null) {
              return;
            }
            if (!capturedChoords) {
              handleShowAlert();
            } else {
              handleChangeForms({ choords: capturedChoords });
              onClose(false);
              next(true);
            }
          }}
        >
          Siguiente
        </button>
      </div>
      <span className=" text-xs text-center w-11/12 max-w-[600px]">
        {" "}
        Para aprovechar al máximo tu experiencia, te recomendamos{" "}
        <strong>activar la función de ubicación en tu dispositivo</strong>. Esto
        nos ayudará a brindarte servicios personalizados y optimizados para tu
        área local. No te preocupes, tu privacidad es nuestra prioridad, y la
        información de ubicación se utiliza únicamente para mejorar tu
        experiencia y la de tus clientes en nuestro sitio.
      </span>
      {showAlert && <Alert AlertString={"Confirma tu Ubicación"} />}
    </div>
  );
};

export default LocationsHotelForm;
