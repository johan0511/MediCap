import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Dash from "./Dash";
import Form from "./Components/Formulario";
import Tabla from "./Components/Tabla";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Dash />
    <Form />
    <Tabla />
  </React.StrictMode>
);
