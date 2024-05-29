import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    idNumber: "",
    phoneNumber: "",
    gender: "",
    appointmentDate: "",
    appointmentTime: "",
    symptoms: "",
    appointmentType: "",
  });

  const [appointmentCost, setAppointmentCost] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const appointmentCosts = {
    "Medicina general": 8500,
    Odontologia: 9700,
    Urgencia: 12000,
    Pediatria: 6500,
    Psicologia: 9000,
    "Trabajo Social": 7000,
    Matrona: 8000,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "appointmentType") {
      setAppointmentCost(appointmentCosts[value] || 0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmAppointment = () => {
    setIsModalOpen(false);
    Swal.fire({
      title: "Costo de la Cita",
      text: `El costo de la cita médica tiene un precio de: $${appointmentCost.toLocaleString()} pesos colombianos`,
      confirmButtonText: "Generar Cita",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Cita Generada",
          html: `
            <p>Gracias por elegir MedicApp</p>
            <p>El turno de la cita es el A${
              Math.floor(Math.random() * 100) + 1
            }</p>
          `,
          confirmButtonText: "OK",
        });

        // Aquí puedes realizar acciones adicionales, como enviar los datos al servidor
        console.log(formData);
        // Limpia los campos del formulario después de enviar
        setFormData({
          firstName: "",
          lastName: "",
          idNumber: "",
          phoneNumber: "",
          gender: "",
          appointmentDate: "",
          appointmentTime: "",
          symptoms: "",
          appointmentType: "",
        });
        setAppointmentCost(0);
      }
    });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Agendar Cita Médica</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid-container">
          <div>
            <label htmlFor="firstName" className="label">Nombres:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="label">Apellidos:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          <div>
            <label htmlFor="idNumber" className="label">Número de cédula:</label>
            <input
              type="text"
              id="idNumber"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="label">Número de teléfono:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          <div>
            <label htmlFor="gender" className="label">Género:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="select"
            >
              <option value="">Seleccionar género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div>
            <label htmlFor="appointmentType" className="label">Tipo de cita médica:</label>
            <select
              id="appointmentType"
              name="appointmentType"
              value={formData.appointmentType}
              onChange={handleChange}
              required
              className="select"
            >
              <option value="">Seleccionar tipo de cita</option>
              <option value="Medicina general">Medicina general</option>
              <option value="Odontologia">Odontología</option>
              <option value="Urgencia">Urgencia</option>
              <option value="Pediatria">Pediatría</option>
              <option value="Psicologia">Psicología</option>
              <option value="Trabajo Social">Trabajo Social</option>
              <option value="Matrona">Matrona</option>
            </select>
          </div>
          <div>
            <label htmlFor="appointmentDate" className="label">Fecha de cita:</label>
            <input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          <div>
            <label htmlFor="appointmentTime" className="label">Hora de cita:</label>
            <input
              type="time"
              id="appointmentTime"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          <div className="full-width-grid-item">
            <label htmlFor="symptoms" className="label">Síntomas:</label>
            <textarea
              id="symptoms"
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              required
              className="textarea"
            />
          </div>
        </div>
        <button type="submit" className="button">Agendar Cita</button>
      </form>
    </div>
  );
};

export default AppointmentForm;