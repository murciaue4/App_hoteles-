import React, { useState, useContext } from 'react';
import axios from 'axios';
import { loginContext } from '../../../context/loginContext';

const ProfilePictureModal = ({ isOpen, onClose, onUpload }) => {
  const { token, user } = useContext(loginContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

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
      console.error('No se ha seleccionado ninguna imagen.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      };

      const response = await axios.post(
        `http://localhost:3333/user/post_imguser/${user.id}`,
        formData,
        config
      );

      console.log('Response de axios en SEND IMAGE PROFILE:', response);
      onUpload(selectedImage);
    } catch (error) {
      console.error('Error en la carga de la imagen:', error);
    } finally {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal fixed inset-0 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="modal-content bg-white p-6 rounded shadow-md">
        <form onSubmit={sendImage} className="flex flex-col items-center relative " action="">
          <span className="close text-2xl absolute -top-14 -right-7 cursor-pointer" onClick={onClose}>
            &times;
          </span>
          <h2 className="text-lg font-semibold mb-4">Agregar Imagen de Perfil</h2>
          {imagePreview && (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Vista previa"
                style={{
                  transform: `rotate(${rotationAngle}deg) scale(${zoomLevel})`,
                }}
                className="mb-4 max-w-full max-h-40 object-cover rounded"
              />
              <div className="absolute bottom-0 p-2">
                <button type="button" onClick={handleRotate} className="mr-2">
                  Rotar
                </button>
                <button type="button" onClick={handleZoomIn} className="mr-2">
                  Zoom In
                </button>
                <button type="button" onClick={handleZoomOut} className="mr-2">
                  Zoom Out
                </button>
              </div>
            </div>
          )}
          <input type="file" name="image" accept="image/*" onChange={handleImageChange} className="mb-4" />
          <div>
            <button type="button" onClick={handleClear} className="mr-2">
              Limpiar
            </button>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePictureModal;
