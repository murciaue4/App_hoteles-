import React, { useState } from "react";
import style from "./Form01.module.css";
import { Link } from "react-router-dom";
import Errors from "../alerts/Errors";

const Form01 = ({ handleSetShowForm01 }) => {
  const [err, setErr] = useState({});
  const [showPassword, setShoePassword] = useState();
  const [formData, setFormData] = useState({
    id: 0,
    usertype: "",
    name: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  });
  const handleSetErr = (err) => {
    setErr(err);
    setTimeout(() => {
      setErr({});
    }, 2000);
  };
  const cambiar = () => {
    handleSetShowForm01(false);
  };
  const handleShowPassword = ({target}) => {
    setShoePassword(!showPassword);
  
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const postNewUser = async (user) => {
      const url = "http://localhost:3333/user/users";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };
      try {
        const res = await fetch(url, options);
        const data = await res.json();
        console.log(data);

        if (data.error) {
         handleSetErr(data)
         console.log(err);
          return;
        }else{
          location.reload()
        }
       
      } catch (error) {
        
        
       
      }
    };
    postNewUser(formData);
  };

  return (
    <div className={style.Form01}>
      <h1>Crea una cuenta </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <br />
          <br />
          <label htmlFor="accountType">
            Tipo de cuenta:
            <select
              className={style.select}
              id="usertype"
              name="usertype"
              value={formData.usertype}
              onChange={handleInputChange}
            >
              <option value="">Selecciona...</option>
              <option value="usuario">Usuario</option>
              <option value="propietario">Propietario</option>
            </select>
          </label>

          <br />
          <label htmlFor="name">
            Nombre:
            <br />
            <input
              required={true}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label htmlFor="lastname">
            Apellidos:
            <br />
            <input
              required={true}
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label htmlFor="email">
            Correo Electrónico:
            <br />
            <input
              required={true}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label htmlFor="email">
            @Username: <br />{" "}
            <span>
              <i>
                Crea un nombre de usuario, <br />
                podras iniciar session con el luego.
              </i>
            </span>
            <br />
            <input
              placeholder="Username"
              required={true}
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label htmlFor="password">
            Contraseña:
            <br />
            <span>
              <i>
                8 Digitos, Mayúsculas, minúsculas, <br />
                al menos un numero.
              </i>
            </span>
            <br />
            <input
              required={true}
              type={showPassword ?  "text" :"password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </label>

          <input
            className={style.showPassword}
            type="checkbox"
            onChange={handleShowPassword}
            
          />
          <br />
        </div>
        <button className="" type="submit">
          Crear cuenta
        </button>
      </form>
      <br />
      <span onClick={cambiar}>Ya tengo una cuenta</span>
      <br />
      
      {err.error ? <Errors error={err} /> : null}
    </div>
  );
};

export default Form01;
