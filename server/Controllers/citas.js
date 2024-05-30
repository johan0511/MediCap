const db = require("../Models/database").promise();

const obtenerCitas = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM CitasMedicas;");
    res.json(result);
  } catch (error) {
    console.error("Error al obtener citas:", error);
    res.status(500).json({ error: "Error al obtener citas." });
  }
};

const obtenerCitaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(
      "SELECT * FROM CitasMedicas WHERE citaId = ?;",
      [id]
    );
    res.json(result[0] || {});
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: "Error al obtener la cita." });
  }
};

const crearCita = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      idNumber,
      phoneNumber,
      gender,
      appointmentDate,
      appointmentTime,
      symptoms,
      appointmentType,
    } = req.body;
    const [result] = await db.query(
      "INSERT INTO CitasMedicas (firstName, lastName, idNumber, phoneNumber, gender, appointmentType, appointmentDate, appointmentTime, symptoms) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        firstName,
        lastName,
        idNumber,
        phoneNumber,
        gender,
        appointmentType,
        appointmentDate,
        appointmentTime,
        symptoms,
      ]
    );
    res.json({ message: "Cita creada correctamente", id: result.insertId });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: "Error al crear la cita." });
  }
};

const actualizarCita = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    await db.query(
      "UPDATE CitasMedicas SET firstName = ?, lastName = ?, idNumber = ?, phoneNumber = ?, gender = ?, appointmentType = ?, appointmentDate = ?, appointmentTime = ?, symptoms = ? WHERE citaId = ?",
      [
        body.firstName,
        body.lastName,
        body.idNumber,
        body.phoneNumber,
        body.gender,
        body.appointmentType,
        body.appointmentDate,
        body.appointmentTime,
        body.symptoms,
        id,
      ]
    );
    res.json({ message: "Cita actualizada correctamente" });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: "Error al actualizar la cita." });
  }
};

const eliminarCita = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM CitasMedicas WHERE citaId = ?", [id]);
    res.json({ message: "Cita eliminada correctamente" });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: "Error al eliminar la cita." });
  }
};

module.exports = {
  obtenerCitas,
  obtenerCitaPorId,
  crearCita,
  actualizarCita,
  eliminarCita,
};
