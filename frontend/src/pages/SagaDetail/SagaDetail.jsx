import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import Loading from "../../components/Loading/Loading";
import "./SagaDetail.css";

function SagaDetail() {
  const { universoSlug, sagaSlug } = useParams();
  const [saga, setSaga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/sagas/${sagaSlug}`)
      .then((res) => setSaga(res.data.data))
      .catch(() => setError("Erro ao carregar saga."))
      .finally(() => setLoading(false));
  }, [sagaSlug]);

  if (loading) return <Loading text="Carregando saga..." />;
  if (error) return <p className="error-msg">{error}</p>;
  if (!saga) return null;

  return (
    <div className="saga-detail">
      <div className="saga-banner">
        <div className="saga-banner-bg" />
        <div className="saga-banner-content">
          <Link to={`/universos/${universoSlug}`} className="saga-banner-back">
            ← {saga.universe?.name}
          </Link>
          <h1 className="saga-banner-title">{saga.name}</h1>
          {saga.description && (
            <p className="saga-banner-desc">{saga.description}</p>
          )}
          <div className="saga-banner-meta">
            <span>{saga.comics?.length} HQs</span>
          </div>
        </div>
      </div>

      <div className="saga-section">
        <div className="section-header">
          <h2 className="section-title">
            Ordem de Leitura
            <span className="section-count">{saga.comics?.length} HQs</span>
          </h2>
        </div>

        {saga.comics?.length === 0 ? (
          <p className="empty-msg">Nenhuma HQ cadastrada nesta saga.</p>
        ) : (
          <div className="comics-scroll">
            {saga.comics?.map((comic, index) => (
              <Link
                to={`/hqs/${comic.slug}`}
                key={comic.id}
                className="comic-card"
              >
                <div className="comic-card-cover">
                  {comic.coverUrl ? (
                    <img src={comic.coverUrl} alt={comic.title} />
                  ) : (
                    <div className="comic-card-no-cover">
                      <span>#{comic.orderInSaga}</span>
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

export default SagaDetail;
