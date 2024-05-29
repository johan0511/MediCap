const Modal = ({ formData, onConfirm, onEdit, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirmar Cita</h2>
        <p>Verifique que los datos sean correctos:</p>
        <ul>
          <li>Nombres: {formData.firstName}</li>
          <li>Apellidos: {formData.lastName}</li>
          <li>Número de cédula: {formData.idNumber}</li>
          <li>Número de teléfono: {formData.phoneNumber}</li>
          <li>Género: {formData.gender}</li>
          <li>Tipo de cita médica: {formData.appointmentType}</li>
          <li>Fecha de cita: {formData.appointmentDate}</li>
          <li>Hora de cita: {formData.appointmentTime}</li>
          <li>Síntomas: {formData.symptoms}</li>
        </ul>
        <div className="modal-buttons">
          <button onClick={onConfirm}>Confirmar</button>
          <button onClick={onEdit}>Editar Datos</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
