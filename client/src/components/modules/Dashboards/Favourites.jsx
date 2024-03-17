import React, { useContext, useEffect, useState } from "react";
import FavoriteCard from "../Home/CardHotel";
import { loginContext } from "../../../context/loginContext";
import SkeletonCardHotel from "../Home/SkeletonCardHotel";

import axios from "axios";


const Favourites = ({ children }) => {
  const [allHotels, setAllHotels] = useState();

  const {
    user,
    token,
    URLStatic,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    favourites,
  } = useContext(loginContext);
  const baseUrl = URLStatic + "user/hoteles/";
  const baseUrlImg = URLStatic + "user/images/";
  const [isLoadingHotels, setIsLoadingHotels] = useState(true);

  useEffect(() => {
    const getData = async (params) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      await axios.get(baseUrl, config).then((res) => {
        setAllHotels(res.data);
      });

      await axios.get(baseUrlImg, config);
      setTimeout(() => {
        setIsLoadingHotels(false);
      }, 1000);
    };
    getData();
  }, []);

  const FilteredFavouritesHotels = (hotelsList, Fav) => {
   
    const filteredHotels = hotelsList.filter((hotel) => {
     
      return Fav.includes(hotel.id);
    });
  
    return filteredHotels;
  };
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Mis Hoteles Favoritos</h2>
      <div className="">
      {isLoadingHotels ? (
              <SkeletonCardHotel />
            ) : (
              FilteredFavouritesHotels(allHotels, favourites).map((el) => <FavoriteCard hotel={el} key={el.id} />)
            )}
      </div>
    </div>
  );
};

export default Favourites;
