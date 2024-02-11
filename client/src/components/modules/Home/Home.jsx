import axios from "axios";
import style from "./Home.module.css";
import { useEffect, useState, useContext } from "react";
import { loginContext } from "../../../context/loginContext";
import CardHotel from "./CardHotel";
import svgIcon from "../../../static/star-icon.svg";
import arrowToggleIcon from "../../../static/arrowToggle.svg";

const Home = () => {
  const { user, closeSession, token } = useContext(loginContext);
  const baseUrl = "http://localhost:3333/user/hoteles/";
  const baseUrlImg = "http://localhost:3333/user/images/";
  const [allHotels, setAllHotels] = useState();

  //estados y manejadores para la seccion de desplegables
  const [showPrices, setShowPrices] = useState(false);
  const [showFiltros, setshowFiltros] = useState(false);
  const [showType, setshowType] = useState(false);
  const [showCapacity, setshowCapacity] = useState(false);
  const [showLocation, setshowLocation] = useState(false);

  const handleShowToggle = (dropDown) => {
    // Cierra todas las demás listas desplegables
    setShowPrices(false);
    setshowFiltros(false);
    setshowType(false);
    setshowCapacity(false);
    setshowLocation(false);

    // Abre o cierra la lista desplegable actual
    switch (dropDown) {
      case 1:
        setShowPrices(!showPrices);
        break;
      case 2:
        setshowFiltros(!showFiltros);
        break;
      case 3:
        setshowType(!showType);
        break;
      case 4:
        setshowCapacity(!showCapacity);
        break;
      case 5:
        setshowLocation(!showLocation);
        break;
      default:
        break;
    }
  };

  //FILTROS
  const [filters, setFilters] = useState({
    searchTerm: "",
    minPrice: "",
    maxPrice: "",
    wifi: false,
    restaurant: false,
    lavanderia: false,
    aire_acondicionado: false,
    parqueadero: false,
    type: [],
    minCapacity: "",
    maxCapacity: "",
    location: [],
  });

  // MANEJADOR  DE FILTROS - para actualizar el estado que guarda los terminos de busqueda
  const handleFilterChange = (filter, value) => {
    if (filter === "type") {
      const updatedTypes = filters.type.includes(value)
        ? filters.type.filter((type) => type !== value)
        : [...filters.type, value];
      setFilters({ ...filters, [filter]: updatedTypes });
    } else if (filter === "location") {
      const updatedLocations = filters.location.includes(value)
        ? filters.location.filter((location) => location !== value)
        : [...filters.location, value];
      setFilters({ ...filters, [filter]: updatedLocations });
    } else {
      setFilters({ ...filters, [filter]: value });
    }
  };

  //stos manejadores son para resetear la busqueda de cada filtro, para usar un boton de limpiar los criterios de busqueda en cada seccion
  const handleResetFilterPrice = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...{ minPrice: "", maxPrice: "" },
    }));
  };
  const handleResetFiltros = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...{
        wifi: false,
        restaurant: false,
        lavanderia: false,
        aire_acondicionado: false,
        parqueadero: false,
      },
    }));
  };
  const handleResetFilterType = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...{ type: [] },
    }));
  };
  const handleResetFilterCapacity = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...{ minCapacity: "", maxCapacity: "" },
    }));
  };
  const handleResetFilterLocation = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...{ location: [] },
    }));
  };

  //manejadores para cerrar individualmente los desplegables de los filtros desde un boton dentro del mismo desplegable
  const closePricesToggle = (event) => {
    event.stopPropagation();
    setShowPrices(false);
  };
  const closeFiltrosToggle = (event) => {
    event.stopPropagation();
    setshowFiltros(false);
  };
  const closeTypesToggle = (event) => {
    event.stopPropagation();
    setshowType(false);
  };
  const closeCapcityToggle = (event) => {
    event.stopPropagation();
    setshowCapacity(false);
  };
  const closeLocationToggle = (event) => {
    event.stopPropagation();
    setshowLocation(false);
  };

  // PETICION AL SERVER al montar el componente: res => todos los hoteles

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

  //FILTRADO de ltodos los hoteles
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

        const wifiCriteria = !filters.wifi || hotel.wifi === filters.wifi;

        const restaurantCriteria =
          !filters.restaurant || hotel.restaurant === filters.restaurant;

        const lavanderiaCriteria =
          !filters.lavanderia || hotel.lavanderia === filters.lavanderia;

        const aire_acondicionadoCriteria =
          !filters.aire_acondicionado ||
          hotel.aire_acondicionado === filters.aire_acondicionado;

        const parkingCriteria =
          !filters.parqueadero || hotel.parqueadero === filters.parqueadero;

        const typeCriteria =
          !filters.type.length ||
          filters.type.includes(hotel.type.toLowerCase());

        const capacityCriteria =
          (!filters.minCapacity ||
            hotel.capacity >= parseInt(filters.minCapacity)) &&
          (!filters.maxCapacity ||
            hotel.capacity <= parseInt(filters.maxCapacity));

        const locationCriteria =
          !filters.location.length ||
          filters.location.includes(hotel.location.toLowerCase());
        return (
          nameCriteria &&
          priceCriteria &&
          locationCriteria &&
          wifiCriteria &&
          restaurantCriteria &&
          lavanderiaCriteria &&
          aire_acondicionadoCriteria &&
          parkingCriteria &&
          typeCriteria &&
          capacityCriteria
        );
      })
    : [];

  //RENDER

  return (
    <div className={style.homeContainer}>
      <div className="h-auto w-full flex flex-col  bg-white ">
        <div className="w-full flex justify-center ">
          <div className=" w-11/12  flex justify-center my-5">
            <div className={style.homeFilters}>
              {/* PRECIOS */}
              <div className="relative w-2/6 h-auto ">
                <button
                  onClick={() => handleShowToggle(1)}
                  className=" w-11/12"
                >
                  <span className=" flex justify-start">
                    <strong>Precio:</strong> por habitación
                  </span>
                  <span className="flex justify-between border border-black rounded-lg py-1 px-2">
                    <span>{`$${filters.minPrice || "0"} - $${
                      filters.maxPrice || "1000"
                    }`}</span>
                    <span className="flex flex-col justify-center">
                      <img
                        src={arrowToggleIcon}
                        alt="*"
                        className={`${
                          showPrices ? "rotate-180 transition-custom" : null
                        } w-4 h-4 transition-custom`}
                      />
                    </span>
                  </span>
                </button>
                {!showPrices ? null : (
                  <div className=" absolute top-16 w-72 border flex flex-col text-start  bg-white shadow-sm rounded-md shadow-black">
                    <div className="flex flex-col px-6 py-3 w-full">
                      <strong className="mb-4">
                        Define el rango de precios
                      </strong>
                      <label
                        htmlFor="priceMin"
                        className="flex flex-col w-full font-semibold text-sm text-gray-700"
                      >
                        Desde:
                        <input
                          className={style.input}
                          name="priceMin"
                          type="number"
                          placeholder="Precio mínimo"
                          value={filters.minPrice}
                          onChange={(e) =>
                            handleFilterChange("minPrice", e.target.value)
                          }
                        />
                      </label>
                      <label
                        htmlFor="priceMax"
                        className="flex flex-col w-full font-semibold text-sm text-gray-700"
                      >
                        Hasta:
                        <input
                          className={style.input}
                          name="priceMax"
                          type="number"
                          placeholder="Precio máximo"
                          value={filters.maxPrice}
                          onChange={(e) =>
                            handleFilterChange("maxPrice", e.target.value)
                          }
                        />
                      </label>
                      <div className=" font-light text-xs mt-4">
                        Los precios no incluyen cargos ni impuestos.
                      </div>
                    </div>
                    <div className=" border-t-2 py-2">
                      <section className="flex justify-around">
                        <button
                          onClick={handleResetFilterPrice}
                          style={{
                            backgroundColor: "none",
                            color: "#535252da",
                            padding: "8px 12px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          Desmarcar
                        </button>

                        <button
                          onClick={closePricesToggle}
                          style={{
                            backgroundColor: "#3498db",
                            color: "#fff",
                            padding: "8px 12px",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          Aceptar
                        </button>
                      </section>
                    </div>
                  </div>
                )}
              </div>

              {/* FILTROS POPULARES */}
              <div className=" relative w-1/6">
                <button onClick={() => handleShowToggle(2)} className="w-11/12">
                  <span className="  flex justify-start">
                    <strong>Filtros:</strong>
                  </span>
                  <span className="flex w-full justify-between border border-black rounded-lg py-1 px-2">
                    <span>Elegir</span>
                    <span className="flex flex-col justify-center">
                      <img
                        src={arrowToggleIcon}
                        alt="*"
                        className={`${
                          showFiltros ? "rotate-180 transition-custom" : null
                        } w-4 h-4 transition-custom`}
                      />
                    </span>
                  </span>
                </button>
                {!showFiltros ? null : (
                  <div className=" absolute top-16 w-96  p-3 border flex flex-col text-start  bg-white shadow-sm rounded-md shadow-black">
                    <section className="flex flex-col">
                      <strong className="mb-4">Puntuacion del sitio</strong>
                      <section className={style.puntuacion}>
                        <div>
                          0-1 <img className="w-5 h-5" src={svgIcon} alt="*" />
                        </div>
                        <div>
                          2 <img className="w-5 h-5" src={svgIcon} alt="*" />
                        </div>
                        <div>
                          3 <img className="w-5 h-5" src={svgIcon} alt="*" />
                        </div>
                        <div>
                          4 <img className="w-5 h-5" src={svgIcon} alt="*" />
                        </div>
                        <div>
                          5 <img className="w-5 h-5" src={svgIcon} alt="*" />
                        </div>
                      </section>
                    </section>
                    <strong className="mb-4">Filtros populares</strong>
                    <section
                      className={` ${style.filtrosPopulares} mb-4 flex flex-col font-semibold`}
                    >
                      <label>
                        <input
                          type="checkbox"
                          checked={filters.wifi}
                          onChange={(e) =>
                            handleFilterChange("wifi", e.target.checked ? 1 : 0)
                          }
                        />
                        Wifi
                      </label>

                      <label>
                        <input
                          type="checkbox"
                          checked={filters.restaurant}
                          onChange={(e) =>
                            handleFilterChange(
                              "restaurant",
                              e.target.checked ? 1 : 0
                            )
                          }
                        />
                        Restaurante
                      </label>

                      <label>
                        <input
                          type="checkbox"
                          checked={filters.lavanderia}
                          onChange={(e) =>
                            handleFilterChange(
                              "lavanderia",
                              e.target.checked ? 1 : 0
                            )
                          }
                        />
                        Lavanderia
                      </label>

                      <label>
                        <input
                          type="checkbox"
                          checked={filters.aire_acondicionado}
                          onChange={(e) =>
                            handleFilterChange(
                              "aire_acondicionado",
                              e.target.checked ? 1 : 0
                            )
                          }
                        />
                        Aire acondicionado
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={filters.parqueadero}
                          onChange={(e) =>
                            handleFilterChange(
                              "parqueadero",
                              e.target.checked ? 1 : 0
                            )
                          }
                        />
                        Parqueadero
                      </label>
                    </section>
                    <div className=" border-t-2 py-2">
                      <section className="flex justify-around">
                        <button
                          onClick={handleResetFiltros}
                          style={{
                            backgroundColor: "none",
                            color: "#535252da",
                            padding: "8px 12px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          Desmarcar
                        </button>

                        <button
                          onClick={closeFiltrosToggle}
                          style={{
                            backgroundColor: "#3498db",
                            color: "#fff",
                            padding: "8px 12px",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          Aceptar
                        </button>
                      </section>
                    </div>
                  </div>
                )}
              </div>

              {/* TIPO DE PROPIEDAD*/}
              <div className="relative w-1/6 h-auto">
                <button onClick={() => handleShowToggle(3)} className="w-11/12">
                  <span className="  flex justify-start">
                    <strong>Tipo:</strong>
                  </span>
                  <span className="flex w-full justify-between border border-black rounded-lg py-1 px-2">
                    <span>Elegir</span>
                    <span className="flex flex-col justify-center">
                      <img
                        src={arrowToggleIcon}
                        alt="*"
                        className={`${
                          showType ? "rotate-180 transition-custom" : null
                        } w-4 h-4 transition-custom`}
                      />
                    </span>
                  </span>
                </button>
                {!showType ? null : (
                  <div className="absolute">
                    <div className=" absolute top-2 w-80  p-3 border flex flex-col text-start  bg-white shadow-sm rounded-md shadow-black">
                      <strong className="mb-4">Tipos de propiedades</strong>
                      <div
                        className={` ${style.filtrosPopulares} mb-4 flex flex-col font-semibold`}
                      >
                        <label>
                          <input
                            type="checkbox"
                            name="type"
                            value=""
                            checked={filters.type.length === 0}
                            onChange={() => handleFilterChange("type", "")}
                          />
                          Todos
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            name="type"
                            value="hotel"
                            checked={filters.type.includes("hotel")}
                            onChange={() => handleFilterChange("type", "hotel")}
                          />
                          Hotel
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            name="type"
                            value="casa"
                            checked={filters.type.includes("casa")}
                            onChange={() => handleFilterChange("type", "casa")}
                          />
                          Casa
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            name="type"
                            value="apartamento"
                            checked={filters.type.includes("apartamento")}
                            onChange={() =>
                              handleFilterChange("type", "apartamento")
                            }
                          />
                          Apartamento
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            name="type"
                            value="campamento"
                            checked={filters.type.includes("campamento")}
                            onChange={() =>
                              handleFilterChange("type", "campamento")
                            }
                          />
                          Campamento
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            name="type"
                            value="hostal"
                            checked={filters.type.includes("hostal")}
                            onChange={() =>
                              handleFilterChange("type", "hostal")
                            }
                          />
                          Hostal
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            name="type"
                            value="habitacion"
                            checked={filters.type.includes("habitacion")}
                            onChange={() =>
                              handleFilterChange("type", "habitacion")
                            }
                          />
                          Habitacion
                        </label>
                      </div>
                      <div className=" border-t-2 py-2">
                        <section className="flex justify-around">
                          <button
                            onClick={handleResetFilterType}
                            style={{
                              backgroundColor: "none",
                              color: "#535252da",
                              padding: "8px 12px",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                          >
                            Desmarcar
                          </button>

                          <button
                            onClick={closeTypesToggle}
                            style={{
                              backgroundColor: "#3498db",
                              color: "#fff",
                              padding: "8px 12px",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                          >
                            Aceptar
                          </button>
                        </section>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* CAPACIDAD */}
              <div className="relative w-1/6">
                <button onClick={() => handleShowToggle(4)} className="w-11/12">
                  <span className="  flex justify-start">
                    <strong>Capacidad:</strong>
                  </span>
                  <span className="flex w-full justify-between border border-black rounded-lg py-1 px-2">
                    <span>Elegir</span>
                    <span className="flex flex-col justify-center">
                      <img
                        src={arrowToggleIcon}
                        alt="*"
                        className={`${
                          showCapacity ? "rotate-180 transition-custom" : null
                        } w-4 h-4 transition-custom`}
                      />
                    </span>
                  </span>
                </button>
                {!showCapacity ? null : (
                  <div className=" absolute top-16 -right-0 w-72 border flex flex-col text-start  bg-white shadow-sm rounded-md shadow-black">
                    <div className="flex flex-col px-6 py-3 w-full">
                      <strong className="mb-4">Define la capacidad</strong>
                      <label
                        htmlFor="capacityMin"
                        className="flex flex-col w-full font-semibold text-sm text-gray-700"
                      >
                        Mínima capacidad:
                        <input
                          className={style.input}
                          name="capacityMin"
                          type="number"
                          placeholder="Capacidad mínima"
                          value={filters.minCapacity}
                          onChange={(e) =>
                            handleFilterChange("minCapacity", e.target.value)
                          }
                        />
                      </label>
                      <label
                        htmlFor="capacityMax"
                        className="flex flex-col w-full font-semibold text-sm text-gray-700"
                      >
                        Máxima capacidad:
                        <input
                          className={style.input}
                          name="capacityMax"
                          type="number"
                          placeholder="Capacidad máxima"
                          value={filters.maxCapacity}
                          onChange={(e) =>
                            handleFilterChange("maxCapacity", e.target.value)
                          }
                        />
                      </label>
                      <div className=" font-light text-xs mt-4">
                        La capacidad se refiere al número de personas
                        permitidas.
                      </div>
                    </div>
                    <div className=" border-t-2 py-2">
                      <section className="flex justify-around">
                        <button
                          onClick={handleResetFilterCapacity}
                          style={{
                            backgroundColor: "none",
                            color: "#535252da",
                            padding: "8px 12px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          Desmarcar
                        </button>

                        <button
                          onClick={closeCapcityToggle}
                          style={{
                            backgroundColor: "#3498db",
                            color: "#fff",
                            padding: "8px 12px",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          Aceptar
                        </button>
                      </section>
                    </div>
                  </div>
                )}
              </div>

              {/* UBUCACION */}
              <div className="relative w-1/6">
                <button onClick={() => handleShowToggle(5)} className="w-full">
                  <span className="  flex justify-start">
                    <strong>Ubicación:</strong>
                  </span>
                  <span className="flex w-full justify-between border border-black rounded-lg py-1 px-2">
                    <span>Todas</span>
                    <span className="flex flex-col justify-center">
                      <img
                        src={arrowToggleIcon}
                        alt="*"
                        className={`${
                          showLocation ? "rotate-180 transition-custom" : null
                        } w-4 h-4 transition-custom`}
                      />
                    </span>
                  </span>
                </button>
                {!showLocation ? null : (
                  <div className="absolute">
                    <div className=" absolute top-2 -right-40 w-80  p-3 border flex flex-col text-start  bg-white shadow-sm rounded-md shadow-black">
                      <strong className="mb-4">Ubicaciones</strong>
                      <div
                        className={` ${style.filtrosPopulares} mb-4 flex flex-col font-semibold`}
                      >
                        <label>
                          <input
                            type="checkbox"
                            name="location"
                            value=""
                            checked={filters.location.length === 0}
                            onChange={() => handleFilterChange("location", "")}
                          />
                          Todos
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            name="location"
                            value="el porvenir"
                            checked={filters.location.includes("el porvenir")}
                            onChange={() =>
                              handleFilterChange("location", "el porvenir")
                            }
                          />
                          El Porvenir
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            name="location"
                            value="buenos aires"
                            checked={filters.location.includes("buenos aires")}
                            onChange={() =>
                              handleFilterChange("location", "buenos aires")
                            }
                          />
                          Buenos Aires
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            name="location"
                            value="santa helena"
                            checked={filters.location.includes("santa helena")}
                            onChange={() =>
                              handleFilterChange("location", "santa helena")
                            }
                          />
                          Santa Helena
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            name="location"
                            value="el oasis"
                            checked={filters.location.includes("el oasis")}
                            onChange={() =>
                              handleFilterChange("location", "el oasis")
                            }
                          />
                          El Oasis
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            name="location"
                            value="cuerna vaca"
                            checked={filters.location.includes("cuerna vaca")}
                            onChange={() =>
                              handleFilterChange("location", "cuerna vaca")
                            }
                          />
                          Cuerna Vaca
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            name="location"
                            value="puerto gaitan"
                            checked={filters.location.includes("puerto gaitan")}
                            onChange={() =>
                              handleFilterChange("location", "puerto gaitan")
                            }
                          />
                          Pto. Gaitán
                        </label>
                      </div>
                      <div className=" border-t-2 py-2">
                        <section className="flex justify-around">
                          <button
                            onClick={handleResetFilterLocation}
                            style={{
                              backgroundColor: "none",
                              color: "#535252da",
                              padding: "8px 12px",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                          >
                            Desmarcar
                          </button>

                          <button
                            onClick={closeLocationToggle}
                            style={{
                              backgroundColor: "#3498db",
                              color: "#fff",
                              padding: "8px 12px",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                          >
                            Aceptar
                          </button>
                        </section>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={style.Home}>
        <div className="w-full flex justify-center">
          <div className="w-11/12 flex justify-between ">
            <div className={style.homeSortBy}>
              <button>
                <span className="flex ">
                  <strong className="mr-2 mt-1">Ordenar por</strong>
                  <span className="flex w-60 justify-between border border-black rounded-lg py-1 px-2">
                    <span>Precio</span>
                    <span className="flex flex-col justify-center">
                      <img
                        src={arrowToggleIcon}
                        alt="*"
                        className={`${
                          showLocation ? "rotate-180 transition-custom" : null
                        } w-4 h-4 transition-custom`}
                      />
                    </span>
                  </span>
                </span>
              </button>
              <div className={style.homeTOtalFound}><strong>{` ${filteredHotels.length}`}</strong> Hoteles encontrados  </div>
            <div className={style.homeMapsLocation}>espacio para el mapa</div>
            </div>
          </div>
        </div>

        <div className=" contenedor-de-cards w-full py-5 flex flex-col justify-center">
          <ol className="w-full flex flex-col justify-center">
            {filteredHotels.map((el) => {
              console.log(el);
              return <CardHotel hotel={el} key={el.id} />;
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Home;
