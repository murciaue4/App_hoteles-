import React, { useState } from "react";
import style from "./Form01.module.css";
import {Link} from 'react-router-dom';

const Form01 = ({handleSetShowForm01}) => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  const cambiar = () => {
    handleSetShowForm01(false)
  }

  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Realizar validación aquí (puede usar una librería de validación o hacerlo manualmente
    
    console.log(formData);
  };

  return (
    <div className={style.Form01}>
      <h2>Crea tu cuenta en H!</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <br />
          <label htmlFor="name">Nombre:</label>
          <br />
          <input
            required={true}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />

          <br />
          <label htmlFor="lastname">Apellidos:</label>
          <br />
          <input
            required={true}
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
          />

          <br />
          <label htmlFor="email">Correo Electrónico:</label>
          <br />
          <input
            required={true}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />

          <br />
          <label htmlFor="password">Contraseña:</label>
          <br />
          <input
            required={true}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button className="" type="submit">
          Listo
        </button>
      </form>
     
        <span onClick={cambiar}>Ya tengo una cuenta</span>
      
    </div>
  );
};

export default Form01;
