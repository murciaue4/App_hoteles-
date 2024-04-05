import React, { useContext, useState } from "react";
import axios from "axios";
import { loginContext } from "../../../context/loginContext";

import Errors from "../alerts/Errors";

const AddHotelForm = () => {
  const { token, user, URLStatic } = useContext(loginContext);
  const [idInserted, setIdInserted] = useState();
  const [err, setErr] = useState({});
  const [formData, setFormData] = useState({
    id: 0,
    id_user: user.id,
    name: "",
    location: "",
    capacity: 0,
    type: "",
    camas: 1,
    baño_privado: false,
    wifi: false,
    restaurant: false,
    lavanderia: false,
    parqueadero: false,
    aire_acondicionado: false,
    precio_por_habitacion: 0,
  });

  const [showForm02, setShowForm02] = useState(false);

  const handleSetErr = (err) => {
    setErr(err);
    setTimeout(() => {
      setErr({});
    }, 2000);
  };

  const handleChangeForms = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const sendData = async (data) => {
      console.log("DATA", data);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        };
        console.log("DATA2", data);

        const response = await axios.post(
          `http://localhost:3333/user/hoteles/${user.id}`,
          data,
          config
        );
        console.log("RESPONSE:  ", response);

        if (response.data.body[0].insertId) {
          setIdInserted(response.data.body[0].insertId);
        }

        console.log(response.data.body[0].insertId);

        setFormData({
          id: 0,
          id_user: user.id,
          name: "",
          location: "",
          capacity: 0,
          type: "",
          camas: 1,
          baño_privado: false,
          wifi: false,
          restaurant: false,
          lavanderia: false,
          parqueadero: false,
          aire_acondicionado: false,
          precio_por_habitacion: 0,
        });

        setShowForm02(true);
      } catch (error) {
        console.log("errrrrrrrrrr ::::: ", error.response.data);
        handleSetErr(error.response.data);
      }
    };

    sendData(formData);
  };
  const renderFormHotel = () => {
    return (
      <div className=" h-full w-full grid place-content-center ">
        <div className="shadow-md  border border-gray-00 w-[400px] h-auto my-5 flex flex-col justify-center items-center rounded-xl ">
          <h1 className="text-xl font-bold">PUBLICA TU HOTEL</h1>
          <br />
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-around items-center m-3 h-full w-[90%] "
          >
            <div className=" flex flex-col w-[300px]">
              <label className="font-bold">Tipo: </label>

              <select
                className="text-md w-3/4 border border-gray-400 rounded-md h-9"
                name="type"
                value={formData.type}
                onChange={handleChangeForms}
                required
              >
                <option className="text-md w-full p-0 " value="">
                  Selecciona un tipo
                </option>
                <option className="text-md w-full p-0 " value="casa">
                  Casa
                </option>
                <option className="text-md w-full p-0 " value="hotel">
                  Hotel
                </option>
                <option className="text-md w-full p-0 " value="campamento">
                  Campamento
                </option>
              </select>

              <br />
              <label className="font-bold">Ubicación:</label>

              <select
                className="text-md w-3/4 border border-gray-400 rounded-md h-9"
                name="location"
                value={formData.location}
                onChange={handleChangeForms}
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
              </select>

              <br />
              <label className="font-bold">Nombre: </label>

              <input
                className={`border border-gray-400 h-9 px-2 rounded-lg`}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChangeForms}
                required
              />

              <br />
              <label className="font-bold">Capacidad total: </label>
              <input
                className={`border border-gray-400 h-9 px-2 rounded-lg`}
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChangeForms}
                required
              />

              <br />
              <label className="font-bold">Camas por Habitación: </label>

              <select
                className="w-3/4 border border-gray-400 rounded-md h-9"
                name="camas"
                value={formData.camas}
                onChange={handleChangeForms}
                required
              >
                <option value="1">1 cama</option>
                <option value="2">2 camas</option>
                <option value="3">3 camas</option>
                <option value="4">4 camas</option>
              </select>

              <br />
              <label className="font-bold">Precio por Habitación:</label>
              <input
                className={`border border-gray-400 h-9 px-2 rounded-lg`}
                type="number"
                name="precio_por_habitacion"
                value={formData.precio_por_habitacion}
                onChange={handleChangeForms}
                required
              />
            </div>

            <br />
            <h4>Seleccione los servicios que ofrece su hotel:</h4>
            <br />

            <section className="w-[90%] flex justify-between items-center font-bold">

              
              <section className="mt-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="baño_privado"
                    checked={formData.baño_privado}
                    onChange={handleChangeForms}
                    className="h-5 w-5 mr-2 cursor-pointer"
                  />
                  Baño Privado
                </label>
                <br />
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="wifi"
                    checked={formData.wifi}
                    onChange={handleChangeForms}
                    className="h-5 w-5 mr-2 cursor-pointer"
                  />
                  WiFi
                </label>
                <br />
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="restaurant"
                    checked={formData.restaurant}
                    onChange={handleChangeForms}
                    className="h-5 w-5 mr-2 cursor-pointer"
                  />
                  Restaurante
                </label>
                <br />
              </section>

              <section className="mt-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="lavanderia"
                    checked={formData.lavanderia}
                    onChange={handleChangeForms}
                    className="h-5 w-5 mr-2 cursor-pointer"
                  />
                  Lavandería
                </label>
                <br />
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="aire_acondicionado"
                    checked={formData.aire_acondicionado}
                    onChange={handleChangeForms}
                    className="h-5 w-5 mr-2 cursor-pointer"
                  />
                  Aire acondicionado
                </label>
                <br />
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="parqueadero"
                    checked={formData.parqueadero}
                    onChange={handleChangeForms}
                    className="h-5 w-5 mr-2 cursor-pointer"
                  />
                  Parqueadero
                </label>
                <br />
              </section>
            </section>

            <br />
            <div className="w-[90%]">
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-lg bg-blue-500 text-white text-lg hover:bg-blue-600"
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

  return <>{renderFormHotel()}</>;
};

export default AddHotelForm;
