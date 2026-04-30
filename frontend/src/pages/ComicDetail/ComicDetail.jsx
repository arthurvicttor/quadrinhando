import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import Loading from "../../components/Loading/Loading";
import "./ComicDetail.css";

function ComicDetail() {
  const { slug } = useParams();
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/comics/${slug}`)
      .then((res) => setComic(res.data.data))
      .catch(() => setError("Erro ao carregar HQ."))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loading text="Carregando HQ..." />;
  if (error) return <p className="error-msg">{error}</p>;
  if (!comic) return null;

  return (
    <div className="comic-detail">
      {/* Banner */}
      <div className="comic-banner">
        <div className="comic-banner-bg" />
        <div className="comic-banner-content">
          <div className="comic-banner-cover">
            {comic.coverUrl ? (
              <img src={comic.coverUrl} alt={comic.title} />
            ) : (
              <div className="comic-banner-no-cover">
                <span>#{comic.orderInUniverse}</span>
              </div>
            )}
          </div>
          <div className="comic-banner-info">
            {comic.universe && (
              <Link
                to={`/universos/${comic.saga?.universe?.slug}`}
                className="comic-banner-universe"
              >
                ← {comic.saga?.universe?.name}
              </Link>
            )}
            <h1 className="comic-banner-title">{comic.title}</h1>
            <div className="comic-banner-meta">
              {comic.volume && <span>Volume {comic.volume}</span>}
              {comic.issueNumber && (
                <span>Número da Edição: #{comic.issueNumber}</span>
              )}
            </div>

            {comic.officialBuyLink && (
              <a
                href={comic.officialBuyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-buy"
              >
                Comprar oficialmente
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Personagens */}
      {comic.characters?.length > 0 && (
        <div className="comic-section">
          <h2 className="section-title">
            Personagens
            <span className="section-count">{comic.characters.length}</span>
          </h2>
          <div className="characters-scroll">
            {comic.characters.map((rel) => (
              <Link
                to={`/personagens/${rel.character.slug}`}
                key={rel.character.id}
                className="character-chip"
              >
                <div className="character-chip-image">
                  {rel.character.imageUrl ? (
                    <img
                      src={rel.character.imageUrl}
                      alt={rel.character.name}
                    />
                  ) : (
                    <span>{rel.character.name.charAt(0)}</span>
                  )}
                </div>
                <p className="character-chip-name">{rel.character.name}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ComicDetail;
