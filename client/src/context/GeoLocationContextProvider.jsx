import { geoLocationContext } from "./geoLocationContext";
import { useEffect, useState } from "react";
import { getUserLocation } from "../helpers";
import axios from "axios";

import React from "react";

const GeoLocationContextProvider = ({ children }) => {
    const [isLoading, setisLoading] = useState(true);
    const [userLocation, setuserLocation] = useState(null);
  
    const getUserCurrentLocation = async () => {
      try {
        const latLng = await getUserLocation();
        setuserLocation({ lat: latLng[0], lng: latLng[1] });
      } catch (error) {
        console.error("Error obteniendo la ubicación del usuario:", error);
      } finally {
        setisLoading(false);
      }
    };
  
    useEffect(() => {
      getUserCurrentLocation();
    }, []);
  return (
    <geoLocationContext.Provider value={{ userLocation, isLoading }}>
      {children}
    </geoLocationContext.Provider>
  );
};

export default GeoLocationContextProvider;
