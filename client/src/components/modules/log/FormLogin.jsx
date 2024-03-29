import style from "./FormLogin.module.css";
import React, { useState } from "react";
import axios from "axios";
import Errors from "../alerts/Errors";

function LoginForm({ handleSetShowForm01 }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleSetError = (err) => {
    setError(err);
    setTimeout(() => {
      setError(null);
    }, 2000);
  };

  const cambiar = () => {
    handleSetShowForm01(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let dataForm = {
      username,
      password,
    };
    axios
      .post("http://localhost:3333/auth/login", dataForm, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log({ servResponse: res.data.body });
        //guardar el token en localstorage
        window.localStorage.setItem(
          "sessionLogin",
          JSON.stringify(res.data.body.token)
        );
        //guardar credenciales en localstorage
        window.localStorage.setItem(
          "sessionLoginUser",
          JSON.stringify({
            id: res.data.body.id,
            username: res.data.body.username,
          })
        );
        
        location.reload();
      })
      .catch((err) => {
        console.log(err);
        handleSetError(err.response.data);
      });
  };

  return (
    <div className={style.LoginForm}>
      <div
        style={{
          backgroundColor: "#064663",
          width: "40px",
          height: "40px",
          color: "white",
          display: "grid",
          placeContent: "center",
          fontWeight: "bolder",
          borderRadius: "5px",
        }}
      >
        H!
      </div>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.title}>
          <h2>Iniciar Sesión</h2>
        </div>
        {error? <Errors error={error} /> : null}
        <div className="divInputs">
          <label htmlFor="username">Usuario:</label>
          <input
            required={true}
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            required={true}
            type="password" // Este tipo de input oculta la contraseña
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className={style.divButton}>
          <button type="submit">Listo</button>
        </div>
      </form>
      <span onClick={cambiar}>Crear una cuenta</span>
    </div>
  );
}

export default LoginForm;
