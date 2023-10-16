import React from "react";

const nav = () => {
  return (
    <div>
      <div className="  text-white pl-8 pr-8 h-16 shadow-2xl bg-sky-900   ">
        <nav className="flex flex-row justify-between h-full items-center">

          <div><h1 className=" font-extrabold  text-3xl">Apply-Job</h1>
          <span>Campo Rubiales</span></div>


          <ul className="flex flex-row justify-between w-96  text-lg ">
            <li className=" hover:border-b-2 border-white">
              <a href="/">RDP</a>
            </li>

            <li className=" hover:border-b-2 border-white">
              <a href="/" title="fdsfdsf" >Servicios</a>
            </li>
            <li className=" hover:border-b-2 border-white">
              <a href="/">Contactanos</a>
            </li>

            <button>Iniciar sesión</button>
          </ul>

        </nav>
      </div>
    </div>
  );
};

export default nav;
