import { geoLocationContext } from "./geoLocationContext";
import { useEffect, useState } from "react";
import { getUserLocation } from "../helpers";
import axios from "axios";

import React from "react";

const GeoLocationContextProvider = ({ children }) => {
  const [isLoading, setisLoading] = useState(true);
  const [userLocation, setuserLocation] = useState(null);
  const mainLocations = [
    {
      name: "EL Porvenir",
      choords: {
        lat: 3.763696,
        lng: -71.362796,
      },
    },
    {
      name: "El Oasis",
      choords: {
        lat: 3.775363981158301,
        lng: -71.65874505711278,
      },
    },
    {
      name: "Santa Helena",
      choords: {
        lat: 3.900004652719744,
        lng: -71.49067531960965,
      },
    },
    {
      name: "Buenos Aires",
      choords: {
        lat: 3.7875757421679035,
        lng: -71.38192771437281,
      },
    },
  ];
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
    <geoLocationContext.Provider
      value={{
        userLocation,
        isLoading,
        mainLocations,
      }}
    >
      {children}
    </geoLocationContext.Provider>
  );
};

export default GeoLocationContextProvider;
