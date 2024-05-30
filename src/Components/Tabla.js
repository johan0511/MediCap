import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { saveAs } from "file-saver";
import Swal from "sweetalert2";

Modal.setAppElement("#root");

const VerificarCitaMedica = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/citas/ver");
      setData(response.data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewInfo = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleDeleteAppointment = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/citas/eliminar/${id}`);
      setData(data.filter((appointment) => appointment.id !== id));
    } catch (error) {
      console.error("Error al eliminar la cita:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
    setIsModalOpen(false);
  };

  const handleDownloadCertificate = () => {
    Swal.fire({
      title: "¿En qué formato deseas descargar?",
      showCancelButton: true,
      confirmButtonText: "PDF",
      cancelButtonText: "Word",
    }).then((result) => {
      if (result.isConfirmed) {
        if (selectedAppointment) {
          downloadCertificate(selectedAppointment, "pdf");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        if (selectedAppointment) {
          downloadCertificate(selectedAppointment, "docx");
        }
      }
    });
  };
  const downloadCertificate = (appointment, format) => {
    if (format === "pdf") {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("Certificado de Cita Médica", 20, 20);
      doc.setFontSize(12);
      const rows = [
        ["Nombres", appointment.firstName],
        ["Apellidos", appointment.lastName],
        ["Número de cédula", appointment.idNumber],
        ["Número de teléfono", appointment.phoneNumber],
        ["Género", appointment.gender],
        ["Tipo de cita", appointment.appointmentType],
        ["Fecha de cita", appointment.appointmentDate],
        ["Hora de cita", appointment.appointmentTime],
        ["Síntomas", appointment.symptoms],
      ];
      doc.autoTable({
        startY: 30,
        head: [["Detalle", "Valor"]],
        body: rows,
        styles: { fontSize: 12 },
        columnStyles: { 0: { halign: "right" } },
      });
      doc.save("certificado_cita_medica.pdf");
    } else if (format === "docx") {
      const rows = [
        ["Nombres", appointment.firstName],
        ["Apellidos", appointment.lastName],
        ["Número de cédula", appointment.idNumber],
        ["Número de teléfono", appointment.phoneNumber],
        ["Género", appointment.gender],
        ["Tipo de cita", appointment.appointmentType],
        ["Fecha de cita", appointment.appointmentDate],
        ["Hora de cita", appointment.appointmentTime],
        ["Síntomas", appointment.symptoms],
      ];
      const table = `
        <table>
          <thead>
            <tr>
              <th>Detalle</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            ${rows
              .map(
                (row) => `
                  <tr>
                    <td>${row[0]}</td>
                    <td>${row[1]}</td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
      `;
      const fileContent = `
        <html>
          <head>
            <title>Certificado de Cita Médica</title>
            <style>
              table {
                border-collapse: collapse;
                width: 100%;
              }
              th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
              }
              th {
                background-color: #f2f2f2;
              }
            </style>
          </head>
          <body>
            <h1>Certificado de Cita Médica</h1>
            ${table}
          </body>
        </html>
      `.trim();
      const blob = new Blob([fileContent], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      saveAs(blob, "certificado_cita_medica.docx");
    }
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
                <strong>Número de cédula:</strong>{" "}
                {selectedAppointment.idNumber}
              </p>
              <p>
                <strong>Número de teléfono:</strong>{" "}
                {selectedAppointment.phoneNumber}
              </p>
              <p>
                <strong>Género:</strong> {selectedAppointment.gender}
              </p>
              <p>
                <strong>Tipo de cita:</strong>{" "}
                {selectedAppointment.appointmentType}
              </p>
              <p>
                <strong>Fecha de cita:</strong>{" "}
                {selectedAppointment.appointmentDate}
              </p>
              <p>
                <strong>Hora de cita:</strong>{" "}
                {selectedAppointment.appointmentTime}
              </p>
              <p>
                <strong>Síntomas:</strong> {selectedAppointment.symptoms}
              </p>
              <button onClick={handleDownloadCertificate}>
                Descargar certificado
              </button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default VerificarCitaMedica;
