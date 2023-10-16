import React, { useState } from "react";
import styles from "./styles/App.module.css";

const Form01 = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Realizar validación aquí (puede usar una librería de validación o hacerlo manualmente)
    const errors = {};
    if (!formData.name) {
      errors.name = "El nombre es obligatorio.";
    }
    if (!formData.email) {
      errors.email = "El correo electrónico es obligatorio.";
    }
    if (!formData.password) {
      errors.password = "La contraseña es obligatoria.";
    }

    if (Object.keys(errors).length === 0) {
      // Enviar datos al servidor o realizar acción de registro aquí
      console.log("Formulario enviado:", formData);
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className={styles.forms}>
      <h2>Crear una cuenta</h2>
      <form>
        <div>
          <br /><label htmlFor="name">Nombre:</label><br />
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {formErrors.name && <span className="error">{formErrors.name}</span>}

          <br /><label htmlFor="email">Correo Electrónico:</label><br />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {formErrors.email && (
            <span className="error">{formErrors.email}</span>
          )}

          <br /><label htmlFor="password">Contraseña:</label><br />
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {formErrors.password && (
            <span className="error">{formErrors.password}</span>
          )}
        </div>
      </form>
        <button className=" bg-sky-900 bg-opacity-100 " type="submit">Crear Cuenta</button>
        <p className="mt-4 hover:text-blue-400"><a href="/">Ya tengo una cuenta</a></p>
    </div>
  );
};

export default Form01;
