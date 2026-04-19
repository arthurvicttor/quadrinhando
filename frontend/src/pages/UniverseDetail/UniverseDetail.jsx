import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import Loading from "../../components/Loading/Loading";
import "./UniverseDetail.css";

function UniverseDetail() {
  const { id } = useParams();
  const [universe, setUniverse] = useState(null);
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      api.get(`/universes/${id}`),
      api.get(`/universes/${id}/comics`),
    ])
      .then(([universeRes, comicsRes]) => {
        setUniverse(universeRes.data.data);
        setComics(comicsRes.data.data.comics);
      })
      .catch(() => setError("Erro ao carregar universo."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading text="Carregando universo..." />;
  if (error) return <p className="error-msg">{error}</p>;
  if (!universe) return null;

  return (
    <div className="universe-detail">
      {/* Banner */}
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
              <span>{universe._count?.comics} HQs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Eventos */}
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

      {/* HQs - scroll horizontal */}
      <div className="universe-section">
        <div className="section-header">
          <h2 className="section-title">
            Ordem de Leitura
            <span className="section-count">{comics.length} HQs</span>
          </h2>
        </div>

        {comics.length === 0 ? (
          <p className="empty-msg">Nenhuma HQ cadastrada neste universo.</p>
        ) : (
          <div className="comics-scroll">
            {comics.map((comic, index) => (
              <Link
                to={`/comics/${comic.id}`}
                key={comic.id}
                className="comic-card"
              >
                <div className="comic-card-cover">
                  {comic.coverUrl ? (
                    <img src={comic.coverUrl} alt={comic.title} />
                  ) : (
                    <div className="comic-card-no-cover">
                      <span>#{comic.orderInUniverse}</span>
                    </div>
                  )}
                  <div className="comic-card-order">{index + 1}</div>
                </div>
                <div className="comic-card-info">
                  <p className="comic-card-title">{comic.title}</p>
                  {comic.issueNumber && (
                    <p className="comic-card-issue">
                      Vol.{comic.volume} #{comic.issueNumber}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UniverseDetail;
