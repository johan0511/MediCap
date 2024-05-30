const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const citaRoutes = require("./Routers/citas"); // Cambio de nombre de la variable rutaCitas a citaRoutes para mayor claridad

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: "http://localhost:3001",
  methods: ["GET", "POST", "PUT", "DELETE"], // Cambio de cadena a array para métodos permitidos
};
app.use(cors(corsOptions));

// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json());

// Rutas
app.use("/citas", citaRoutes); // Usamos las rutas de citas médicas en la ruta "/citas"

// Manejo de errores para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).send("Ruta no encontrada");
});

// Manejo de errores internos del servidor
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error interno del servidor");
});

// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
