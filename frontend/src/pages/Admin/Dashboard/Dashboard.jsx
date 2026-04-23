import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./Dashboard.css";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Painel Admin</h1>
        <p>Bem-vindo, {user?.name}. Gerencie o conteúdo do Quadrinhando.</p>
      </div>

      <div className="dashboard-grid">
        <Link to="/admin/universes" className="dashboard-card">
          <span className="dashboard-card-icon">🌌</span>
          <div className="dashboard-card-info">
            <h2>Universos</h2>
            <p>Criar, editar e excluir universos</p>
          </div>
          <span className="dashboard-card-arrow">→</span>
        </Link>

        <Link to="/admin/characters" className="dashboard-card">
          <span className="dashboard-card-icon">🦸</span>
          <div className="dashboard-card-info">
            <h2>Personagens</h2>
            <p>Criar, editar e excluir personagens</p>
          </div>
          <span className="dashboard-card-arrow">→</span>
        </Link>

        <Link to="/admin/comics" className="dashboard-card">
          <span className="dashboard-card-icon">📚</span>
          <div className="dashboard-card-info">
            <h2>HQs</h2>
            <p>Criar, editar e excluir HQs</p>
          </div>
          <span className="dashboard-card-arrow">→</span>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
