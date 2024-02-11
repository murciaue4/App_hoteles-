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
  console.log("vgsdfsdf: ", formData02);
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
          `http://localhost:3333/user/upload/${props.idInserted}`,
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
    console.log("formData02 en el front: ", formData02);
  };

  const sendUpData = async (e) => {
    e.preventDefault();

    console.log("formData02 antes de enviar:", formData02);

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
        `http://localhost:3333/user/hoteles/${idInserted}`,
        config
      );
      const data = await response.json();

      console.log("Respuesta de fetch en FormHotel02:", data);
    } catch (error) {
      handleSetErr(error.message || "Error en la solicitud.");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.formHotel}>
        <h1>PUBLICA TU HOTEL</h1>
        <br />

        <form onSubmit={sendImage}>
          <p>
            <b> Agrega imagenes de tu hotel</b> ({" "}
            <i>
              Recuerda publicar imagenes de buena calidad y que correspondan al
              inmueble que estas publicando
            </i>{" "}
            )
          </p>

          <br />
          <label className={isLoaded ? style.label : style.label2}>
            + Selecionar una imagen
            <input
              className={style.input}
              type="file"
              name="image"
              onChange={handleChangeImage}
            />
          </label>
          <div className={style.divButton}>
            <button onClick={sendImage}>Subir imagen</button>
          </div>
          <span>
            <b>*</b> Si quieres agregar una nueva imagen pulsa nuevamente el
            icono de arriba
          </span>
          <br />
        </form>
        <form onSubmit={sendUpData}>
          <label className={style.descLabel}>Descripcion:</label>
          <span>
            (Escribe una descripcion detallada de tu hotel, las personas
            veran esto en los resultados de sus busquedas, por favor utiliza
            bien este espacio).
          </span>
          <br />
          <textarea
            className={style.descInput}
            name="description"
            value={formData02.description}
            onChange={handleChangeForms}
            required
          />
          <span className="w-80">{formData02.description.length}/500</span>
          
          <br />
          <div className={style.divButton}>
            <button type="submit">Finalizar</button>
          </div>
        </form>
      </div>
      {err.error ? <Errors error={err.body} /> : null}
    </div>
  );
};

export default AddHotelForm02;
