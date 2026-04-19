import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Loading from "../../components/Loading/Loading";
import "./Universes.css";

function Universes() {
  const [universes, setUniverses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/universes")
      .then((res) => {
        setUniverses(res.data.data);
        setFiltered(res.data.data);
      })
      .catch(() => setError("Erro ao carregar universos."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      universes.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.company?.name.toLowerCase().includes(q),
      ),
    );
  }, [search, universes]);

  if (loading) return <Loading text="Carregando universos..." />;

  return (
    <div className="universes-page">
      <div className="universes-header">
        <h1>Universos</h1>
        <p>Escolha um universo para explorar a ordem cronológica das HQs.</p>
      </div>

      {/* Filtro de busca */}
      <div className="universes-search">
        <input
          type="text"
          placeholder="Buscar universo ou editora..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && <p className="error-msg">{error}</p>}

      {!error && filtered.length === 0 && (
        <p className="empty-msg">Nenhum universo encontrado.</p>
      )}

      <div className="universes-grid">
        {filtered.map((universe) => (
          <Link
            to={`/universes/${universe.id}`}
            key={universe.id}
            className="universe-card"
          >
            <div className="universe-card-banner">
              {universe.company?.logoUrl ? (
                <img
                  src={universe.company.logoUrl}
                  alt={universe.company.name}
                />
              ) : (
                <span className="universe-card-initial">
                  {universe.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="universe-card-info">
              <span className="universe-card-company">
                {universe.company?.name}
              </span>
              <h2 className="universe-card-name">{universe.name}</h2>
              <p className="universe-card-desc">{universe.description}</p>
              <div className="universe-card-footer">
                {universe.startYear && <span>Desde {universe.startYear}</span>}
                <span>{universe._count?.comics} HQs</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Universes;
