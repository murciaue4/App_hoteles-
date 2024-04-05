import axios from 'axios';
import React, { useContext, useState } from 'react';
import { loginContext } from "../../../context/loginContext";


const VerifyAlert = () => {
  const [sentVerify, setSentVerify] = useState(false)
const {user, isLogin, URLStatic, token, closeSession} = useContext(loginContext);


const sendEmail = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  const body = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  await axios.put(URLStatic + 'auth/verify-email', body, config)
    .then((res) => {
      console.log(res);
      setSentVerify(true);
      alert("Hemos enviado un correo de verificación a tu dirección de correo electrónico. Ábrelo y haz clic en el botón 'VERIFICAR CORREO ELECTRÓNICO' para finalizar la verificación.");

    }).then(() => {
      closeSession();
    })
    .catch(error => {
      console.error('Error al enviar correo de verificación:', error);
      
    });
}
  return (
    <div className='p-1 flex flex-col  justify-center w-full h-auto bg-red-200 text-sm '>
      <span>
        Tu cuenta aun no esta verficada, envia un mensaje de validación a tu dirrección de correo electrónico y confirma que eres tu.
        
      </span>
      <button onClick={sendEmail} className=' bg-blue-500 h-auto w-auto p-1 rounded-sm  text-white '>Enviar correo de verificacion</button>
    </div>
  );
};

export default VerifyAlert;