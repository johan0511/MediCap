import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import Dashboard from "./Dash";
import AgendarCita from "./Components/Formulario";
import ConsultarCita from "./Components/Tabla";

function App() {
  return (
    <BrowserRouter>
      <NextUIProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/agendarcita" element={<AgendarCita />} />
          <Route path="/consultarcita" element={<ConsultarCita />} />
        </Routes>
      </NextUIProvider>
    </BrowserRouter>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
