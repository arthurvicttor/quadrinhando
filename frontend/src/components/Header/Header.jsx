import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

function Header() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          Quadrinhando
        </Link>

        <nav className="header-nav">
          <Link to="/universes">Universos</Link>
          <Link to="/characters">Personagens</Link>
        </nav>

        <div className="header-actions">
          {user ? (
            <>
              {isAdmin && <span className="header-admin-badge">Admin</span>}
              <span className="header-username">{user.name}</span>
              <button className="btn-logout" onClick={handleLogout}>
                Sair
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-login">
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
