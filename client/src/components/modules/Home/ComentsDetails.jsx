import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { loginContext } from "../../../context/loginContext";
import AlertLogUp from "../alerts/AlertLogUp";

const ComentsDetails = ({ hotel }) => {
  const [comments, setComments] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [newComent, setNewComent] = useState("");
  const [newRate, setNewRate] = useState(0);
  const [selectedRate, setSelectedRate] = useState(null);
  const [showAlertLogUp, setShowAlertLogUp] = useState(false);
  const [commentSent, setCommentSent] = useState(false);
  const { user, URLStatic, token, isLogin } = useContext(loginContext);

  const handleSetNewRate = (value) => {
    setNewRate(value);
    setSelectedRate(value);
  };

  const handleShowAlertLogUp = () => {
    setShowAlertLogUp(!showAlertLogUp);
  };

  const handleNewComment = (e) => {
    setNewComent(e.target.value);
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${URLStatic}user/hoteles/${hotel.id}/comments`
      );
      setComments(response.data.body);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  const fetchRatings = async () => {
    try {
      const response = await axios.get(
        `${URLStatic}user/hoteles/${hotel.id}/ratings`
      );
      const ratingsArray = response.data.body.map(
        (rating) => rating.rating_value
      );
      const totalRatings = ratingsArray.length;
      const sumRatings = await ratingsArray.reduce((acc, curr) => acc + curr, 0);
      const average = totalRatings > 0 ? sumRatings / totalRatings : 0;
      setAverageRating(average);
      setTotalRatings(totalRatings);
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };

  useEffect(() => {
    Promise.all(fetchComments(), fetchRatings());
  }, [hotel.id]);




  const handleSendNewComent = async () => {
    if (newComent.length === 0 || newRate === 0) {
      alert("Por favor, proporciona tanto un comentario como una calificación");
      return;
    }
  
    const commentToSend = {
      user: user.username,
      comment_text: newComent,
    };
  
    const rateToSend = {
      user: user.username,
      rating_value: newRate,
    };
  
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      };
  
      await axios.post(
        `${URLStatic}user/hoteles/${hotel.id}/comments/${user.id}`,
        commentToSend,
        config
      );
  
      await axios.post(
        `${URLStatic}user/hoteles/${hotel.id}/ratings/${user.id}`,
        rateToSend,
        config
      );
      // Actualizar comentarios y calificaciones después de enviar el nuevo comentario
      fetchComments(), 
      fetchRatings()
      // Limpiar campos de entrada después de enviar el comentario
      setNewComent("");
      setNewRate(0);
    } catch (error) {
      console.error("Error al enviar tu opinión:", error);
    }
  };

 

  const getLegibleDate = (timeStamp) => {
    const fechaUTC = new Date(timeStamp);
    const horaLocal = fechaUTC.toLocaleTimeString(undefined, { hour12: true });
    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const dia = fechaUTC.getDate();
    const mes = meses[fechaUTC.getMonth()];
    const año = fechaUTC.getFullYear();

    return (
      <div className=" text-[11px] flex flex-col items-end  ">
        <p>{`${dia} de ${mes} de ${año}`}</p>
        <p>{horaLocal}</p>
      </div>
    );
  };
  const obtenerCalificacionTexto = (promedio, totalRates) => {
    if (totalRates === 0) {
      return "Sin calificar";
    }

    let calificacionTexto = "";

    if (promedio >= 9.0) {
      calificacionTexto = "Excelente";
    } else if (promedio >= 8.0) {
      calificacionTexto = "Muy bueno";
    } else if (promedio >= 7.0) {
      calificacionTexto = "Bueno";
    } else if (promedio >= 6.0) {
      calificacionTexto = "Aceptable";
    } else {
      calificacionTexto = "Regular";
    }

    return calificacionTexto;
  }

  return (
    <div className="p-3 my-9 ">
      {showAlertLogUp ? <AlertLogUp onClose={handleShowAlertLogUp} /> : null}
      <div className="flex justify-center">
        <div className=" w-11/12 mb-5">
          <h2 className="text-sm">Calificación Promedio</h2>
          <div className="flex items-baseline ">
            <p className="text-2xl mr-2 font-bold">{averageRating}</p>
            <p className="font-bold">
              {obtenerCalificacionTexto(averageRating, totalRatings)}
            </p>
          </div>
          <span className="text-xs ">
            Basado en ({totalRatings}) de opiniones de usuarios registrados
          </span>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-lg font-bold">Opiniones</h1>
        <ul className="w-full flex flex-col items-center justify-center ">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="border w-11/12 min-h-20 px-2 pb-3 rounded-lg shadow my-3"
            >
              <div className="w-full flex justify-between">
                <strong className="text-gray-500">{comment.user}</strong>
                <i>{getLegibleDate(comment.timestamp)}</i>
                {console.log(comment.timestamp)}
              </div>
              <p className="text-sm mt-2">{comment.comment_text} </p>
            </li>
          ))}
        </ul>
        <div className=" w-11/12 h-auto   rounded-lg  my-3 py-3 ">
          <textarea
            placeholder="Agregar un nuevo comentario..."
            type="text"
            className="text-md border border-gray-400 rounded-lg w-full h-28 p-2 outline-none"
            value={newComent}
            onChange={handleNewComment}
          ></textarea>

          <div className="w-full h-auto  flex flex-col  lg:flex-row justify-between items-center">
            <div className="flex flex-col  md:flex-row items-center justify-center">
              <span className="text-sm font-bold hidden lg:block mr-2">
                Califica tu experiencia:
              </span>
              <div className="flex mb-3">
                {[...Array(11).keys()].map((value) => (
                  <button
                    key={value}
                    onClick={() => handleSetNewRate(value)}
                    className={`appearance-none md:mr-2 font-semibold border border-gray-300 rounded-lg h-10 text-center hover:bg-blue-600 ${
                      selectedRate === value
                        ? "bg-blue-600 text-white"
                        : "bg-white"
                    } ${value != 0 ? "w-6 md:w-9" : "w-auto px-2"}`}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {value === 0 ? "Calificacion" : value}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                isLogin ? handleSendNewComent() : handleShowAlertLogUp()
              }}
              className="  text-gray-900 font-bold border border-gray-400 p-1 rounded-lg w-28 h-10 bg-gray-400 hover:bg-blue-600"
              type="submit"
            >
              Comentar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComentsDetails;
