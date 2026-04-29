import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            Quadrinhando
          </Link>
          <p>
            Sua guia definitiva para explorar o universo dos quadrinhos em ordem
            cronológica.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>Explorar</h4>
            <Link to="/universos">Universos</Link>
            <Link to="/personagens">Personagens</Link>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <span>Apenas metadados</span>
            <span>Sem conteúdo protegido</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Quadrinhando. Feito com ❤️ para fãs de
          HQs.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
