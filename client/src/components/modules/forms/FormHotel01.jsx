import React, { useContext, useState } from "react";
import axios from "axios";
import { loginContext } from "../../../context/loginContext";

import Errors from "../alerts/Errors";

const FormHotel01 = ({ handleChangeForms, formData, onClose, next }) => {
  const [err, setErr] = useState({});
  const [currentForm, setCurrentForm] = useState(1);

  const FormHotelPart01 = () => {
    const [form01Data, setForm01Data] = useState({
      city: "Puerto Gaitan",
      country: "Colombia",
      sector: "",
      directions: "",
      barrio: "",
      indications: "",
    });

    const handleChangeForms01Data = (e) => {
      const { name, value, type, checked } = e.target;

      setForm01Data((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    };
    return (
      <div className=" h-full w-full grid place-content-center ">
        <div className="shadow-md w-screen h-auto my-5 flex flex-col justify-center items-center rounded-xl  ">
          <h1 className="text-4xl text-center mb-10 font-extrabold ">
            Unos datos más de tu ubicación...
          </h1>
          <br />
          <form className="flex flex-col justify-around items-center m-3 h-full w-[90%] ">
            <div className=" flex flex-col justify-center items-center md:w-[900px]  mb-5 border  ">
              <div className="w-full flex flex-col mb-5">
                <h1 className="text-3xl font-extrabold">Localización</h1>
                <span className=" w-full text-justify text-xl mb-3">
                  Indica el sector que corresponda a tu ubicacion o el mas
                  cercano a esta, agrega ademas en orden consecutivo la ciudad y
                  el país.
                </span>

                <select
                  className="border  border-gray-400 h-12 px-2 rounded-lg w-full text-xl"
                  name="sector"
                  value={form01Data.sector}
                  onChange={handleChangeForms01Data}
                  required
                >
                  <option className="text-md w-full p-0" value="">
                    Seleccione una ubicación
                  </option>
                  <option className="text-md w-full p-0" value="el porvenir">
                    El Porvenir
                  </option>
                  <option className="text-md w-full p-0" value="buenos aires">
                    Buenos Aires
                  </option>
                  <option className="text-md w-full p-0" value="santa helena">
                    Santa Helena
                  </option>
                  <option className="text-md w-full p-0" value="el oasis">
                    El Oasis
                  </option>
                  <option className="text-md w-full p-0" value="cuerna vaca">
                    Cuerna Vaca
                  </option>
                  <option className="text-md w-full p-0" value="puerto gaitan">
                    Pto. Gaitan
                  </option>
                  <option className="text-md w-full p-0" value="Otro">
                    Otro
                  </option>
                </select>
              </div>

              <div className="w-full flex flex-col mb-5">
                <input
                  className={`border  border-gray-400 h-12 px-2 rounded-lg w-full text-xl`}
                  type="text"
                  name="city"
                  value={form01Data.city}
                  onChange={handleChangeForms01Data}
                  required
                />
              </div>

              <div className="w-full flex flex-col mb-5 ">
                <input
                  className={`border  border-gray-400 h-12 px-2 rounded-lg w-full text-xl`}
                  type="text"
                  name="country"
                  placeholder="Pais"
                  value={form01Data.country}
                  onChange={handleChangeForms01Data}
                  required
                />
              </div>
            </div>
            <div className=" flex flex-col  md:w-[900px]  mb-5  ">
              <h1 className="text-3xl font-extrabold">Dirección</h1>
              <span className=" w-full text-justify text-xl mb-3">
                Agrega la dirección de tu propiedad, si no cuentas con una
                dirección específica puedes agregar una descripción breve del
                lugar
              </span>
              <div className="w-full  flex max-md:flex-col mb-5 ">
                <input
                  className={`border  border-gray-400 h-12 px-2 rounded-lg w-full text-xl`}
                  type="text"
                  name="directions"
                  placeholder="Direccion "
                  value={form01Data.directions}
                  onChange={handleChangeForms01Data}
                />
              </div>

              {form01Data.directions && (
                <div className="w-full flex flex-col mb-5 ">
                  <input
                    className={`border  border-gray-400 h-12 px-2 rounded-lg w-full text-xl`}
                    type="text"
                    name="barrio"
                    placeholder="Barrio"
                    value={form01Data.barrio}
                    onChange={handleChangeForms01Data}
                  />
                </div>
              )}

              <div className="w-full flex flex-col mb-5   ">
                <input
                  className={`border  border-gray-400 h-12 px-2 rounded-lg w-full text-xl`}
                  type="text"
                  name="indications"
                  placeholder="Descripción del lugar"
                  value={form01Data.indications}
                  onChange={handleChangeForms01Data}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col w-full md:w-[900px]  mb-5 ">
              <button
                onClick={() => {
                  setCurrentForm(2);
                  handleChangeForms({ location: form01Data });
                }}
                type="button"
                className="w-full h-14 py-2 px-4 rounded-sm bg-blue-500 text-white text-2xl hover:bg-blue-600"
              >
                Siguiente
              </button>
            </div>
          </form>
        </div>
        {err.error ? <Errors error={err} /> : null}
      </div>
    );
  };
  const FormHotelPart02 = () => {
    const [form02Data, setForm02Data] = useState({
      type: "",
      name: "",
      groupName: "",
      telefono: "",
      segundoTelefono: "",
      celular: "",
      email: "",
    });
    const handleChangeForms02Data = (e) => {
      const { name, value, type, checked } = e.target;

      setForm02Data((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    };

    const validarEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    return (
      <div className=" h-full w-full grid place-content-center ">
        <div className="shadow-md w-screen h-auto my-5 flex flex-col justify-center items-center rounded-xl ">
          <h1 className="text-4xl text-center mb-10 font-extrabold">
            Datoos básicos de tu propiedad...
          </h1>

          <form className="flex flex-col justify-around items-center m-3 h-full w-[90%] ">
            <div className=" flex flex-col justify-center items-center md:w-[900px]  mb-5  ">
              <div className="flex flex-col w-full md:mb-5">
                <h1 className="font-extrabold text-3xl">Categoria</h1>
                <span className="text-xl font-medium">
                  Seleccione el tipo de propiedad que desea publicar{" "}
                </span>

                <select
                  className="text-xl  w-full border  border-gray-400 rounded-md h-12"
                  name="type"
                  value={form02Data.type}
                  onChange={handleChangeForms02Data}
                  required
                >
                  <option className="text-md w-full p-0 " value="">
                    Tipo de propiedad
                  </option>

                  <option className="text-md w-full p-0 " value="hotel">
                    Hotel
                  </option>
                  <option className="text-md w-full p-0 " value="hotel">
                    Motel
                  </option>
                  <option className="text-md w-full p-0 " value="campamento">
                    Campamento
                  </option>
                </select>
              </div>

              <div className="flex flex-col w-full mb-5">
                <div className="flex flex-col  mr-2 w-full mb-5">
                  <h1 className="font-extrabold text-3xl">
                    Nombre de la propiedad
                  </h1>
                  <span className="text-xl ">
                    Proporcione el nombre oficial de su propiedad, por ejemplo
                    el que utiliza en su propio sitio web.
                  </span>

                  <input
                    className={`border outline-none border-gray-400 h-12 px-2 rounded-lg text-xl`}
                    type="text"
                    name="name"
                    placeholder="Nombre "
                    value={form02Data.name}
                    onChange={handleChangeForms02Data}
                    required
                  />
                </div>

                <div className="flex flex-col w-full">
                  <div className="flex items-center mb-5 border border-gray-400 rounded-lg px-2 ">
                    <input
                      className={`outline-none w-full  h-12 text-xl`}
                      type="text"
                      name="groupName"
                      placeholder="Grupo/Franquicia (Opcional)"
                      value={form02Data.groupName}
                      onChange={handleChangeForms02Data}
                    />
                    <button className="relative h-6 w-6 border rounded-full border-blue-500 ml-2 group grid content-center">
                      <span className="absolute right-0 text-sm w-96 h-auto border p-2 text-justify border-gray-400 bg-white rounded-lg shadow-lg hidden group-hover:block">
                        En este campo ingrese el nombre del grupo, red de
                        franquicias u organización a la que pertenece su
                        propiedad, si no pertenece a ninguna de las anteriores
                        omita este paso.
                      </span>
                      ?
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col  w-full mb-5">
                <h1 className="font-extrabold text-3xl">Datos de contacto</h1>
                <span className="text-xl ">
                  Te recomendamos que uses aquí informacion de contacto
                  exclusivo de tu negocio, allí recibiras notificaciones e
                  informacion relacionada, (no recomendamos el uso de tu
                  informacion de contacto personal).
                </span>

                <div className="flex flex-col mb-5 ">
                  <input
                    className={`border outline-none border-gray-400 h-12 px-2 rounded-lg text-xl`}
                    type="text"
                    name="telefono"
                    placeholder="Teléfono 1"
                    value={form02Data.telefono}
                    onChange={handleChangeForms02Data}
                    required
                  />
                </div>
                <div className="flex flex-col  mb-5">
                  <input
                    className={`border outline-none border-gray-400 h-12 px-2 rounded-lg text-xl`}
                    type="text"
                    name="segundoTelefono"
                    placeholder="Teléfono 2 (Opcional)"
                    value={form02Data.segundoTelefono}
                    onChange={handleChangeForms02Data}
                  />
                </div>
                <div className="flex flex-col mb-5 ">
                  <input
                    className={`border outline-none border-gray-400 h-12 px-2 rounded-lg text-xl`}
                    type="text"
                    name="celular"
                    placeholder="Celular"
                    value={form02Data.celular}
                    onChange={handleChangeForms02Data}
                    required
                  />
                </div>

                <div className="flex lex-col w-full mb-5">
                  <input
                    className={`border outline-none w-full border-gray-400 h-12 px-2 rounded-lg text-xl`}
                    type="text"
                    name="email"
                    placeholder="Correo Electronico"
                    value={form02Data.email}
                    onChange={handleChangeForms02Data}
                    required
                  />
                </div>
                <div className="w-full flex justify-center mt-10">
                  <button
                    onClick={() => {
                      setCurrentForm(3);
                      console.log(form02Data);
                      handleChangeForms(form02Data);
                    }}
                    type="submit"
                    className="w-full h-14 py-2 px-4 rounded-sm bg-blue-500 text-white text-2xl hover:bg-blue-600"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        {err.error ? <Errors error={err} /> : null}
      </div>
    );
  };
  const FormHotelPart03 = () => {
    console.log(formData);
    const [habitaciones, setHabitaciones] = useState({
      sencilla: 0,
      doble: 0,
      dosCamas: 0,
      tripleMixta: 0,
      tresCamas: 0,
    });
    const handleChangeHabitaciones = (e) => {
      const { name, value, type, checked } = e.target;

      setHabitaciones((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    };

    const [prices, setPrices] = useState({
      sencilla: 0,
      doble: 0,
      dosCamas: 0,
      tripleMixta: 0,
      tresCamas: 0,
    });
    const handleChangePrices = (e) => {
      const { name, value, type, checked } = e.target;

      setPrices((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    };

    const [form03Data, setForm03Data] = useState({
      capacity: 0,
      currentCapacity: 0,
    });

    const handleChangeForms03Data = (e) => {
      const { name, value, type, checked } = e.target;

      setForm03Data((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    };

    return (
      <div className=" h-full w-full grid place-content-center ">
        <div className="shadow-md w-screen h-auto my-5 flex flex-col justify-center items-center rounded-xl ">
          <h1 className="text-4xl text-center mb-10 font-extrabold">
            Capacidad y precios
          </h1>

          <form className="flex flex-col justify-around items-center  h-full w-[90%] ">
            <div className=" flex flex-col justify-center items-center w-full md:w-[900px]  mb-5   ">
              <section className="section-capacity flex flex-col w-full">
                <h1 className="font-bold ">
                  ¿Cual es la capacidad total de tu propiedad?{" "}
                </h1>
                <span className="text-lg">
                  ¿Cuantos huespedes puedes alojar en total en tu propiedad?.
                  Recuerda precisar esta informacion pues es de vital
                  importancia para ser tomado en cuenta por tus clientes
                  potenciales.{" "}
                </span>
                <input
                  className={`border border-gray-400 h-12 px-2 rounded-lg text-xl`}
                  type="number"
                  name="capacity"
                  value={form03Data.capacity}
                  onChange={handleChangeForms03Data}
                  required
                />
                <h1 className="font-bold ">¿Cupo disponible?</h1>
                <span className="text-lg">
                  ¿Que capacidad tienes disponible ahora mismo?. cuenta cuantas
                  personas podrias alojar ahora mismo en tu propiedad
                  descontando lo que ya tienes ocupado.{" "}
                </span>
                <input
                  className={`border border-gray-400 h-12 px-2 rounded-lg text-xl`}
                  type="number"
                  name="currentCapacity"
                  value={form03Data.currentCapacity}
                  onChange={handleChangeForms03Data}
                  required
                />
              </section>
              <section className="section-habitaciones-y-precios flex flex-col justify-left w-full mb-10">
                <h1 className="font-bold ">Tipos de habitaciones </h1>
                <span className="text-lg">
                  Relaciona aqui los tipos de habitaciones y la cantidad de cada
                  uno, se mostrará el total de habitaciones de tu propiedad{" "}
                </span>
                <div className="habitaciones flex max-md:flex-col max-md:items-center items-start">
                  <div className="flex flex-col items-start ">
                    <div>
                      <input
                        className={`border border-gray-400 h-8 px-2 rounded-lg w-20 text-center m-1 text-xl`}
                        type="number"
                        name="sencilla"
                        value={habitaciones.sencilla}
                        onChange={handleChangeHabitaciones}
                        required
                      />
                      <label className="font-semibold">
                        {" "}
                        Habitación Sencilla
                      </label>
                    </div>
                    <div>
                      <input
                        className={`border border-gray-400 h-8 px-2 rounded-lg w-20 text-center m-1 text-xl`}
                        type="number"
                        name="doble"
                        value={habitaciones.doble}
                        onChange={handleChangeHabitaciones}
                        required
                      />
                      <label className="font-semibold">
                        {" "}
                        Habitaciones con Cama Doble
                      </label>
                    </div>
                    <div>
                      <input
                        className={`border border-gray-400 h-8 px-2 rounded-lg w-20 text-center m-1 text-xl`}
                        type="number"
                        name="dosCamas"
                        value={habitaciones.dosCamas}
                        onChange={handleChangeHabitaciones}
                        required
                      />{" "}
                      <label className="font-semibold">
                        Habitaciones con 2 Camas
                      </label>
                    </div>
                    <div>
                      <input
                        className={`border border-gray-400 h-8 px-2 rounded-lg w-20 text-center m-1 text-xl`}
                        type="number"
                        name="tripleMixta"
                        value={habitaciones.tripleMixta}
                        onChange={handleChangeHabitaciones}
                        required
                      />{" "}
                      <label className="font-semibold">
                        Cama Doble y sencilla
                      </label>
                    </div>
                    <div>
                      <input
                        className={`border border-gray-400 h-8 px-2 rounded-lg w-20 text-center m-1 text-xl`}
                        type="number"
                        name="tresCamas"
                        value={habitaciones.tresCamas}
                        onChange={handleChangeHabitaciones}
                        required
                      />{" "}
                      <label className="font-semibold">
                        Habitaciones de 3 camas
                      </label>
                    </div>
                  </div>
                  <div className="my-5 mx-auto md:my-auto">
                    <span className="text-xl font-medium">
                      Total de Habitaciones{" "}
                    </span>{" "}
                    <span className="text-2xl font-extrabold border border-black p-2 rounded-lg">
                      {Object.values(habitaciones).reduce(
                        (acc, current) => acc + parseInt(current),
                        0
                      )}
                    </span>
                  </div>
                </div>
              </section>
              <section className="section-precios flex flex-col justify-center w-full">
                <h1 className="font-bold ">Hablemos de precios...! </h1>
                <span className="text-lg">
                  Establece los precios (en Pesos Colombianos) para cada tipo de
                  habitación, NO INCLUYAS PUNTOS NI COMAS.{" "}
                </span>
                <div className=" flex max-md:flex-col max-md:items-center items-start ">
                  <div className="flex flex-col items-start mx-2">
                    <div>
                      $
                      <input
                        className={`border border-gray-400 h-8 px-2 rounded-lg w-44 text-xl text-center m-1`}
                        type="number"
                        name="sencilla"
                        value={prices.sencilla}
                        onChange={handleChangePrices}
                        required
                      />
                      <label className="font-semibold">Sencilla</label>
                    </div>
                    <div>
                      $
                      <input
                        className={`border border-gray-400 h-8 px-2 rounded-lg w-44 text-xl text-center m-1`}
                        type="number"
                        name="doble"
                        value={prices.doble}
                        onChange={handleChangePrices}
                        required
                      />
                      <label className="font-semibold">Cama Doble</label>
                    </div>
                    <div>
                      $
                      <input
                        className={`border border-gray-400 h-8 px-2 rounded-lg w-44 text-xl text-center m-1`}
                        type="number"
                        name="dosCamas"
                        value={prices.dosCamas}
                        onChange={handleChangePrices}
                        required
                      />{" "}
                      <label className="font-semibold">2 Camas</label>
                    </div>
                    <div>
                      $
                      <input
                        className={`border border-gray-400 h-8 px-2 rounded-lg w-44 text-xl text-center m-1`}
                        type="number"
                        name="tripleMixta"
                        value={prices.tripleMixta}
                        onChange={handleChangePrices}
                        required
                      />
                      <label className="font-semibold">Doble y sencilla</label>
                    </div>
                    <div>
                      $
                      <input
                        className={`border border-gray-400 h-8 px-2 rounded-lg w-44 text-xl text-center m-1`}
                        type="number"
                        name="tresCamas"
                        value={prices.tresCamas}
                        onChange={handleChangePrices}
                        required
                      />
                      <label className="font-semibold">3 camas</label>
                    </div>
                  </div>
                </div>
              </section>
              <div className="w-full flex justify-center mt-10">
                <button
                  onClick={() => {
                    handleChangeForms({
                      ...form03Data,
                      habitaciones: habitaciones,
                      prices: prices,
                    });
                    onClose(false);
                    next(true);
                  }}
                  type="button"
                  className="w-full h-14 py-2 px-4 rounded-sm bg-blue-500 text-white text-2xl hover:bg-blue-600"
                >
                  Siguiente
                </button>
              </div>
              {console.log(form03Data)}
            </div>
          </form>
        </div>
        {err.error ? <Errors error={err} /> : null}
      </div>
    );
  };

  return (
    <div>
      {currentForm === 1 && <FormHotelPart01 />}
      {currentForm === 2 && <FormHotelPart02 />}
      {currentForm === 3 && <FormHotelPart03 />}
    </div>
  );
};

export default FormHotel01;
