import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound-content">
        <span className="notfound-code">404</span>
        <h1 className="notfound-title">Página não encontrada</h1>
        <p className="notfound-desc">
          Parece que essa página foi para outra dimensão. Que tal explorar os
          universos que temos?
        </p>
        <div className="notfound-actions">
          <Link to="/" className="btn-primary">
            Voltar para Home
          </Link>
          <Link to="/universos" className="btn-secondary">
            Ver Universos
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
