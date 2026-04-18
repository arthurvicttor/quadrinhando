import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <span className="hero-tag">Marvel • DC • e muito mais</span>
          <h1 className="hero-title">
            Sua guia definitiva de <span>quadrinhos</span>
          </h1>
          <p className="hero-subtitle">
            Descubra a ordem cronológica certa, conheça personagens e nunca mais
            se perca no universo das HQs.
          </p>
          <div className="hero-actions">
            <Link to="/universes" className="btn-primary">
              Explorar Universos
            </Link>
            <Link to="/characters" className="btn-secondary">
              Ver Personagens
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon-wrap">🌌</div>
          <div className="feature-info">
            <h3>Universos</h3>
            <p>Explore a Terra-616 da Marvel, o Universo DC e muito mais.</p>
          </div>
        </div>
        <div className="feature-card">
          <div className="feature-icon-wrap">📚</div>
          <div className="feature-info">
            <h3>Ordem Cronológica</h3>
            <p>Saiba exatamente qual HQ ler primeiro e nunca mais se perder.</p>
          </div>
        </div>
        <div className="feature-card">
          <div className="feature-icon-wrap">🦸</div>
          <div className="feature-info">
            <h3>Personagens</h3>
            <p>Descubra em quais HQs seu personagem favorito aparece.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
