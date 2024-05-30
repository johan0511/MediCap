const express = require("express");
const citaMedicaController = require("../Controllers/citas");
const rutaCitas = express.Router();

rutaCitas.get("/ver", citaMedicaController.obtenerCitas);
rutaCitas.get("/ver:id", citaMedicaController.obtenerCitaPorId);
rutaCitas.post("/crear", citaMedicaController.crearCita);
rutaCitas.put("/actualizar/:id", citaMedicaController.actualizarCita);
rutaCitas.delete("/eliminar/:id", citaMedicaController.eliminarCita);

module.exports = rutaCitas;
