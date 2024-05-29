import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const VerificarCitaMedica = () => {
  const [data, setData] = useState([
    {
      id: 1,
      firstName: "Juan",
      lastName: "Pérez",
      idNumber: "123456789",
      phoneNumber: "1234567890",
      gender: "Masculino",
      appointmentType: "Medicina general",
      appointmentDate: "2023-06-15",
      appointmentTime: "10:00",
      symptoms: "Dolor de cabeza, fiebre",
    },
    {
      id: 2,
      firstName: "María",
      lastName: "Gómez",
      idNumber: "987654321",
      phoneNumber: "0987654321",
      gender: "Femenino",
      appointmentType: "Odontología",
      appointmentDate: "2023-06-20",
      appointmentTime: "15:30",
      symptoms: "Dolor de muelas",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewInfo = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleDeleteAppointment = (id) => {
    setData(data.filter((appointment) => appointment.id !== id));
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
    setIsModalOpen(false);
  };

  const filteredData = data.filter(
    (item) =>
      item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.idNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.appointmentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.appointmentDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.appointmentTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.symptoms.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <header>
        <h1>Verificar Cita Médica</h1>
      </header>
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Número de cédula</th>
              <th>Número de teléfono</th>
              <th>Género</th>
              <th>Tipo de cita</th>
              <th>Fecha de cita</th>
              <th>Hora de cita</th>
              <th>Síntomas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.idNumber}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.gender}</td>
                <td>{item.appointmentType}</td>
                <td>{item.appointmentDate}</td>
                <td>{item.appointmentTime}</td>
                <td>{item.symptoms}</td>
                <td>
                  <button onClick={() => handleViewInfo(item)}>
                    Ver información
                  </button>
                  <button onClick={() => handleDeleteAppointment(item.id)}>
                    Eliminar cita
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Información de la cita"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <span className="close" onClick={handleCloseModal}>
            &times;
          </span>
          {selectedAppointment && (
            <>
              <h2>Información de la cita</h2>
              <p>
                <strong>Nombres:</strong> {selectedAppointment.firstName}
              </p>
              <p>
                <strong>Apellidos:</strong> {selectedAppointment.lastName}
              </p>
              <p>
                <strong>Número de cédula:</strong> {selectedAppointment.idNumber}
              </p>
              <p>
                <strong>Número de teléfono:</strong>{" "}
                {selectedAppointment.phoneNumber}
              </p>
              <p>
                <strong>Género:</strong> {selectedAppointment.gender}
              </p>
              <p>
                <strong>Tipo de cita:</strong> {selectedAppointment.appointmentType}
              </p>
              <p>
                <strong>Fecha de cita:</strong> {selectedAppointment.appointmentDate}
              </p>
              <p>
                <strong>Hora de cita:</strong> {selectedAppointment.appointmentTime}
              </p>
              <p>
                <strong>Síntomas:</strong> {selectedAppointment.symptoms}
              </p>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default VerificarCitaMedica;