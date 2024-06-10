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



const Maps = ({ onClose }) => {



 

  const mapId = REACT_APP_GOOGLE_MAPS_MAPID;
  const map = useMap();
  const { isLoading, userLocation, mainLocations } =
    useContext(geoLocationContext);
  const [open, setOpen] = useState(false);
  const [myLocation, setMyLocation] = useState({
    lat: 3.763696,
    lng: -71.362796,
  });
  const [myCenter, setMyCenter] = useState(userLocation);
  const choordsRef = useRef(null);

  const autocompleteModes = [
    { id: "classic", label: "Google Autocomplete Widget" },
    { id: "custom", label: "Custom Build" },
    { id: "custom-hybrid", label: "Custom w/ Select Widget" },
  ];
  const [selectedAutocompleteMode, setSelectedAutocompleteMode] = useState(
    autocompleteModes[0]
  );
  const [selectedPlace, setSelectedPlace] = useState(null);

  //centrar el mapa en la ubicacion enviada desde el geolocationContexProvider
  useEffect(() => {
    if (!map) return;
    map.setCenter(myCenter);
  }, [map]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className=" z-20 h-screen w-full rounded fixed top-0 right-0 bg-white p-4">
      <span
        className={` flex justify-center items-center  border border-black h-8 w-30 px-4 text-center rounded-md bg-white  font-bold bg cursor-pointer`}
        onClick={onClose}
      >
        <img src={locationIcon} alt="" className="h-4 mr-2 " />
        Ocultar mapa
      </span>

      <Map
        draggableCursor={true}
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
            setMyLocation({
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            });
            setMyCenter({
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            });
            console.log(myLocation);
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
          <InfoWindow position={myLocation} onCloseClick={() => setOpen(false)}>
            <p
              ref={choordsRef}
              onClick={() => {
                if (choordsRef.current) {
                  //copiar las coordenadas del infowindow
                  const tempInput = document.createElement("input");
                  tempInput.value = JSON.stringify(myLocation);
                  document.body.appendChild(tempInput);
                  tempInput.select();
                  document.execCommand("copy");
                  document.body.removeChild(tempInput);
                }
              }}
              className="text-xl"
            >
              {`${JSON.stringify(myLocation)}`}
            </p>
          </InfoWindow>
        )}
        <MapControl position={ControlPosition.TOP_LEFT}>
          <div className="h-20 w-auto">
            <button
              onClick={() => {
                map.setCenter(mainLocations[0].choords);
                console.log(mainLocations[0].choords);
                setMyCenter(mainLocations[0].choords);
              }}
              className="h-10 w-auto rounded-full bg-blue-500 text-white px-2 mx-3"
            >
              Mi propiedad
            </button>
          </div>
        </MapControl>
        <MapControl position={ControlPosition.BOTTOM_CENTER}>
          <div className="h-20 w-20">
            <button
              onClick={() => {
                map.setCenter(myCenter);
              }}
              className="h-10 w-10 rounded-full bg-white border border-gray-600 flex justify-center items-center"
            >
              <img className="w-7 h-7" src={centerMapIcon} alt="" />
            </button>
          </div>
        </MapControl>
        <CustomMapControl
        controlPosition={ControlPosition.TOP_CENTER}
        selectedAutocompleteMode={selectedAutocompleteMode}
        onPlaceSelect={setSelectedPlace}
      />
      <MapHandler place={selectedPlace} />
      </Map>
    </div>
  );
};

export default Maps;
