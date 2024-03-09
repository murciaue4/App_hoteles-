import { loginContext } from "./loginContext.js";
import { useEffect, useState } from "react";
import { getUserLocation } from "../helpers";
import axios from "axios";

const GlobalContextProvider = ({ children }) => {
  const [isLoading, setisLoading] = useState(true);
  const [imgUser, setImgUser] = useState(null);
  
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

  useEffect(() => {
    const getProfileImgUser = async () => {
      if (user) {
        const id = user.id;
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          };
          const response = await axios.get(
            `http://localhost:3333/user/img_user/${id}`,
            config
          );
          console.log('data', response.data.body);
          setImgUser(response.data.body);
        } catch (error) {
          console.error("Error fetching user image:", error);
        }
      } else {
        setImgUser(null);
      }
    };
  
    getProfileImgUser();
  }, [user, token]); 

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
        imgUser,
      }}
    >
      {children}
    </loginContext.Provider>
  );
};

export default GlobalContextProvider;
