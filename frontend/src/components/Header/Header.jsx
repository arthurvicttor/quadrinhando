import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

function Header() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo" onClick={closeMenu}>
          Quadrinhando
        </Link>

        <nav className="header-nav">
          <Link to="/universos">Universos</Link>
          <Link to="/personagens">Personagens</Link>
        </nav>

        <div className="header-actions">
          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="btn-admin">
                  Painel
                </Link>
              )}
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

        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <nav className="mobile-nav">
          <Link to="/universos" onClick={closeMenu}>
            Universos
          </Link>
          <Link to="/personagens" onClick={closeMenu}>
            Personagens
          </Link>
        </nav>
        <div className="mobile-actions">
          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="btn-admin" onClick={closeMenu}>
                  Painel
                </Link>
              )}
              <button className="btn-logout" onClick={handleLogout}>
                Sair
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-login" onClick={closeMenu}>
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
