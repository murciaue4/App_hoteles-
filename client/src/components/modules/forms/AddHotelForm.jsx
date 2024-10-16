import React, { useContext, useState } from "react";
import FormHotel from "./FormHotel";
import FormHotel01 from "./FormHotel01";
import FormHotel02 from "./FormHotel02";

import { loginContext } from "../../../context/loginContext";
import SelectTypeOfProperty from "./MainForms";
const AddHotelForm = () => {
  const { token, user, URLStatic } = useContext(loginContext);
  const [idInserted, setIdInserted] = useState();
  const [formData, setFormData] = useState({
    id: 0,
    id_user: user.id,
    name: "",
    email: "",
    location: {},
    capacity: 0,
    type: "",
    choords: "",
    servicios: [],
  });
  const [err, setErr] = useState({});

  const [showMain, setShowMain] = useState(true);
  const [showFormHotel, setShowFormHotel] = useState(false);
  const [showFormHotel01, setShowFormHotel01] = useState(false);
  const [showFormHotel02, setShowFormHotel02] = useState(false);

  const handleSetErr = (err) => {
    setErr(err);
    setTimeout(() => {
      setErr({});
    }, 2000);
  };
  const handleChangeForms = (newData) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData };

      for (const key in newData) {
        updatedData[key] = newData[key];
      }

      return updatedData;
    });
  };

  // const SubmitForm01 = (e) => {
  //   e.preventDefault();

  //   const sendData = async (data) => {
  //     console.log("DATA", data);
  //     try {
  //       const config = {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: token,
  //         },
  //       };
  //       console.log("DATA2", data);

  //       const response = await axios.post(
  //         `http://localhost:3333/user/hoteles/${user.id}`,
  //         data,
  //         config
  //       );
  //       console.log("RESPONSE:  ", response);

  //       if (response.data.body[0].insertId) {
  //         setIdInserted(response.data.body[0].insertId);
  //       }

  //       setFormData({
  //         id: 0,
  //         id_user: user.id,
  //         name: "",
  //         location: "",
  //         capacity: 0,
  //         type: "",
  //         camas: 1,
  //         baño_privado: false,
  //         wifi: false,
  //         restaurant: false,
  //         lavanderia: false,
  //         parqueadero: false,
  //         aire_acondicionado: false,
  //         precio_por_habitacion: 0,
  //       });
  //     } catch (error) {
  //       console.log("errrrrrrrrrr ::::: ", error.response.data);
  //       handleSetErr(error.response.data);
  //     }
  //   };

  //   sendData(formData);
  // };

  return (
    <div>
      <div className="w-full h-full flex justify-center">
        {showMain && (
          <SelectTypeOfProperty
            onClose={setShowMain}
            next={setShowFormHotel}
            handleChangeForms={handleChangeForms}
          />
        )}
        {showFormHotel && (
          <FormHotel
            onClose={setShowFormHotel}
            next={setShowFormHotel01}
            handleChangeForms={handleChangeForms}
            formData={formData}
          />
        )}
        {showFormHotel01 && (
          <FormHotel01
            onClose={setShowFormHotel01}
            next={setShowFormHotel02}
            handleChangeForms={handleChangeForms}
            formData={formData}
          />
        )}
        {showFormHotel02 && (
          <FormHotel02
            onClose={setShowFormHotel01}
            next={setShowFormHotel02}
            handleChangeForms={handleChangeForms}
            formData={formData}
          />
        )}
      </div>
    </div>
  );
};

export default AddHotelForm;
