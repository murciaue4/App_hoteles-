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
    handleSetShowForm01();
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
            email: res.data.body.email,
            isVerify: res.data.body.is_verify,
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
    <div
      className={`w-full h-full flex flex-col justify-around items-center rounden-xl py-4 .`}
    >
      <div className="bg-blue-600 w-10 h-10 text-white grid place-content-center font-bold rounded-md">
  H!
</div>
      <form
        onSubmit={handleSubmit}
        className={`w-10/12 h-3/4 flex flex-col justify-around items-center`}
      >
        <div className="text-xl font-semibold">
          <h2>Iniciar Sesión</h2>
        </div>

        <div>
          <label className="text-md " htmlFor="username">
            Usuario
          </label>
          <input
            className="divInputs w-full outline-none  pl-2 border border-slate-300 h-8 rounded-xl text-center mb-4 "
            required={true}
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <label className="text-md mt-3" htmlFor="password">
            Contraseña
          </label>
          <input
            className="divInputs w-full outline-none  pl-1 border border-slate-300 h-8 rounded-xl text-center "
            required={true}
            type="password" // Este tipo de input oculta la contraseña
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="w-full flex justify-end hover:underline cursor-pointer">
            <span className="text-sm text-blue-600 font-medium">
              Olvidé mi contraseña
            </span>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className=" w-36 p-2 rounded-md bg-blue-600 text-white font-bold hover:bg-blue-900"
          >
            Listo
          </button>
        </div>
      </form>
      <span
        className="text-sm font-semibold cursor-pointer text-blue-600 hover:text-blue-900"
        onClick={cambiar}
      >
        Crear una cuenta
      </span>
      {error ? <Errors error={error} /> : null}
    </div>
  );
}

export default LoginForm;
