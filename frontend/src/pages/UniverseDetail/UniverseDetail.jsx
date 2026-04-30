import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import Loading from "../../components/Loading/Loading";
import "./UniverseDetail.css";

function UniverseDetail() {
  const { slug } = useParams();
  const [universe, setUniverse] = useState(null);
  const [sagas, setSagas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      api.get(`/universes/${slug}`),
      api.get(`/universes/${slug}/sagas`),
    ])
      .then(([universeRes, sagasRes]) => {
        setUniverse(universeRes.data.data);
        setSagas(sagasRes.data.data);
      })
      .catch(() => setError("Erro ao carregar universo."))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loading text="Carregando universo..." />;
  if (error) return <p className="error-msg">{error}</p>;
  if (!universe) return null;

  return (
    <div className="universe-detail">
      <div className="universe-banner">
        <div className="universe-banner-bg" />
        <div className="universe-banner-content">
          {universe.company?.logoUrl && (
            <img
              src={universe.company.logoUrl}
              alt={universe.company.name}
              className="universe-banner-logo"
            />
          )}
          <div className="universe-banner-info">
            <span className="universe-banner-company">
              {universe.company?.name}
            </span>
            <h1 className="universe-banner-title">{universe.name}</h1>
            <p className="universe-banner-desc">{universe.description}</p>
            <div className="universe-banner-meta">
              {universe.startYear && <span>Desde {universe.startYear}</span>}
              <span>{sagas.length} sagas</span>
            </div>
          </div>
        </div>
      </div>

      {universe.events?.length > 0 && (
        <div className="universe-section">
          <h2 className="section-title">Eventos</h2>
          <div className="events-list">
            {universe.events.map((event) => (
              <div key={event.id} className="event-tag">
                {event.name}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="universe-section">
        <h2 className="section-title">
          Sagas
          <span className="section-count">{sagas.length} sagas</span>
        </h2>

        {sagas.length === 0 ? (
          <p className="empty-msg">Nenhuma saga cadastrada neste universo.</p>
        ) : (
          <div className="sagas-list">
            {sagas.map((saga, index) => (
              <Link
                to={`/universos/${slug}/sagas/${saga.slug}`}
                key={saga.id}
                className="saga-card"
              >
                <div className="saga-card-order">{index + 1}</div>
                <div className="saga-card-info">
                  <h3 className="saga-card-name">{saga.name}</h3>
                  {saga.description && (
                    <p className="saga-card-desc">{saga.description}</p>
                  )}
                  <span className="saga-card-count">
                    {saga._count?.comics} HQs
                  </span>
                </div>
                <span className="saga-card-arrow">→</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UniverseDetail;
