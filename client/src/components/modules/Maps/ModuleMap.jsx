import { useContext, useEffect, useRef, useState } from "react";
import markerBackgroundIcon from "../../../static/marker-bgd-03.svg";
import centerMapIcon from "../../../static/centerLocatio.svg";
import {
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  MapControl,
  ControlPosition,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { geoLocationContext } from "../../../context/geoLocationContext";
import Loading from "../alerts/Loading";
import locationIcon from "../../../static/locationIcon.svg";
import { REACT_APP_GOOGLE_MAPS_MAPID } from "../../../../env";
import CustomMapControl from "./autocomplete/MapControl";
import MapHandler from "./autocomplete/MapHandler";
const autocompleteModes = [
  { id: "classic", label: "Google Autocomplete Widget" },
  { id: "custom", label: "Custom Build" },
  { id: "custom-hybrid", label: "Custom w/ Select Widget" },
];

const Maps = ({ onClose, defaultCenter, capturedChoords, onPlaceSelected }) => {
  const mapId = REACT_APP_GOOGLE_MAPS_MAPID;
  const map = useMap();
  const { isLoading, userLocation, mainLocations } =
    useContext(geoLocationContext);
  const [open, setOpen] = useState(false);
  const [myCenter, setMyCenter] = useState(defaultCenter);
const [choordsToSave, setChoordsToSave] = useState(null)
  const choordsRef = useRef(null);

  const autocompleteModes = [
    { id: "classic", label: "Google Autocomplete Widget" },
    { id: "custom", label: "Custom Build" },
    { id: "custom-hybrid", label: "Custom w/ Select Widget" },
  ];

  //centrar el mapa en la ubicacion enviada desde el geolocationContexProvider
  useEffect(() => {
    if (!map) return;
    setMyCenter(defaultCenter);
    map.setCenter(defaultCenter);
  }, [map, defaultCenter]);
  
    

  if (isLoading) {
    return <Loading />;
  }

  const handleSetMainLocations = (e) => {
    const selectedLocation = e.target.value;
    if (!selectedLocation) {
      return;
    }

    if (selectedLocation === "El Porvenir") {
      map.setCenter(mainLocations[0].choords);
      setMyCenter(mainLocations[0].choords);
    }
    if (selectedLocation === "El Oasis") {
      map.setCenter(mainLocations[1].choords);
      setMyCenter(mainLocations[1].choords);
    }
    if (selectedLocation === "Santa Helena") {
      map.setCenter(mainLocations[2].choords);
      setMyCenter(mainLocations[2].choords);
    }
    if (selectedLocation === "Buenos Aires") {
      map.setCenter(mainLocations[3].choords);
      setMyCenter(mainLocations[3].choords);
    }
  };

  return (
    <div className=" h-[500px] w-screen px-2   rounded bg-white mb-10 ">
      <Map
        onClick={(event) => {
          const clickedLat = event.detail.latLng.lat;
          const clickedLng = event.detail.latLng.lng;
          console.log(
            "eventoClick: ",
            "lat:" + clickedLat,
            "lng:" + clickedLng
          );
          setMyCenter({ lat: clickedLat, lng: clickedLng });
        }}
        defaultZoom={16}
        defaultCenter={myCenter}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        mapId={mapId}
      >
        <AdvancedMarker
          position={myCenter}
          draggable={true}
          onClick={() => {
            setOpen(true);
          }}
          onDragEnd={(event) => {
            console.log("onDargEnd: ", event.latLng.lat(), event.latLng.lng());
            setMyCenter({
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            });
          }}
        >
          <div className=" relative  h-12 w-12 flex justify-center items-center ">
            <img className="w-12 h-12 " src={markerBackgroundIcon} alt="" />
            <span className="absolute flex justify-center items-center mb-2 text-[22px] z-10 text-white font-bold">
              H!
            </span>
          </div>
        </AdvancedMarker>
        {open && (
          <InfoWindow position={myCenter} onCloseClick={() => setOpen(false)}>
            <p
              ref={choordsRef}
              onClick={() => {
                if (choordsRef.current) {
                  //copiar las coordenadas del infowindow
                  const tempInput = document.createElement("input");
                  tempInput.value = JSON.stringify(myCenter);
                  document.body.appendChild(tempInput);
                  tempInput.select();
                  document.execCommand("copy");
                  document.body.removeChild(tempInput);
                }
              }}
              className="text-md"
            >
              {`${JSON.stringify(myCenter)}`}
            </p>
          </InfoWindow>
        )}
        <MapControl position={ControlPosition.TOP_CENTER}>
          <div className="h-auto w-auto mt-3 text-base shadow-xl ">
            {/* <button
              onClick={() => {
                map.setCenter(mainLocations[0].choords);
                console.log(mainLocations[0].choords);
                setMyCenter(mainLocations[0].choords);
              }}
              className="h-10 w-auto rounded-full bg-blue-500 text-white px-2 mx-3"
            >
              Mi propiedad
            </button> */}
            <select
              name="mainLocations"
              id="locationsMain"
              className="h-10 border rounded-md px-2 text-center"
              onChange={handleSetMainLocations}
            >
              <option value="">Sitios principales</option>
              <option value="El Porvenir">El Porvenir</option>
              <option value="Buenos Aires">Buenos Aires</option>
              <option value="Santa Helena">Santa Helena</option>
              <option value="El Oasis">El Oasis</option>
              <option value="">Cuernavaca</option>
              <option value="">Puerto Gaitán</option>
            </select>
          </div>
        </MapControl>

        <MapControl position={ControlPosition.BOTTOM_CENTER}>
          <div className="h-20 w-20">
            <button
              onClick={() => {
                capturedChoords(myCenter);
                onPlaceSelected(false)
              }}
              className="h-10 w-32 rounded-lg text-lg bg-blue-700 text-white border border-white shadow-lg flex justify-center items-center"
            >
              Confirmar
            </button>
          </div>
        </MapControl>

        <MapControl position={ControlPosition.TOP_RIGHT}>
          <div className="h-20 w-20 mt-3">
            <button
              onClick={() => {
                map.setCenter(myCenter);
              }}
              className="h-10 w-10 rounded-full  bg-blue-600 border border-gray-600 flex justify-center items-center"
            >
              <img className="w-7 h-7" src={centerMapIcon} alt="" />
            </button>
          </div>
        </MapControl>
      </Map>
    </div>
  );
};

export default Maps;
