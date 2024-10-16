import React, { useContext, useState } from "react";
import axios from "axios";
import { loginContext } from "../../../context/loginContext";
import Errors from "../alerts/Errors";

const AddHotelForm02 = (props) => {
  const [err, setErr] = useState({});
  const { token, user } = useContext(loginContext);
  const [formData, setFormData] = useState(new FormData());
  const [formData02, setFormData02] = useState({ description: "" });
  const [isLoaded, setIsLoaded] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleSetErr = (err) => {
    setErr(err);
    setTimeout(() => {
      setErr({});
    }, 2000);
  };

  const handleChangeImage = (e) => {
    const files = e.target.files;
    const previews = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      formData.append(`image`, file); // Append each file to the 'images[]' array
      previews.push(URL.createObjectURL(file)); // Create a preview URL for each file
    }

    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]); // Add new previews to existing previews
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
        setImagePreviews([]); // Clear image previews
        console.log("response de axios en FormHotel02", response);
      } catch (error) {
        handleSetErr(error.response.data);
      }
    };
    sendData(formData);
  };

  const handleChangeForms = (e) => {
    const { value } = e.target;
    setFormData02({ id: props.idInserted, description: value });
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
        `http://localhost:3333/user/hoteles/${props.idInserted}/${user.id}`,
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
      <div className="shadow-md min-w-sm p-8 rounded-lg max-w-5xl border border-black ">
        <form onSubmit={sendImage} className="w-full flex flex-col">
          <p className="mb-4">
            <b className="text-3xl"> Agrega imágenes de tu hotel</b> 
            <br />(
            <i className="text-xl">
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
              multiple // Allow multiple file selection
            />
          </label>
          <div className="flex flex-wrap mb-4">
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`preview ${index + 1}`}
                className="h-20 w-20 object-cover m-2"
              />
            ))}
          </div>
          <div className="mb-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
              type="submit"
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
          <label className="font-semibold mb-2 text-lg">Descripción:</label>
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
