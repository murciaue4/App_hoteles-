import { useContext, useEffect, useRef, useState } from "react";
import markerBackgroundIcon from "../../../static/marker-bgd-03.svg";
import centerMapIcon from "../../../static/centerLocatio.svg";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  MapControl,
  ControlPosition,
  useMap
} from "@vis.gl/react-google-maps";
import { geoLocationContext } from "../../../context/geoLocationContext";
import Loading from "../alerts/Loading";
import locationIcon from "../../../static/locationIcon.svg";
import { REACT_APP_GOOGLE_MAPS_API_KEY } from "../../../../env";
import { REACT_APP_GOOGLE_MAPS_MAPID } from "../../../../env";

const Maps = ({ onClose }) => {
  const { isLoading, userLocation, mainLocations } = useContext(geoLocationContext);

  const [open, setOpen] = useState(false);
  const apiKey = REACT_APP_GOOGLE_MAPS_API_KEY;
  const mapId = REACT_APP_GOOGLE_MAPS_MAPID;
  const [position, setPosition] = useState(userLocation);
  const [myLocation, setMyLocation] = useState({
    lat: 3.763696,
    lng: -71.362796,
  });
  const [myCenter, setMyCenter] = useState(position);

  const choordsRef = useRef(null);

  if (isLoading) {
    return <Loading />;
  }
const map = useMap()
console.log(map);
  return (
    <APIProvider apiKey={apiKey}>
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
              })
              
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
            <InfoWindow position={center} onCloseClick={() => setOpen(false)}>
              <p
                ref={choordsRef}
                onClick={() => {
                  if (choordsRef.current) {
                    //copiar las coordenadas del infowindow
                    const tempInput = document.createElement("input");
                    tempInput.value = JSON.stringify(center);
                    document.body.appendChild(tempInput);
                    tempInput.select();
                    document.execCommand("copy");
                    document.body.removeChild(tempInput);
                  }
                }}
                className="text-xl"
              >
                {`${JSON.stringify(center)}`}
              </p>
            </InfoWindow>
          )}
          <MapControl position={ControlPosition.TOP_LEFT}>
            <div className="h-20 w-auto">
              <button
                onClick={() => {
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
                  setCenter(position);
                  
                }}
                className="h-10 w-10 rounded-full bg-white border border-gray-600 flex justify-center items-center"
              >
                <img className="w-7 h-7" src={centerMapIcon} alt="" />
              </button>
            </div>
          </MapControl>
        </Map>
      </div>
    </APIProvider>
  );
};

export default Maps;
