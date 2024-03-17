import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { loginContext } from "../../../context/loginContext";
import rotateICon from "../../../static/rotateIcon-16.svg";
import zoomInIcon from "../../../static/zoomIn-18.svg";
import zoomOutICon from "../../../static/zoomOut-17.svg";

const ProfilePictureModal = ({ isOpen, onClose, onUpload, existingImage }) => {
  const { token, user, imageChanged, setImageChanged } =
    useContext(loginContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    if (existingImage) {
      setImagePreview(existingImage);
    }
  }, [existingImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleRotate = () => {
    setRotationAngle((prevAngle) => prevAngle + 90);
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom + 0.1);
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => (prevZoom > 0.2 ? prevZoom - 0.1 : prevZoom));
  };

  const handleClear = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setRotationAngle(0);
    setZoomLevel(1);
  };

  const sendImage = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      console.error("No se ha seleccionado ninguna imagen.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      };

      const response = await axios.post(
        `http://localhost:3333/user/post_imguser/${user.id}`,
        formData,
        config
      );
      onUpload(selectedImage);
    } catch (error) {
      console.error("Error en la carga de la imagen:", error);
    } finally {
      setImageChanged(!imageChanged);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal fixed inset-0 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="modal-content bg-white p-6 rounded shadow-md">
        <form
          onSubmit={sendImage}
          className="flex flex-col items-center relative "
          action=""
        >
          <span
            className="close text-2xl absolute -top-14 -right-7 cursor-pointer text-white"
            onClick={onClose}
          >
            &times;
          </span>
          <h2 className="text-lg font-semibold mb-4">
            Editar Imagen de Perfil
          </h2>
          {imagePreview && (
            <div className="">
              <div className="relative h-60 w-60 border rounded-full">
                <img
                  src={imagePreview}
                  alt="Vista previa"
                  style={{
                    transform: `rotate(${rotationAngle}deg) scale(${zoomLevel})`,
                  }}
                  className="mb-4 w-60 h-60 object-cover box-border rounded-full"
                />
              </div>
              <div className="flex justify-center h-12">
                <button type="button" onClick={handleRotate} className="mr-2">
                 <img src={rotateICon} alt="" className="w-6 h-6" />
                </button>
                <button type="button" onClick={handleZoomIn} className="mr-2">
                <img src={zoomInIcon} alt="" className="w-6 h-6" />
                </button>
                <button type="button" onClick={handleZoomOut} className="mr-2">
                <img src={zoomOutICon} alt="" className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4"
          />
          <div className="w-full flex justify-center">
            <button type="button" onClick={handleClear} className="pr-2 w-1/2 border border-blue-500 rounded-l">
              Limpiar
            </button>
            <button
              type="submit"
              className="w-1/2 bg-blue-500 text-white py-2 px-4 rounded-r hover:bg-blue-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePictureModal;
