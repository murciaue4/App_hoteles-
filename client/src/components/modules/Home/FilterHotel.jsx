import React from 'react';

import style from "./FilterHotel.module.css";

const FilterHome = () => {
  return (
    <div>
      <div className="h-auto w-full flex flex-col  bg-white  ">
        <div className="w-full flex justify-center  ">
          <div className=" w-11/12  flex justify-center mt-5 ">
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
                {!showFiltros ? null : (
                  <div className=" absolute  z-10 top-16 w-96  p-3 border flex flex-col text-start  bg-white shadow-sm rounded-md shadow-black">
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
                {!showCapacity ? null : (
                  <div className=" absolute z-10 top-16 -right-0 w-72 flex flex-col text-start  bg-white shadow-sm rounded-md shadow-black border">
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
                  <span className="flex w-full justify-between border border-gray-300 rounded-full py-1 px-3">
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
    </div>
  );
};

export default FilterHome;