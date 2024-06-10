import style from "./Home.module.css";
import { useState, useContext } from "react";
import { loginContext } from "../../../context/loginContext";
import CardHotel from "./CardHotel";
import SkeletonCardHotel from "./SkeletonCardHotel";
import svgIcon from "../../../static/star-icon.svg";
import arrowToggleIcon from "../../../static/arrowToggle.svg";
import locationIcon from "../../../static/locationIcon.svg";
import sortTypeIcon from "../../../static/sort-Vertival-Icon.svg";
import searchIcon from "../../../static/searchIconB-02.svg";
import dropIcon from "../../../static/deleteIcon2.sg-14.svg";
import Maps from "../Maps/Mapcomponent";

const Home = () => {
  const { isLoadingHotels, allHotels } = useContext(loginContext);

  //estados y manejadores para la seccion de desplegables
  const [showPrices, setShowPrices] = useState(false);
  const [showFiltros, setshowFiltros] = useState(false);
  const [showType, setshowType] = useState(false);
  const [showCapacity, setshowCapacity] = useState(false);
  const [showLocation, setshowLocation] = useState(false);
  const [showAllFilters, setshowAllFilters] = useState(false);
  const [showSortBy, setShowSortBy] = useState(false);

  const [showMapContainer, setShowMapContainer] = useState(false);
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

  //SORTBY
  const [sortBy, setSortBy] = useState("default");
  const [sortTypeAsc, setSortTypeAsc] = useState(false);

  //MANEJADOR DE ESTADOS DE TOGGLES
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
  //MANEJADOR DE BOTON DE FILTROS

  const handleShowAllFilters = () => {
    setshowAllFilters(!showAllFilters);
  };

  const handleShowSortBy = () => {
    setShowSortBy(!showSortBy);
  };

  const handleShowMapContainer = (bol) => {
    setShowMapContainer(bol);
  };
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

  //MANEJADOR DE ORDENAMIENTO SORTBY
  const handleSortType = () => {
    setSortTypeAsc(!sortTypeAsc);
  };
  const handleSortChange = (event) => {
    const { value, checked } = event.target;
    if (value === "default") {
      setSortBy("default");
    } else {
      setSortBy(value);
    }
  };
  const sortedHotels = () => {
    const copyOfFilteredHotels = [...filteredHotels];

    if (sortBy === "precio") {
      !sortTypeAsc &&
        copyOfFilteredHotels.sort(
          (a, b) => a.precio_por_habitacion - b.precio_por_habitacion
        );
      sortTypeAsc &&
        copyOfFilteredHotels.sort(
          (a, b) => b.precio_por_habitacion - a.precio_por_habitacion
        );
    }

    // agregar más lógica de ordenación para otras opciones aquí

    return copyOfFilteredHotels;
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
  const handleResetSortChange = (event) => {
    setSortBy("default");
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
  function toCapitalCase(string) {
    return string.replace(/\b\w/g, (match) => match.toUpperCase());
  }

  return (
    <div className="bg-gray-200">
      <div className="-SearchBar h-auto w-full flex justify-center md:bg-white sticky top-0 ">
        <div className="h-10 shadow-md max-md:w-90 lg:w-1/3 flex items-center justify-between border bg-white rounded-full border-gray-300  pl-2 my-4 ">
          <img src={searchIcon} alt="" className="w-6 h-6" />

          <input
            type="text"
            className="flex flex-row justify-between outline-none px-2 text-xl"
            placeholder="Buscar por nombre..."
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
          />
          <button
            className=" h-full ml-2 p-2 bg-white text-white rounded-full hover:bg-blue-600"
            onClick={() => handleFilterChange("searchTerm", "")}
          >
            <img src={dropIcon} alt="" className="h-full w-full" />
          </button>
        </div>
      </div>

      <div
        className={`h-auto w-full hidden md:flex flex-col bg-white sticky top-0 z-10 pt-2 ${style.filterBar} `}
      >
        <div className="w-full flex justify-center   ">
          <div className=" w-11/12  flex justify-center  ">
            <div
              className={`flex justify-between my-5 w-full max-w-5xl text-base`}
            >
              {/* PRECIOS */}
              <div className="relative w-2/6 h-auto  ">
                <button
                  onClick={() => handleShowToggle(1)}
                  className=" w-11/12"
                >
                  <span className=" flex justify-start">
                    <strong>Precio:</strong>{" "}
                    <p className="hidden md:block"> por habitación</p>
                  </span>
                  <span className="flex justify-between border border-gray-300 rounded-full py-1 px-3">
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
                  <div className=" absolute z-10 top-16 w-72 border flex flex-col text-start  bg-white shadow-sm rounded-md shadow-black">
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
                          className="border-2 h-8 rounded-lg px-2 mb-3"
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
                          className="border-2 h-8 rounded-lg px-2 mb-3"
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
                  <span className="flex w-full justify-between border border-gray-300 rounded-full py-1 px-3">
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
                {showFiltros && (
                  <div className=" absolute  z-10 top-16 w-96  p-3 border flex flex-col text-start  bg-white shadow-sm rounded-md shadow-black">
                    <section className="flex flex-col">
                      <strong className="mb-4">Puntuacion del sitio</strong>
                      <section className="flex w-full justify-between">
                        <div className="border-2 p-2 rounded-lg flex flex-col items-center justify-center font-semibold hover:bg-blue-500 hover:text-white ">
                          0-1 <img className="w-5 h-5" src={svgIcon} alt="*" />
                        </div>
                        <div className="border-2 p-2 rounded-lg flex flex-col items-center justify-center font-semibold hover:bg-blue-500 hover:text-white ">
                          2 <img className="w-5 h-5" src={svgIcon} alt="*" />
                        </div>
                        <div className="border-2 p-2 rounded-lg flex flex-col items-center justify-center font-semibold hover:bg-blue-500 hover:text-white ">
                          3 <img className="w-5 h-5" src={svgIcon} alt="*" />
                        </div>
                        <div className="border-2 p-2 rounded-lg flex flex-col items-center justify-center font-semibold hover:bg-blue-500 hover:text-white ">
                          4 <img className="w-5 h-5" src={svgIcon} alt="*" />
                        </div>
                        <div className="border-2 p-2 rounded-lg flex flex-col items-center justify-center font-semibold hover:bg-blue-500 hover:text-white ">
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
                  <span className="flex w-full justify-between border border-gray-300 rounded-full py-1 px-3">
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
                {showType && (
                  <div className="absolute z-10">
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
                  <span className="flex w-full justify-between border border-gray-300 rounded-full py-1 px-3">
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
                {showCapacity && (
                  <div className=" absolute z-10 top-16 -right-0 w-72 flex flex-col text-start  bg-white shadow-sm rounded-md shadow-black border">
                    <div className="flex flex-col px-6 py-3 w-full">
                      <strong className="mb-4">Define la capacidad</strong>
                      <label
                        htmlFor="capacityMin"
                        className="flex flex-col w-full font-semibold text-sm text-gray-700"
                      >
                        Mínima capacidad:
                        <input
                          className="border-2 h-8 rounded-lg px-2 mb-3"
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
                          className="border-2 h-8 rounded-lg px-2 mb-3"
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
                  <span className="flex w-full justify-between border border-gray-300 rounded-full py-1 px-3">
                    <span>{filters.location == "" ? "Todas" : "Cambiar"}</span>
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
                {showLocation && (
                  <div className="absolute z-10">
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

      <div className="w-11/12 flex justify-center shadow-md rounded-md mx-auto md:hidden mt-5">
        <div className="w-full flex justify-center ">
          <div className="w-full h-14 flex justify-center ">
            {/* BOTÓN FILTROS */}
            <div className=" w-1/2 h-full">
              <button
                onClick={() => handleShowAllFilters()}
                className="w-full h-full "
              >
                <span className="flex w-full h-full justify-center items-center text-xl font-semibold border border-gray-300 rounded-l-md py-1 px-3 bg-white">
                  <span>Filtrar</span>
                </span>
              </button>

              {!showAllFilters ? null : (
                <div className=" z-10 top-0 w-full h-auto left-0  p-3 border flex flex-col items-center justify-around text-start bg-white shadow-sm rounded-md shadow-black absolute">
                  <h1>Filtrar</h1>
                  {/* Aquí van todos los filtros */}
                  {/* PRECIOS */}
                  <div className="relative w-full h-auto my-3  ">
                    <button
                      onClick={() => handleShowToggle(1)}
                      className=" w-full"
                    >
                      <span className=" flex justify-start">
                        <strong>Precio:</strong>{" "}
                        <p className="hidden md:block"> por habitación</p>
                      </span>
                      <span className="flex justify-between border border-gray-300 rounded-full py-1 px-3">
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
                      <div className=" z-10 top-0 w-full border flex flex-col text-start  bg-white shadow-sm rounded-2xl shadow-black">
                        <div className="flex flex-col px-6 py-3 w-full ">
                          <strong className="mb-4 text-xl text-center">
                            Define el rango de precios
                          </strong>
                          <label
                            htmlFor="priceMin"
                            className="flex flex-col w-full font-semibold text-md text-gray-700"
                          >
                            Desde:
                            <input
                              className=" h-8 w-full text-center text-lg font-light border rounded-md border-gray-300"
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
                              className=" h-8 w-full text-center text-lg font-light border rounded-md border-gray-300"
                              name="priceMax"
                              type="number"
                              placeholder="Precio máximo"
                              value={filters.maxPrice}
                              onChange={(e) =>
                                handleFilterChange("maxPrice", e.target.value)
                              }
                            />
                          </label>
                          <div className=" font-semibold text-xs mt-4">
                            * Los precios no incluyen cargos ni impuestos.
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
                                fontSize: "20px",
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
                                fontSize: "20px",
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
                  <div className=" relative w-full my-3 ">
                    <button
                      onClick={() => handleShowToggle(2)}
                      className="w-full"
                    >
                      <span className="  flex justify-start">
                        <strong>Filtros:</strong>
                      </span>
                      <span className="flex w-full justify-between border border-gray-300 rounded-full py-1 px-3">
                        <span>Elegir</span>
                        <span className="flex flex-col justify-center">
                          <img
                            src={arrowToggleIcon}
                            alt="*"
                            className={`${
                              showFiltros
                                ? "rotate-180 transition-custom"
                                : null
                            } w-4 h-4 transition-custom`}
                          />
                        </span>
                      </span>
                    </button>
                    {!showFiltros ? null : (
                      <div className="z-10 top-16 w-full  p-3 border flex flex-col text-start  bg-white shadow-sm rounded-xl shadow-black">
                        <section className="flex flex-col">
                          <strong className="mb-4 text-xl">
                            Puntuacion del sitio
                          </strong>
                          <section className={style.puntuacion}>
                            <div>
                              0-1{" "}
                              <img className="w-5 h-5" src={svgIcon} alt="*" />
                            </div>
                            <div>
                              2{" "}
                              <img className="w-5 h-5" src={svgIcon} alt="*" />
                            </div>
                            <div>
                              3{" "}
                              <img className="w-5 h-5" src={svgIcon} alt="*" />
                            </div>
                            <div>
                              4{" "}
                              <img className="w-5 h-5" src={svgIcon} alt="*" />
                            </div>
                            <div>
                              5{" "}
                              <img className="w-5 h-5" src={svgIcon} alt="*" />
                            </div>
                          </section>
                        </section>
                        <strong className="mb-4 text-xl">
                          Filtros populares
                        </strong>
                        <section
                          className={` ${style.filtrosPopulares} mb-4 flex flex-col font-semibold text-lg`}
                        >
                          <label>
                            <input
                              className="cursor-pointer h-5 w-5 mr-2"
                              type="checkbox"
                              checked={filters.wifi}
                              onChange={(e) =>
                                handleFilterChange(
                                  "wifi",
                                  e.target.checked ? 1 : 0
                                )
                              }
                            />
                            Wifi
                          </label>

                          <label>
                            <input
                              className="cursor-pointer h-5 w-5 mr-2"
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
                              className="cursor-pointer h-5 w-5 mr-2"
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
                              className="cursor-pointer h-5 w-5 mr-2"
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
                              className="cursor-pointer h-5 w-5 mr-2"
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
                                fontSize: "20px",
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
                                fontSize: "20px",
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
                  <div className="relative w-full h-auto my-3 ">
                    <button
                      onClick={() => handleShowToggle(3)}
                      className="w-full"
                    >
                      <span className="  flex justify-start">
                        <strong>Tipo:</strong>
                      </span>
                      <span className="flex w-full justify-between border border-gray-300 rounded-full py-1 px-3">
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
                      <div className=" z-10">
                        <div className="top-2 w-full  p-3 border flex flex-col text-start text-xl  bg-white shadow-sm rounded-md shadow-black ">
                          <strong className="mb-4">Tipos de propiedades</strong>
                          <div
                            className={` ${style.filtrosPopulares} mb-4 flex flex-col font-semibold`}
                          >
                            <label>
                              <input
                                className="cursor-pointer h-5 w-5 mr-2"
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
                                className="cursor-pointer h-5 w-5 mr-2"
                                type="checkbox"
                                name="type"
                                value="hotel"
                                checked={filters.type.includes("hotel")}
                                onChange={() =>
                                  handleFilterChange("type", "hotel")
                                }
                              />
                              Hotel
                            </label>
                            <label>
                              <input
                                className="cursor-pointer h-5 w-5 mr-2"
                                type="checkbox"
                                name="type"
                                value="casa"
                                checked={filters.type.includes("casa")}
                                onChange={() =>
                                  handleFilterChange("type", "casa")
                                }
                              />
                              Casa
                            </label>
                            <label>
                              <input
                                className="cursor-pointer h-5 w-5 mr-2"
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
                                className="cursor-pointer h-5 w-5 mr-2"
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
                                className="cursor-pointer h-5 w-5 mr-2"
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
                                className="cursor-pointer h-5 w-5 mr-2"
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
                                  fontSize: "20px",
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
                                  fontSize: "20px",
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
                  <div className="relative w-full my-3 ">
                    <button
                      onClick={() => handleShowToggle(4)}
                      className="w-full"
                    >
                      <span className="  flex justify-start">
                        <strong>Capacidad:</strong>
                      </span>
                      <span className="flex w-full justify-between border border-gray-300 rounded-full py-1 px-3">
                        <span>Elegir</span>
                        <span className="flex flex-col justify-center">
                          <img
                            src={arrowToggleIcon}
                            alt="*"
                            className={`${
                              showCapacity
                                ? "rotate-180 transition-custom"
                                : null
                            } w-4 h-4 transition-custom`}
                          />
                        </span>
                      </span>
                    </button>
                    {!showCapacity ? null : (
                      <div className=" z-10  w-full flex flex-col text-start  bg-white shadow-sm rounded-md shadow-black border">
                        <div className="flex flex-col px-6 py-3 w-full">
                          <strong className="mb-4 text-center text-2xl">
                            Define la capacidad
                          </strong>
                          <label
                            htmlFor="capacityMin"
                            className="flex flex-col w-full font-semibold text-xl text-gray-700"
                          >
                            Mínima capacidad:
                            <input
                              className=" h-8 w-full text-center text-lg font-light border rounded-md border-gray-300"
                              name="capacityMin"
                              type="number"
                              placeholder="Capacidad mínima"
                              value={filters.minCapacity}
                              onChange={(e) =>
                                handleFilterChange(
                                  "minCapacity",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                          <label
                            htmlFor="capacityMax"
                            className="flex flex-col w-full font-semibold text-xl text-gray-700"
                          >
                            Máxima capacidad:
                            <input
                              className=" h-8 w-full text-center text-lg font-light border rounded-md border-gray-300"
                              name="capacityMax"
                              type="number"
                              placeholder="Capacidad máxima"
                              value={filters.maxCapacity}
                              onChange={(e) =>
                                handleFilterChange(
                                  "maxCapacity",
                                  e.target.value
                                )
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
                                fontSize: "20px",
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
                                fontSize: "20px",
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
                  <div className=" w-full my-3 ">
                    <button
                      onClick={() => handleShowToggle(5)}
                      className="w-full"
                    >
                      <span className="  flex justify-start">
                        <strong>Ubicación:</strong>
                      </span>
                      <span className="flex w-full justify-between border border-gray-300 rounded-full py-1 px-3">
                        <span>Todas</span>
                        <span className="flex flex-col justify-center">
                          <img
                            src={arrowToggleIcon}
                            alt="*"
                            className={`${
                              showLocation
                                ? "rotate-180 transition-custom"
                                : null
                            } w-4 h-4 transition-custom`}
                          />
                        </span>
                      </span>
                    </button>
                    {!showLocation ? null : (
                      <div className=" w-full">
                        <div className="  w-full  p-3 border flex flex-col text-start  bg-white shadow-sm rounded-md shadow-black">
                          <strong className="mb-4 text-xl">Ubicaciones</strong>
                          <div
                            className={` ${style.filtrosPopulares} mb-4 flex flex-col font-semibold text-lg`}
                          >
                            <label>
                              <input
                                className="cursor-pointer h-5 w-5 mr-2"
                                type="checkbox"
                                name="location"
                                value=""
                                checked={filters.location.length === 0}
                                onChange={() =>
                                  handleFilterChange("location", "")
                                }
                              />
                              Todos
                            </label>
                            <label>
                              <input
                                className="cursor-pointer h-5 w-5 mr-2"
                                type="checkbox"
                                name="location"
                                value="el porvenir"
                                checked={filters.location.includes(
                                  "el porvenir"
                                )}
                                onChange={() =>
                                  handleFilterChange("location", "el porvenir")
                                }
                              />
                              El Porvenir
                            </label>
                            <label>
                              <input
                                className="cursor-pointer h-5 w-5 mr-2"
                                type="checkbox"
                                name="location"
                                value="buenos aires"
                                checked={filters.location.includes(
                                  "buenos aires"
                                )}
                                onChange={() =>
                                  handleFilterChange("location", "buenos aires")
                                }
                              />
                              Buenos Aires
                            </label>
                            <label>
                              <input
                                className="cursor-pointer h-5 w-5 mr-2"
                                type="checkbox"
                                name="location"
                                value="santa helena"
                                checked={filters.location.includes(
                                  "santa helena"
                                )}
                                onChange={() =>
                                  handleFilterChange("location", "santa helena")
                                }
                              />
                              Santa Helena
                            </label>
                            <label>
                              <input
                                className="cursor-pointer h-5 w-5 mr-2"
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
                                className="cursor-pointer h-5 w-5 mr-2"
                                type="checkbox"
                                name="location"
                                value="cuerna vaca"
                                checked={filters.location.includes(
                                  "cuerna vaca"
                                )}
                                onChange={() =>
                                  handleFilterChange("location", "cuerna vaca")
                                }
                              />
                              Cuerna Vaca
                            </label>
                            <label>
                              <input
                                className="cursor-pointer h-5 w-5 mr-2"
                                type="checkbox"
                                name="location"
                                value="puerto gaitan"
                                checked={filters.location.includes(
                                  "puerto gaitan"
                                )}
                                onChange={() =>
                                  handleFilterChange(
                                    "location",
                                    "puerto gaitan"
                                  )
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
                                  fontSize: "20px",
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
                                  fontSize: "20px",
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
                  {/*botones*/}
                  <div className="  py-2 w-full h-20">
                    <section className="flex justify-around h-full">
                      <button
                        onClick={() => {
                          handleResetFilterPrice();
                          handleResetFilterType();
                          handleResetFiltros();
                          handleResetFilterLocation();
                          handleResetFilterCapacity();
                        }}
                        className=" bg-slate-300 text-black hover:text-white font-bold px-2 rounded-l-md w-1/2  text-lg"
                      >
                        Limpiar
                      </button>

                      <button
                        onClick={handleShowAllFilters}
                        className="  bg-blue-400 text-white font-bold px-2 rounded-r-md w-1/2 hover:bg-blue-500 text-lg"
                      >
                        Aplicar
                      </button>
                    </section>
                  </div>
                </div>
              )}
            </div>
            <div className="w-1/2 h-full">
              <button
                onClick={() => handleShowSortBy()}
                className="w-full h-full"
              >
                <span className="flex w-full h-full justify-center items-center text-xl font-semibold border border-gray-300 rounded-r-md py-1 px-3 bg-white">
                  <span>Ordenar</span>
                </span>
              </button>

              {!showSortBy ? null : (
                <div className=" z-10 top-0 h-full w-full left-0 mt-1 p-3 border flex flex-col items-center justify-center text-start bg-white shadow-sm rounded-md shadow-black fixed">
                  <div className="w-full h-full ">
                    <span className=" w-full h-4/6 font-bold flex align-middle ">
                      <div className="flex flex-col justify-around items-start text-2xl">
                        <div>
                          <label>
                            <input
                              className="h-7 w-7 mr-2"
                              type="checkbox"
                              name="default"
                              value="default"
                              checked={sortBy === "default"}
                              onChange={handleSortChange}
                            />
                            Default
                          </label>
                        </div>
                        <div>
                          <label>
                            <input
                              className="h-7 w-7 mr-2"
                              type="checkbox"
                              name="precio"
                              value="precio"
                              checked={sortBy === "precio"}
                              onChange={handleSortChange}
                            />
                            Precio
                          </label>
                        </div>
                        <div>
                          <label>
                            <input
                              className="h-7 w-7 mr-2"
                              type="checkbox"
                              name="recomendados"
                              value="recomendados"
                              checked={sortBy === "recomendados"}
                              onChange={handleSortChange}
                            />
                            Recomendados
                          </label>
                        </div>
                        <div>
                          <label>
                            <input
                              className="h-7 w-7 mr-2"
                              type="checkbox"
                              name="puntuacion"
                              value="puntuacion"
                              checked={sortBy === "puntuacion"}
                              onChange={handleSortChange}
                            />
                            Puntuación
                          </label>
                        </div>
                        <div>
                          <label>
                            <input
                              className="h-7 w-7 mr-2"
                              type="checkbox"
                              name="puntuacion_recomendados"
                              value="puntuacion_recomendados"
                              checked={sortBy === "puntuacion_recomendados"}
                              onChange={handleSortChange}
                            />
                            Puntuación y Recom.
                          </label>
                        </div>
                        <div>
                          <label>
                            <input
                              className="h-7 w-7 mr-2"
                              type="checkbox"
                              name="precio_recomendados"
                              value="precio_recomendados"
                              checked={sortBy === "precio_recomendados"}
                              onChange={handleSortChange}
                            />
                            Precio y Recom.
                          </label>
                        </div>
                        <div>
                          {`Ver en orden `}
                          <button
                            onClick={handleSortType}
                            className="bg-blue-500  border-2 border-white rounded-lg text-white py-3 px-2"
                          >{`${
                            sortTypeAsc ? "Descendente" : "Ascendente"
                          }`}</button>
                        </div>
                      </div>
                    </span>
                  </div>

                  {/*BOTONES */}
                  <div className="  py-2 w-full h-20 ">
                    <section className="w-full h-full flex justify-around ">
                      <button
                        onClick={() => {
                          handleResetSortChange();
                        }}
                        className=" bg-slate-300 text-black border font-bold px-2 rounded-l-md w-1/2 text-lg"
                      >
                        Limpiar
                      </button>

                      <button
                        onClick={handleShowSortBy}
                        className=" bg-blue-400 text-white font-bold px-2 rounded-r-md w-1/2  hover:bg-blue-500 text-lg"
                      >
                        Aceptar
                      </button>
                    </section>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={style.Home}>
        <div className="w-full flex justify-center">
          <div className="w-11/12 flex justify-between ">
            <div
              className={`sortByContainer flex max-md:justify-center justify-between items-center w-full max-w-5xl mx-auto mt-2`}
            >
              <button className="w-2/6 h-full hidden md:block ">
                <span className="flex align-middle w-auto h-9">
                  <strong className="mr-2 pt-1 flex align-middle">
                    Ordenar
                  </strong>
                  <div className="flex items-center ">
                    <select
                      name="sortBy"
                      id="sorting-selector"
                      className="h-full w-full rounded-md border border-solid border-gray-500"
                      value={sortBy}
                      onChange={handleSortChange}
                    >
                      <option value="default">Default</option>
                      <option value="precio">Precio</option>
                      <option value="recomendados">Recomendados</option>
                      <option value="puntuacion">Puntuación</option>
                      <option value="puntuacion_recomendados">
                        Puntuación y Recomendados
                      </option>
                      <option value="precio_recomendados">
                        Precio y Recomendados
                      </option>
                    </select>
                    <div>
                      <img
                        onClick={handleSortType}
                        title={`${
                          sortTypeAsc
                            ? "Cambiar a orden Descendente"
                            : "Cambiar a orden Ascendente"
                        }`}
                        src={sortTypeIcon}
                        className="h-8 w-8 bg-white ml-1 border-4 border-blue-600 rounded-lg"
                        alt=""
                      />
                    </div>
                  </div>
                </span>
              </button>
              <div className={` max-md:flex  ${style.homeTOtalFound}`}>
                <p className="mr-2">Encontramos </p>
                <strong className="mr-2">{` ${filteredHotels.length}`}</strong>{" "}
                resultados
              </div>
              <button className="max-md:w-40 w-2/6 max-md:fixed  max-md:bottom-2 max-md:justify-center max-md:left-1/2 max-md:transform max-md:-translate-x-1/2 shadow-md rounded-md max-md:rounded-full">
                <div
                  className={`bg-white  border-white shadow  h-14 p-1 rounded-lg max-md:rounded-full`}
                >
                  <div
                    className={`  w-full h-full flex justify-center items-center bg-cover rounded-md max-md:rounded-full relative`}
                    style={{
                      backgroundImage:
                        "url(../../../../src/static/city-map-with-navigation-icons-vector.jpg)",
                    }}
                  >
                    <span
                      className={` flex justify-center items-center  border border-black h-8 w-30 px-4 text-center rounded-md bg-white absolute font-bold bg`}
                      onClick={() => {
                        handleShowMapContainer(true);
                      }}
                    >
                      <img src={locationIcon} alt="" className="h-4 mr-2 " />
                      Ver mapa
                    </span>
                  </div>
                </div>
              </button>
              {showMapContainer ? (
                <Maps
                  onClose={() => {
                    handleShowMapContainer(false);
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>

        <div className=" contenedor-de-cards w-full py-5 flex flex-col justify-center">
          <ol className="w-full flex flex-col justify-center">
            {isLoadingHotels ? (
              <SkeletonCardHotel />
            ) : (
              sortedHotels().map((el) => <CardHotel hotel={el} key={el.id} />)
            )}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Home;
