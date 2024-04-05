import React, { useEffect, useState } from "react";
import arrowBackIcon from "../../../static/Arrow-Back-Icon.svg";
import arrowNextIcon from "../../../static/Arrow-Next-Icon.svg";

const PhotosDetails = ({ hotel }) => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setImages(hotel.img);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-full flex flex-row justify-between p-3">
      <button className="w-1/12 flex justify-center items-center" onClick={prevSlide}>
        <img className="h-9 w-9 border rounded-full shadow-lg p-1" src={arrowBackIcon} alt="" />
      </button>
      <div className="w-9/12 h-96 object-fill">
        {images.length > 0 && (
          <img
            className="object-contain w-full h-full"
            src={`http://localhost:3333/${images[currentIndex]}`}
            alt={`Imagen ${currentIndex + 1}`}
          />
        )}
      </div>
      <button className="w-1/12 flex justify-center items-center" onClick={nextSlide}>
        <img className="h-9 w-9 border rounded-full shadow-lg p-1" src={arrowNextIcon} alt="" />
      </button>
    </div>
  );
};

export default PhotosDetails;
