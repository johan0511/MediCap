import React, { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import Modal from "react-modal";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
`;

const Tr = styled.tr`
  border-bottom: 1px solid #dddddd;

  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const Th = styled.th`
  padding: 0.75rem;
  text-align: left;
  background-color: #333333;
  color: white;
`;

const Td = styled.td`
  padding: 0.75rem;
  text-align: left;
`;

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  font-size: 2.5rem;
  color: #333333;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background-color: #333333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #666666;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;

  & > div {
    display: flex;
    flex-direction: column;
  }
`;

const FullWidthGridItem = styled.div`
  grid-column: span 2;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #333333;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #cccccc;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #cccccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #cccccc;
  border-radius: 4px;
  resize: vertical;
`;

const ModalContent = styled.div`
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  float: right;

  &:hover {
    background: #ff4c4c;
  }
`;

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
    <FormContainer>
      <FormTitle>Agendar Cita Médica</FormTitle>
      <form onSubmit={handleSubmit}>
        <GridContainer>
          <div>
            <Label htmlFor="firstName">Nombres:</Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Apellidos:</Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="idNumber">Número de cédula:</Label>
            <Input
              type="text"
              id="idNumber"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="phoneNumber">Número de teléfono:</Label>
            <Input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="gender">Género:</Label>
            <Select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="appointmentType">Tipo de cita médica:</Label>
            <Select
              id="appointmentType"
              name="appointmentType"
              value={formData.appointmentType}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar tipo de cita</option>
              <option value="Medicina general">Medicina general</option>
              <option value="Odontologia">Odontología</option>
              <option value="Urgencia">Urgencia</option>
              <option value="Pediatria">Pediatría</option>
              <option value="Psicologia">Psicología</option>
              <option value="Trabajo Social">Trabajo Social</option>
              <option value="Matrona">Matrona</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="appointmentDate">Fecha de cita:</Label>
            <Input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="appointmentTime">Hora de cita:</Label>
            <Input
              type="time"
              id="appointmentTime"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              required
            />
          </div>
          <FullWidthGridItem>
            <Label htmlFor="symptoms">Síntomas:</Label>
            <Textarea
              id="symptoms"
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              required
            />
          </FullWidthGridItem>
        </GridContainer>
        <Button type="submit">Agendar Cita</Button>
      </form>
      <Table>
        <thead>
          <Tr>
            <Th>Nombres</Th>
            <Th>Apellidos</Th>
            <Th>Número de cédula</Th>
            <Th>Número de teléfono</Th>
            <Th>Género</Th>
            <Th>Acciones</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr>
            <Td>{formData.firstName}</Td>
            <Td>{formData.lastName}</Td>
            <Td>{formData.idNumber}</Td>
            <Td>{formData.phoneNumber}</Td>
            <Td>{formData.gender}</Td>
            <Td>
              <Button>Ver información</Button>
              <Button>Eliminar cita</Button>
            </Td>
          </Tr>
        </tbody>
      </Table>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmar Datos"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            maxWidth: "500px",
            margin: "0 auto",
            padding: "2rem",
            borderRadius: "8px",
            position: "relative",
          },
        }}
      >
        <ModalContent>
          <CloseButton onClick={closeModal}>X</CloseButton>
          <h2>Confirmar Datos</h2>
          <div style={{ textAlign: "left", fontSize: "1rem" }}>
            <p>
              <strong>Nombres:</strong> {formData.firstName}
            </p>
            <p>
              <strong>Apellidos:</strong> {formData.lastName}
            </p>
            <p>
              <strong>Número de cédula:</strong> {formData.idNumber}
            </p>
            <p>
              <strong>Número de teléfono:</strong> {formData.phoneNumber}
            </p>
            <p>
              <strong>Género:</strong> {formData.gender}
            </p>
            <p>
              <strong>Tipo de cita médica:</strong> {formData.appointmentType}
            </p>
            <p>
              <strong>Fecha de cita:</strong> {formData.appointmentDate}
            </p>
            <p>
              <strong>Hora de cita:</strong> {formData.appointmentTime}
            </p>
            <p>
              <strong>Síntomas:</strong> {formData.symptoms}
            </p>
          </div>
          <Button onClick={confirmAppointment}>Confirmar</Button>
        </ModalContent>
      </Modal>
    </FormContainer>
  );
};

export default AppointmentForm;
