import axios from "axios";
import style from "./Home.module.css";
import { useEffect, useState, useContext } from "react";
import { loginContext } from "../../../context/loginContext";
import CardHotel from "./CardHotel";

const Home = () => {
  const { user, closeSession, token } = useContext(loginContext);
  const baseUrl = "http://localhost:3333/user/hoteles/";
  const baseUrlImg = "http://localhost:3333/user/images/";
  const [allHotels, setAllHotels] = useState();

  const [filters, setFilters] = useState({
    searchTerm: "",
    minPrice: "",
    maxPrice: "",
    location: "",
    parqueadero: false,
  });

  {
    /*peticion al SERVER al montar el componente: res => todos los hoteles */
  }
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
      await axios.get("http://localhost:3333/user/images", config);
    };
    getData();
  }, []);

  const filteredHotels = allHotels
    ? allHotels.filter((hotel) => {
        const nameCriteria = hotel.name
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase());

        const priceCriteria =
          (!filters.minPrice ||
            hotel.precio_por_habitacion >= parseInt(filters.minPrice)) &&
          (!filters.maxPrice ||
            hotel.precio_por_habitacion <= parseInt(filters.maxPrice));

        const locationCriteria =
          !filters.location ||
          hotel.location.toLowerCase() === filters.location.toLowerCase();

        const parkingCriteria =
          !filters.parqueadero || hotel.parqueadero === filters.parqueadero;

        return (
          nameCriteria && priceCriteria && locationCriteria && parkingCriteria
        );
      })
    : [];

  {
    /* Handle para actualizar el estado que guarda los terminos de busqueda */
  }
  const handleFilterChange = (filter, value) => {
    setFilters({ ...filters, [filter]: value });
  };
  console.log(allHotels);

  return (
    <div className={style.homeContainer}>
      <div className={style.homeFilters}>
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={filters.searchTerm}
          onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
        />

        <input
          type="number"
          placeholder="Precio mínimo"
          value={filters.minPrice}
          onChange={(e) => handleFilterChange("minPrice", e.target.value)}
        />

        <input
          type="number"
          placeholder="Precio máximo"
          value={filters.maxPrice}
          onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
        />

        <label>
          <select
            name="location"
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
          >
            <option value="">Ubicacion</option>
            <option value="El Porvenir">El Porvenir</option>
            <option value="B. Aires">B. Aires</option>
            <option value="S. Helena">S. Helena</option>
            <option value="El Oasis">El Oasis</option>
            <option value="Cuerna Vaca">Cuerna Vaca</option>
            <option value="Pto. Gaitan">Pto. Gaitan</option>
          </select>
        </label>

        <label>
          <input
            type="checkbox"
            checked={filters.parqueadero}
            onChange={(e) =>
              handleFilterChange("parqueadero", e.target.checked ? 1 : 0)
            }
          />
          Tiene Parqueadero
        </label>
      </div>

      <div className={style.Home}>
        {filteredHotels.map((el) => {
          console.log(el);
          return <CardHotel hotel={el} key={el.id} />;
        })}
      </div>
    </div>
  );
};

export default Home;
