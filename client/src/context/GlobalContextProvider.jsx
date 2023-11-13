import { loginContext } from "./loginContext.js";
import { useState } from "react";

const GlolContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(window.localStorage.getItem("sessionLogin"));

  //creando un contexto global para los datos de login

  return (
    <loginContext.Provider
      value={{
        isLogin,
        setIsLogin,
        user,
        setUser,
      }}
    >
      {children}
    </loginContext.Provider>
  );
};

export default GlolContextProvider;
