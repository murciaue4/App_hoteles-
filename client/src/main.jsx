import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App.jsx";
import ProviderLogin from "./context/GlobalContextProvider.jsx";
import { APIProvider } from '@vis.gl/react-google-maps';
import { REACT_APP_GOOGLE_MAPS_API_KEY } from "../env.js";

import ProviderLocatiom from "./context/GeoLocationContextProvider.jsx";
const apiKey = REACT_APP_GOOGLE_MAPS_API_KEY;
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <APIProvider apiKey={apiKey}>
      <ProviderLocatiom>
        <BrowserRouter>
    <ProviderLogin>
          <App />
    </ProviderLogin>
        </BrowserRouter>
      </ProviderLocatiom>
    </APIProvider>
  </StrictMode>
);
