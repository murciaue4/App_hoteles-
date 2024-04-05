import { loginContext } from "./loginContext.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GlobalContextProvider = ({ children }) => {
  const URLStatic = "http://localhost:3333/";
  const [allHotels, setAllHotels] = useState(null)
  const [isLoadingHotels, setIsLoadingHotels] = useState(true);

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

  const [token, setToken] = useState(localTokenExtractor);
  const [isLogin, setIsLogin] = useState(getLocalSession);
  const [user, setUser] = useState(getLocalSessionUser);
  const [imgUser, setImgUser] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);

  const addToFavorites = (hotelId) => {
    setFavourites((prevFavourites) => [...prevFavourites, hotelId]);
  };

  const removeFromFavorites = (hotelId) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((id) => id !== hotelId)
    );
  };

  const isFavorite = (hotelId) => favourites.includes(hotelId);

  const closeSession = () => {
    //PENDIENTE: aplicar logica de cerrado de sessio cono el aoutoguardado y el envio de datos temporales al servidor mañiño.
    window.localStorage.removeItem("sessionLogin");
    window.localStorage.removeItem("sessionLoginUser");
    setIsLogin(getLocalSession);
    window.location.reload();
  };




  //-----------------------LLAMADOS AL SERVER-----------------------------

//obtengo todos los hoteles
useEffect(() => {
  const getData = async (params) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    await axios.get(URLStatic+'user/hoteles/', config).then((res) => {
      setAllHotels(res.data);
    });

    await axios.get(URLStatic+ "user/images/", config);
    setTimeout(() => {
      setIsLoadingHotels(false);
    }, 100);
  };
  getData();
}, []);


  //Obtengo la imagen de perfil 
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
          setImgUser(response.data.body);
          setImageChanged(true);
        } catch (error) {
          console.error("Error fetching user image:", error);
        }
      } else {
        setImgUser(null);
      }
    };

    getProfileImgUser();
  }, [user, token, imageChanged]);

  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    if (user) {
      const uniqueStorageKey = `favorites_${user.id}`;
      const storedFavorites = localStorage.getItem(uniqueStorageKey);
      if (storedFavorites) {
        if (JSON.parse(storedFavorites).length > 0) {
          console.log("SI HAY!!");
          setFavourites(JSON.parse(storedFavorites));
        } else {
          const uniqueStorageKey = `favorites_${user.id}`;

          localStorage.setItem(uniqueStorageKey, JSON.stringify(favourites));
        }
      }
    }
  }, [user]);
  // Guarda los favoritos en el localStorage con un nombre único para cada usuario
  useEffect(() => {
    if (user) {
      const uniqueStorageKey = `favorites_${user.id}`;

      localStorage.setItem(uniqueStorageKey, JSON.stringify(favourites));
    }
    console.log("setITEM");
  }, [favourites, user]);

  // Carga los favoritos desde el localStorage al montar el componente

  const [showAlertLogUp, setShowAlertLogUp] = useState(false);
  const handleSetShowAlert = () => {
    setShowAlertLogUp(!showAlertLogUp);
  };
  const navigate = useNavigate();

  const handleFavouritesClick = () => {
    if (isLogin) {
      navigate("/favorites"); // Navega a "/favorites" si el usuario está autenticado
    } else {
      setShowAlertLogUp(true); // Muestra el componente AlertLogUp si el usuario no está autenticado
    }
  };
  const handleSetFavouriteClick = (e) => {
    e.stopPropagation();
    if (!isLogin){
      setShowAlertLogUp(true); // Muestra el componente AlertLogUp si el usuario no está autenticado
    }
  };
  return (
    <loginContext.Provider
      value={{
        URLStatic,
        isLogin,
        setIsLogin,
        token,
        setToken,
        user,
        closeSession,
        imgUser,
        imageChanged,
        setImageChanged,
        favourites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        showAlertLogUp,
        setShowAlertLogUp,
        handleFavouritesClick,
        handleSetShowAlert,
        handleSetFavouriteClick,
        allHotels, 
        setAllHotels,
        isLoadingHotels, 
        setIsLoadingHotels
      }}
    >
      {children}
    </loginContext.Provider>
  );
};

export default GlobalContextProvider;
