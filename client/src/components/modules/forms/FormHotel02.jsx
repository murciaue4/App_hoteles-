import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { loginContext } from "../../../context/loginContext";
import style from "./FormHotel02.module.css";
import Errors from "../alerts/Errors";

const AddHotelForm02 = (props) => {
  let idInserted = props.idInserted;
  console.log(props.idInserted);
  const [err, setErr] = useState({});
  const { token, user } = useContext(loginContext);
  const [formData, setFormData] = useState(new FormData());
  const [formData02, setFormData02] = useState({ description: "" });
  const [isLoaded, setIsLoaded] = useState(false);
  const handleSetErr = (err) => {
    setErr(err);
    setTimeout(() => {
      setErr({});
    }, 2000);
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    formData.append("image", file);

    setIsLoaded(true);
  };

  const sendImage = (e) => {
    e.preventDefault();
    const sendData = async (data) => {
      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        };
        const response = await axios.post(
          `http://localhost:3333/user/upload/${props.idInserted}/${user.id}`,
          data,
          config
        );
        setIsLoaded(false); // Limpia formData después de enviar
        console.log("response de axios en FormHotel02", response);
      } catch (error) {
        handleSetErr(error.response.data);
      }
    };
    sendData(formData);
  };

  const handleChangeForms = (e) => {
    const { value } = e.target;
    setFormData02({ id: idInserted, description: value });
  };

  const sendUpData = async (e) => {
    e.preventDefault();
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(formData02),
    };

    try {
      const response = await fetch(
        `http://localhost:3333/user/hoteles/${idInserted}/${user.id}`,
        config
      );
      const data = await response.json();

      console.log("Respuesta de fetch en FormHotel02:", data);
      if (response.status === 200 && !data.error) {
        window.location.reload();
      }
    } catch (error) {
      handleSetErr(error.message || "Error en la solicitud.");
    }
  };

  return (
    <div className="w-full h-full grid place-items-center">
      <div className="shadow-md max-w-sm p-8 rounded-lg w-full border border-black ">
        <h1 className="text-xl font-semibold mb-4 text-center">
          PUBLICA TU HOTEL
        </h1>
        <form onSubmit={sendImage} className="w-full flex flex-col">
          <p className="mb-4">
            <b> Agrega imágenes de tu hotel</b> 
            <br />(
            <i>
              Recuerda publicar imágenes de buena calidad y que correspondan al
              inmueble que estás publicando
            </i>{" "}
            )
          </p>
          <label
            className={`${
              isLoaded ? "border-green-500" : "border-gray-700"
            } border-dashed border-4 rounded-lg p-1 cursor-pointer w-full h-20 grid content-center text-center`}
          >
            + Seleccionar una imagen
            <input
              className="hidden"
              type="file"
              name="image"
              onChange={handleChangeImage}
            />
          </label>
          <div className="mb-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
              onClick={sendImage}
            >
              Subir imagen
            </button>
          </div>
          <span className="mb-4">
            <b>*</b> Si quieres agregar una nueva imagen pulsa nuevamente el
            icono de arriba
          </span>
          <br />
        </form>
        <form onSubmit={sendUpData}>
          <label className="font-semibold mb-2 text-lg">Descripcion:</label>
          <br />
          <i>
            (Escribe una descripción detallada de tu hotel, las personas verán
            esto en los resultados de sus búsquedas, por favor utiliza bien este
            espacio).
          </i>
          <br />
          <textarea
            className="outline-none border border-gray-500 font-normal h-40 w-full p-2 rounded-lg mb-2"
            name="description"
            value={formData02.description}
            onChange={handleChangeForms}
            required
          />
          <span className="w-80">{formData02.description.length}/500</span>
          <br />
          <div className="mb-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
              type="submit"
            >
              Finalizar
            </button>
          </div>
        </form>
      </div>
      {err.error ? <Errors error={err.body} /> : null}
    </div>
  );
};

export default AddHotelForm02;
