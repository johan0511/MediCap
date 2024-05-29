import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleAgendarCita = () => {
    navigate("/agendarcita");
  };

  const handleVerificarCita = () => {
    navigate("/consultarcita");
  };

  return (
    <div className="dashboard-container">
      <div className="button-container">
        <button className="neon-button" onClick={handleAgendarCita}>
          <span className="button-text">Agendar Cita</span>
        </button>
        <button className="neon-button" onClick={handleVerificarCita}>
          <span className="button-text">Verificar Cita</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
