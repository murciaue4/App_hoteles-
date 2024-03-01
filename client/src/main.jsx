import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App.jsx";
import ProviderLogin from "./context/GlobalContextProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProviderLogin>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProviderLogin>
  </StrictMode>
);
