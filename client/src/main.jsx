import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App.jsx";
import ProviderLogin from "./context/GlobalContextProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <ProviderLogin>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ProviderLogin>
);
