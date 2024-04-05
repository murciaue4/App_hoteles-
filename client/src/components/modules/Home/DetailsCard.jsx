import React, { useState } from "react";
import closeIcon from "../../../static/close-icon-bold.svg";
import shareIcon from "../../../static/share-icon.svg";
import InfoDetails from "./InfoDetails";
import PhotosDetails from "./PhotosDetails";
import ComentsDetails from "./ComentsDetails";

const DetailCard = ({ onClose, hotel }) => {
  const [showInfo, setShowInfo] = useState(true);
  const [showPhotos, setShowPhotos] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleShowInfo = () => {
    setShowInfo(true);
    setShowPhotos(false);
    setShowComments(false);
  };

  const handleShowPhotos = () => {
    setShowPhotos(true);
    setShowInfo(false);
    setShowComments(false);
  };

  const handleShowComments = () => {
    setShowComments(true);
    setShowInfo(false);
    setShowPhotos(false);
  };
  return (
    <div className=" flex justify-center w-full max-w-screen-lg h-auto mb-4 rounded-b-2xl">
      <div className="w-full">
        <section className="Nav-Details h-14 bg-white flex justify-between items-center font-bold text-gray-500  px-3 text-sm">
          <div>
            <button className=" flex items-center  text-black ">
              <img className="h-4 w-4 mr-2" src={shareIcon} alt="" />
              <p className="hidden sm:block">Compartir</p>
            </button>
          </div>
          <div className="h-full">
            <button
              onClick={handleShowInfo}
              className={`${
                showInfo ? "border-b-blue-600 text-gray-700" : ""
              } px-2 h-full border-2 border-white hover:border-b-blue-600`}
            >
              Info
            </button>
            <button
              onClick={handleShowPhotos}
              className={`${
                showPhotos ? "border-b-blue-600 text-gray-700" : ""
              } px-2 h-full border-2 border-white hover:border-b-blue-600`}
            >
              Fotos
            </button>
            <button
              onClick={handleShowComments}
              className={`${
                showComments ? "border-b-blue-600 text-gray-700" : ""
              } px-2 h-full border-2 border-white hover:border-b-blue-600`}
            >
              Comentarios
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                onClose();
              }}
            >
              <img className="h-4 w-4 " src={closeIcon} alt="" />
            </button>
          </div>
        </section>
        <section className="Details-container bg-white h-auto w-full border border-t-stone-700">
          <div>
            {!showInfo ? null : <InfoDetails hotel={hotel} />}
            {!showPhotos ? null : <PhotosDetails hotel={hotel} />}
            {!showComments ? null : <ComentsDetails hotel={hotel} />}
          </div>
        </section>
        <section className="footer-details h-14 bg-white flex justify-between items-center font-bold text-gray-500  px-3 rounded-b-2xl border">
          <div>
            <button className=" flex items-center  text-black ">
              <img className="h-4 w-4 mr-2" src={shareIcon} alt="" />
              Compartir{" "}
            </button>
          </div>
          <div>
            <button
              className="border text-black border-black h-8 w-16 rounded-md"
              onClick={() => {
                onClose();
              }}
            >
              Cerrar
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetailCard;
