const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Asegúrate de proporcionar una contraseña si la base de datos requiere autenticación.
  database: "medicap",
});

db.connect((err) => {
  if (err) {
    console.error("Error al conectar en la base de datos", err);
    return;
  }
  console.log("Conexion Existosa a la base de datos.");
});

// Manejar la señal SIGINT para cerrar la conexión cuando se detiene la aplicación.
process.on("SIGINT", () => {
  db.end(); // Cerrar la conexión con la base de datos.
  process.exit(); // Salir del proceso de Node.js.
});

module.exports = db;
