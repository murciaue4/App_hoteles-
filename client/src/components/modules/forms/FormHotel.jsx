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
      [name]: type === "checkbox" ? checked : value
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
                <br />
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
                Ubicación:
                <br />
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChangeForms}
                  required
                >
                  <option value="">Seleccione una ubicaion</option>
                  <option value="el porvenir">El Porvenir</option>
                  <option value="buenos aires">Buenos Aires</option>
                  <option value="santa helena">Santa Helena</option>
                  <option value="el oasis">El Oasis</option>
                  <option value="cuerna vaca">Cuerna Vaca</option>
                  <option value="puerto gaitan">Pto. Gaitan</option>
                </select>
              </label>
              <br />
              <label>
                Nombre:
                <br />
                <input
                className={style.input}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChangeForms}
                  required
                />
              </label>
              <br />
              <label>
                Capacidad total:
                <input
                className={style.input}
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChangeForms}
                  required
                />
              </label>
              <br />
              <label>
                Camas por Habitacion:
                <br />
                <select
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
              </label>
              <br />
              <label>
                Precio por Habitación:
                <input
                className={style.input}
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
                  <input
                  className={style.checkbox}
                    type="checkbox"
                    name="baño_privado"
                    checked={formData.baño_privado}
                    onChange={handleChangeForms}
                  />{" "}
                  Baño Privado
                </label>
                <br />

                <label>
                  <input
                   className={style.checkbox}
                    type="checkbox"
                    name="wifi"
                    checked={formData.wifi}
                    onChange={handleChangeForms}
                  />{" "}
                  WiFi
                </label>
                <br />

                <label>
                  <input
                   className={style.checkbox}
                    type="checkbox"
                    name="restaurant"
                    checked={formData.restaurant}
                    onChange={handleChangeForms}
                  />{" "}
                  Restaurante
                </label>
                <br />
              </section>

              <section>
                <label>
                  <input
                   className={style.checkbox}
                    type="checkbox"
                    name="lavanderia"
                    checked={formData.lavanderia}
                    onChange={handleChangeForms}
                  />{" "}
                  Lavandería
                </label>
                <br />

                <label>
                  <input
                   className={style.checkbox}
                    type="checkbox"
                    name="aire_acondicionado"
                    checked={formData.aire_acondicionado}
                    onChange={handleChangeForms}
                  />{" "}
                  Aire acondicionado
                </label>
                <br />

                <label>
                  <input
                   className={style.checkbox}
                    type="checkbox"
                    name="parqueadero"
                    checked={formData.parqueadero}
                    onChange={handleChangeForms}
                  />{" "}
                  Parqueadero
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
