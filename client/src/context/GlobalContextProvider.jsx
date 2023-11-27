import { loginContext } from "./loginContext.js";
import { useState } from "react";

const GlolContextProvider = ({ children }) => {
  



  const localTokenExtractor = () => {
    const localTk = window.localStorage.getItem("sessionLogin")
   if (localTk) {
    return("Bearer "+ localTk.split('"')[1]); 
   }else{
      return null;
   }
  };

  const getLocalSession = () => {
    const localTk = window.localStorage.getItem("sessionLogin");
   if (localTk) {
    return(true); 
   }else{
      return false;
   }
  };

  const getLocalSessionUser = () => {
    const user = window.localStorage.getItem("sessionLoginUser");
   if (user) {
    return(JSON.parse(user)); 
   }else{
      return false;
   }
  };

 
 
  const [token, setToken] = useState(localTokenExtractor);
  const [isLogin, setIsLogin] = useState(getLocalSession);
  const [user, setUser] = useState(getLocalSessionUser);

 const closeSession = async() => {
  //aplicar logica de cerrado de sessio cono el aoutoguardado y el envio de datos temporales al servidor ñiño.
    window.localStorage.removeItem("sessionLogin");
    window.localStorage.removeItem("sessionLoginUser");
    setIsLogin(getLocalSession)
  }




  //creando un contexto global para los datos de login

  return (
    <loginContext.Provider
      value={{
        isLogin,
        setIsLogin,
        token,
        setToken,
        user, 
        closeSession
      }}
    >
      {children}
    </loginContext.Provider>
  );
};

export default GlolContextProvider;
