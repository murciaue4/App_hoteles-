import { loginContext } from "./loginContext.js";
import { useEffect, useState } from "react";
import { getUserLocation } from "../helpers";

const GlobalContextProvider = ({ children }) => {
  const [isLoading, setisLoading] = useState(true);

  const getUserCurrentLocation = async () => {
    try {
      const latLng = await getUserLocation();
      setuserLocation({ lat: latLng[0], lng: latLng[1] });
      setisLoading(false);
    } catch (error) {
      console.error("Error obteniendo la ubicación del usuario:", error);
    }
  };

  const localTokenExtractor = () => {
    const localTk = window.localStorage.getItem("sessionLogin");
    if (localTk) {
      return "Bearer " + localTk.split('"')[1];
    } else {
      return null;
    }
  };

  const getLocalSession = () => {
    const localTk = window.localStorage.getItem("sessionLogin");
    if (localTk) {
      return true;
    } else {
      return false;
    }
  };

  const getLocalSessionUser = () => {
    const user = window.localStorage.getItem("sessionLoginUser");
    if (user) {
      return JSON.parse(user);
    } else {
      return false;
    }
  };

  const [userLocation, setuserLocation] = useState(getUserCurrentLocation);
  const [token, setToken] = useState(localTokenExtractor);
  const [isLogin, setIsLogin] = useState(getLocalSession);
  const [user, setUser] = useState(getLocalSessionUser);

  const closeSession = async () => {
    //aplicar logica de cerrado de sessio cono el aoutoguardado y el envio de datos temporales al servidor mañiño.
    window.localStorage.removeItem("sessionLogin");
    window.localStorage.removeItem("sessionLoginUser");
    setIsLogin(getLocalSession);
  };

  //creando un contexto global para los datos de login

  return (
    <loginContext.Provider
      value={{
        isLogin,
        setIsLogin,
        token,
        setToken,
        user,
        closeSession,
        isLoading,
        userLocation,
      }}
    >
      {children}
    </loginContext.Provider>
  );
};

export default GlobalContextProvider;
