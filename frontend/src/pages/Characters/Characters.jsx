import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Loading from "../../components/Loading/Loading";
import "./Characters.css";

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/characters")
      .then((res) => {
        setCharacters(res.data.data);
        setFiltered(res.data.data);
      })
      .catch(() => setError("Erro ao carregar personagens."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(characters.filter((c) => c.name.toLowerCase().includes(q)));
  }, [search, characters]);

  if (loading) return <Loading text="Carregando personagens..." />;

  return (
    <div className="characters-page">
      <div className="characters-header">
        <h1>Personagens</h1>
        <p>
          Encontre seu personagem favorito e veja todas as HQs que ele aparece.
        </p>
      </div>

      <div className="characters-search">
        <input
          type="text"
          placeholder="Buscar personagem..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && <p className="error-msg">{error}</p>}

      {!error && filtered.length === 0 && (
        <p className="empty-msg">Nenhum personagem encontrado.</p>
      )}

      <div className="characters-grid">
        {filtered.map((character) => (
          <Link
            to={`/characters/${character.id}`}
            key={character.id}
            className="character-card"
          >
            <div className="character-card-image">
              {character.imageUrl ? (
                <img src={character.imageUrl} alt={character.name} />
              ) : (
                <span className="character-card-initial">
                  {character.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="character-card-info">
              <h2 className="character-card-name">{character.name}</h2>
              <p className="character-card-desc">{character.description}</p>
              <span className="character-card-count">
                {character._count?.comics} HQs
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Characters;
