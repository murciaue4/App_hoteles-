import React, { useContext, useState } from "react";
import axios from "axios";
import { loginContext } from "../../../context/loginContext";
import style from "../forms/FormHotel.module.css";
import Errors from "../alerts/Errors";
import FormHotel02 from "./FormHotel02";

const AddHotelForm = () => {
  const { token, user } = useContext(loginContext);
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
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        };
        const response = await axios.post(
          "http://localhost:3333/user/hoteles",
          data,
          config
        );

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
      <div className={style.container}>
        <div className={style.formHotel}>
          <h1>PUBLICA TU HOTEL</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <div className={style.inputsSession}>
              <br />
              <label>
                Tipo:
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChangeForms}
                  required
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="casa">Casa</option>
                  <option value="hotel">Hotel</option>
                  <option value="campamento">Campamento</option>
                </select>
              </label>
              <br />
              <label>
                Nombre:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChangeForms}
                  required
                />
              </label>
              <label>
                Ubicación:
                <br />
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChangeForms}
                  required
                >
                  <option value="">Seleccione una ubicaion</option>
                  <option value="El Porvenir">El Porvenir</option>
                  <option value="B. Aires">B. Aires</option>
                  <option value="S. Helena">S. Helena</option>
                  <option value="El Oasis">El Oasis</option>
                  <option value="Cuerna Vaca">Cuerna Vaca</option>
                  <option value="Pto. Gaitan">Pto. Gaitan</option>
                </select>
              </label>
              <br />
              <label>
                Capacidad:
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChangeForms}
                  required
                />
              </label>
              <br />
              <label>
                Camas:
                <input
                  type="number"
                  name="camas"
                  value={formData.camas}
                  onChange={handleChangeForms}
                  required
                />
              </label>
              <br />
              <label>
                Precio por Habitación:
                <input
                  type="number"
                  name="precio_por_habitacion"
                  value={formData.precio_por_habitacion}
                  onChange={handleChangeForms}
                  required
                />
              </label>
            </div>

            <br />
            <h4>Seleccione los servicios que ofrece su hotel:</h4>
            <br />

            <div className={style.checks}>
              <section>
                <label>
                  Baño Privado:
                  <input
                    type="checkbox"
                    name="baño_privado"
                    checked={formData.baño_privado}
                    onChange={handleChangeForms}
                  />
                </label>
                <br />

                <label>
                  WiFi:
                  <input
                    type="checkbox"
                    name="wifi"
                    checked={formData.wifi}
                    onChange={handleChangeForms}
                  />
                </label>
                <br />

                <label>
                  Restaurante:
                  <input
                    type="checkbox"
                    name="restaurant"
                    checked={formData.restaurant}
                    onChange={handleChangeForms}
                  />
                </label>
                <br />
              </section>

              <section>
                <label>
                  Lavandería:
                  <input
                    type="checkbox"
                    name="lavanderia"
                    checked={formData.lavanderia}
                    onChange={handleChangeForms}
                  />
                </label>
                <br />

                <label>
                  Aire acondicionado:
                  <input
                    type="checkbox"
                    name="aire_acondicionado"
                    checked={formData.aire_acondicionado}
                    onChange={handleChangeForms}
                  />
                </label>
                <br />

                <label>
                  Parqueadero:
                  <input
                    type="checkbox"
                    name="parqueadero"
                    checked={formData.parqueadero}
                    onChange={handleChangeForms}
                  />
                </label>
                <br />
              </section>
            </div>

            <br />
            <div className={style.divButton}>
              <button type="submit">Siguiente</button>
            </div>
          </form>
        </div>
        {err.error ? <Errors error={err} /> : null}
      </div>
    );
  };

  return (
    <>
      {!showForm02 ? (
        renderFormHotel()
      ) : (
        <FormHotel02 idInserted={idInserted} />
      )}
    </>
  );
};

export default AddHotelForm;
