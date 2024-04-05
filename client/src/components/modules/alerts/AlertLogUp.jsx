import React from 'react';
import { Link } from 'react-router-dom'; // Importar Link desde react-router-dom
import style from "./AlertLogUp.module.css";
import LoginForm from "../log/FormLogin";

const AlertLogUp = ({ onClose }) => {
  return (
    <div className={`fixed top-0 right-0 h-full w-screen z-50 bg-black bg-opacity-50 ${style.alertContainer}`}>
      <div className={`${style.AlertLogUp} flex flex-col justify-around items-center bg-white h-full sm:w-1/3 w-30vw p-4`}>
        <p className="text-center text-black mb-4 sm:text-lg">Abre una cuenta o inicia sesion para crear tu lista de hoteles favoritos y mucho más...</p>
        {/* <LoginForm/> */}
        <button onClick={onClose} className="flex justify-end">
          <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Abrir ó Crear cuenta
          </Link>
        </button>
        <button onClick={onClose} className="absolute top-0 left-56 m-2 text-black text-2xl">&times;</button>
      </div>
    </div>
  );
};

export default AlertLogUp;
