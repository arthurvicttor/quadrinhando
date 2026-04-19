import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import Loading from "../../components/Loading/Loading";
import "./CharacterDetail.css";

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      api.get(`/characters/${id}`),
      api.get(`/characters/${id}/comics`),
    ])
      .then(([characterRes, comicsRes]) => {
        setCharacter(characterRes.data.data);
        setComics(comicsRes.data.data.comics);
      })
      .catch(() => setError("Erro ao carregar personagem."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading text="Carregando personagem..." />;
  if (error) return <p className="error-msg">{error}</p>;
  if (!character) return null;

  return (
    <div className="character-detail">
      {/* Banner */}
      <div className="character-banner">
        <div className="character-banner-bg" />
        <div className="character-banner-content">
          <div className="character-banner-image">
            {character.imageUrl ? (
              <img src={character.imageUrl} alt={character.name} />
            ) : (
              <span className="character-banner-initial">
                {character.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="character-banner-info">
            <h1 className="character-banner-name">{character.name}</h1>
            <p className="character-banner-desc">{character.description}</p>
            <span className="character-banner-count">
              {character._count?.comics} HQs
            </span>
          </div>
        </div>
      </div>

      {/* HQs — scroll horizontal */}
      <div className="character-section">
        <div className="section-header">
          <h2 className="section-title">
            Aparições
            <span className="section-count">{comics.length} HQs</span>
          </h2>
        </div>

        {comics.length === 0 ? (
          <p className="empty-msg">
            Nenhuma HQ cadastrada para este personagem.
          </p>
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
                      <span>#{index + 1}</span>
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
                  {comic.universe && (
                    <p className="comic-card-universe">{comic.universe.name}</p>
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

export default CharacterDetail;
