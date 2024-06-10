import React, { useState } from "react";
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
    handleSetShowForm01();
  };
  const handleShowPassword = () => {
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
          handleSetErr(data);
          console.log(err);
          return;
        } else {
          cambiar();
        }
      } catch (error) {}
    };
    postNewUser(formData);
  };

  return (
    <div className="flex flex-col justify-around items-center h-auto w-full p-4">
      <h1 className="mb-5">Crea una cuenta </h1>
      <form
        classame="flex flex-col justify-center items-center text-sm font-medium h-full mb-9"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col justify-center">
          
          <label htmlFor="accountType">
            Tipo de cuenta :
            <select
              className="divInputs mb-3 w-full outline-none  pl-1 border border-slate-300 h-8 rounded-xl text-center "
              id="usertype"
              name="usertype"
              value={formData.usertype}
              onChange={handleInputChange}
            >
              <option value="">Selecciona...</option>
              <option value="usuario">Usuario</option>
              <option value="propietario">Propietario</option>
              <option value="Empresa">Empresa</option>
            </select>
          </label>

          
          <label htmlFor="name">
            Nombre :
            
            <input
              className="divInputs  mb-3  w-full outline-none  pl-1 border border-slate-300 h-8 rounded-xl text-center "
              required={true}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
          

          {formData.usertype != "Empresa" ? (
            <label htmlFor="lastname">
              Apellidos :
              
              <input
                className="divInputs w-full mb-3  outline-none  pl-1 border border-slate-300 h-8 rounded-xl text-center "
                required={true}
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
              />
            </label>
          ) : null}

          
          <label htmlFor="email">
            Correo Electrónico :
            
            <input
              className="divInputs mb-3  w-full outline-none  pl-1 border border-slate-300 h-8 rounded-xl text-center "
              required={true}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
          
          <label htmlFor="email">
            @Username :
            <p className="text-xs  mb-1 font-normal text-blue-600">
              <i>
                Crea un nombre de usuario, <br />
                podras iniciar session con el luego.
              </i>
            </p>
            
            <input
              className="divInputs mb-3  w-full outline-none  pl-1 border border-slate-300 h-8 rounded-xl text-center "
              required={true}
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </label>
          
          <label htmlFor="password">
            Contraseña :
            
            <p className="text-xs  mb-1 font-normal text-blue-600">
              <i>
                8 Digitos, Mayúsculas, minúsculas, <br />
                al menos un numero.
              </i>
            </p>
            
            <input
              className="divInputs w-full outline-none  pl-1 border border-slate-300 h-8 rounded-xl text-center "
              required={true}
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </label>
          <div className="w-full flex justify-end  mb-9 ">
            <span
              onClick={handleShowPassword}
              className="text-xs text-blue-600 font-medium cursor-pointer hover:underline select-none"
            >
              Mostar contraseña
            </span>
          </div>
          
        </div>
        <div className="w-full flex justify-center">
          <button  type="submit" className=" w-36 p-2 rounded-md bg-blue-600 text-white font-bold hover:bg-blue-900  mb-4 ">
            Crear cuenta
          </button>
        </div>
      </form>
      
      <span onClick={cambiar} className="text-sm font-semibold cursor-pointer text-blue-600 hover:text-blue-900  mb-3 ">Ya tengo una cuenta</span>
      

      {err.error ? <Errors error={err} /> : null}
    </div>
  );
};

export default Form01;
