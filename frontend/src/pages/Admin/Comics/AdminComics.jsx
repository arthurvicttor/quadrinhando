import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import Loading from "../../../components/Loading/Loading";
import "./AdminComics.css";

function AdminComics() {
  const [comics, setComics] = useState([]);
  const [universes, setUniverses] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    volume: "1",
    issueNumber: "",
    universeId: "",
    orderInUniverse: "",
    coverUrl: "",
    officialBuyLink: "",
    characters: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [comicsRes, universesRes, charactersRes] = await Promise.all([
        api.get("/comics"),
        api.get("/universes"),
        api.get("/characters"),
      ]);
      setComics(comicsRes.data.data);
      setUniverses(universesRes.data.data);
      setCharacters(charactersRes.data.data);
    } catch {
      setError("Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (comic) => {
    setEditing(comic.id);
    setForm({
      title: comic.title,
      volume: comic.volume || "1",
      issueNumber: comic.issueNumber || "",
      universeId: comic.universe?.id || "",
      orderInUniverse: comic.orderInUniverse || "",
      coverUrl: comic.coverUrl || "",
      officialBuyLink: comic.officialBuyLink || "",
      characters:
        comic.characters?.map((c) => ({
          characterId: c.character.id,
          appearanceOrder: c.appearanceOrder,
        })) || [],
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNew = () => {
    setEditing(null);
    setForm({
      title: "",
      volume: "1",
      issueNumber: "",
      universeId: "",
      orderInUniverse: "",
      coverUrl: "",
      officialBuyLink: "",
      characters: [],
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
  };

  const handleAddCharacter = () => {
    setForm({
      ...form,
      characters: [
        ...form.characters,
        { characterId: "", appearanceOrder: form.characters.length + 1 },
      ],
    });
  };

  const handleRemoveCharacter = (index) => {
    setForm({
      ...form,
      characters: form.characters.filter((_, i) => i !== index),
    });
  };

  const handleCharacterChange = (index, field, value) => {
    const updated = [...form.characters];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, characters: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        title: form.title,
        volume: Number(form.volume),
        issueNumber: form.issueNumber ? Number(form.issueNumber) : null,
        universeId: Number(form.universeId),
        orderInUniverse: Number(form.orderInUniverse),
        coverUrl: form.coverUrl || null,
        officialBuyLink: form.officialBuyLink || null,
        characters: form.characters
          .filter((c) => c.characterId)
          .map((c) => ({
            characterId: Number(c.characterId),
            appearanceOrder: Number(c.appearanceOrder),
          })),
      };

      if (editing) {
        await api.put(`/comics/${editing}`, payload);
      } else {
        await api.post("/comics", payload);
      }

      await fetchData();
      handleCancel();
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao salvar HQ.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que deseja excluir esta HQ?")) return;
    try {
      await api.delete(`/comics/${id}`);
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao excluir HQ.");
    }
  };

  if (loading) return <Loading text="Carregando HQs..." />;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <Link to="/admin" className="admin-back">
            ← Painel
          </Link>
          <h1>HQs</h1>
        </div>
        {!showForm && (
          <button className="btn-new" onClick={handleNew}>
            + Nova HQ
          </button>
        )}
      </div>

      {error && <p className="admin-error">{error}</p>}

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <h2>{editing ? "Editar HQ" : "Nova HQ"}</h2>

          <div className="form-group">
            <label>Título *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              placeholder="Ex: Guerra Civil"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Volume</label>
              <input
                type="number"
                value={form.volume}
                onChange={(e) => setForm({ ...form, volume: e.target.value })}
                min="1"
                placeholder="1"
              />
            </div>
            <div className="form-group">
              <label>Número da edição</label>
              <input
                type="number"
                value={form.issueNumber}
                onChange={(e) =>
                  setForm({ ...form, issueNumber: e.target.value })
                }
                placeholder="Ex: 1"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Universo *</label>
              <select
                value={form.universeId}
                onChange={(e) =>
                  setForm({ ...form, universeId: e.target.value })
                }
                required
              >
                <option value="">Selecione...</option>
                {universes.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Ordem na timeline *</label>
              <input
                type="number"
                value={form.orderInUniverse}
                onChange={(e) =>
                  setForm({ ...form, orderInUniverse: e.target.value })
                }
                required
                placeholder="Ex: 1"
                min="1"
              />
            </div>
          </div>

          <div className="form-group">
            <label>URL da capa</label>
            <input
              type="url"
              value={form.coverUrl}
              onChange={(e) => setForm({ ...form, coverUrl: e.target.value })}
              placeholder="https://..."
            />
          </div>

          {form.coverUrl && (
            <div className="form-cover-preview">
              <img src={form.coverUrl} alt="Preview da capa" />
            </div>
          )}

          <div className="form-group">
            <label>Link oficial de compra</label>
            <input
              type="url"
              value={form.officialBuyLink}
              onChange={(e) =>
                setForm({ ...form, officialBuyLink: e.target.value })
              }
              placeholder="https://..."
            />
          </div>

          {/* Personagens */}
          <div className="form-section">
            <div className="form-section-header">
              <label>Personagens</label>
              <button
                type="button"
                className="btn-add-character"
                onClick={handleAddCharacter}
              >
                + Adicionar
              </button>
            </div>

            {form.characters.length === 0 && (
              <p className="form-empty">Nenhum personagem adicionado.</p>
            )}

            {form.characters.map((char, index) => (
              <div key={index} className="character-row">
                <select
                  value={char.characterId}
                  onChange={(e) =>
                    handleCharacterChange(index, "characterId", e.target.value)
                  }
                >
                  <option value="">Selecione...</option>
                  {characters.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={char.appearanceOrder}
                  onChange={(e) =>
                    handleCharacterChange(
                      index,
                      "appearanceOrder",
                      e.target.value,
                    )
                  }
                  placeholder="Ordem"
                  min="1"
                />
                <button
                  type="button"
                  className="btn-remove-character"
                  onClick={() => handleRemoveCharacter(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn-save" disabled={saving}>
              {saving
                ? "Salvando..."
                : editing
                  ? "Salvar alterações"
                  : "Criar HQ"}
            </button>
          </div>
        </form>
      )}

      <div className="admin-list">
        {comics.length === 0 && (
          <p className="empty-msg">Nenhuma HQ cadastrada.</p>
        )}
        {comics.map((comic) => (
          <div key={comic.id} className="admin-list-item">
            <div className="admin-comic-cover">
              {comic.coverUrl ? (
                <img src={comic.coverUrl} alt={comic.title} />
              ) : (
                <span>#{comic.orderInUniverse}</span>
              )}
            </div>
            <div className="admin-list-item-info">
              <span className="admin-list-item-label">
                {comic.universe?.name}
              </span>
              <h3>{comic.title}</h3>
              <span className="admin-list-item-meta">
                Vol.{comic.volume}
                {comic.issueNumber && ` #${comic.issueNumber}`}
                {` • Ordem ${comic.orderInUniverse}`}
              </span>
            </div>
            <div className="admin-list-item-actions">
              <button className="btn-edit" onClick={() => handleEdit(comic)}>
                Editar
              </button>
              <button
                className="btn-delete"
                onClick={() => handleDelete(comic.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminComics;
