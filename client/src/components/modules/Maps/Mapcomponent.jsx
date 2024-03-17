import { useContext, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { geoLocationContext } from "../../../context/geoLocationContext";
import Loading from "../alerts/Loading";

const Maps = () => {
  const { isLoading, userLocation } = useContext(geoLocationContext);

  const position = userLocation;
  const [open, setOpen] = useState(false);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <APIProvider apiKey="AIzaSyAktQbJjjc9jr3FtxzSiMUdOpYViDQUGks">
      <div style={{ height: "100%", width: "100%" }}>
        <Map zoom={16} center={position} mapId={"82475a552b5a83d4"}>
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin
              background={"grey"}
              borderColor={"green"}
              glyphColor={"purple"}
            />
          </AdvancedMarker>

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
