import { useContext, useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { geoLocationContext } from "../../../context/geoLocationContext";
import Loading from "../alerts/Loading";
import locationIcon from "../../../static/locationIcon.svg";

const Maps = ({ onClose, location }) => {
  const { isLoading, userLocation } = useContext(geoLocationContext);

  const position = userLocation;
  const [open, setOpen] = useState(false);
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  const mapId = process.env.REACT_APP_GOOGLE_MAPS_MAPID

 
  if (isLoading) {
    return <Loading />;
  }

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
          defaultZoom={16}
          defaultCenter={position}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId={mapId}
        >
          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <p>I'm in Hamburg</p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default Maps;
