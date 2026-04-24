import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import Loading from "../../../components/Loading/Loading";
import "./AdminCharacters.css";

function AdminCharacters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("/characters");
      setCharacters(res.data.data);
    } catch {
      setError("Erro ao carregar personagens.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (character) => {
    setEditing(character.id);
    setForm({
      name: character.name,
      description: character.description || "",
      imageUrl: character.imageUrl || "",
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNew = () => {
    setEditing(null);
    setForm({ name: "", description: "", imageUrl: "" });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
    setForm({ name: "", description: "", imageUrl: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await api.put(`/characters/${editing}`, form);
      } else {
        await api.post("/characters", form);
      }
      await fetchData();
      handleCancel();
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao salvar personagem.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este personagem?")) return;
    try {
      await api.delete(`/characters/${id}`);
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao excluir personagem.");
    }
  };

  if (loading) return <Loading text="Carregando personagens..." />;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <Link to="/admin" className="admin-back">
            ← Painel
          </Link>
          <h1>Personagens</h1>
        </div>
        {!showForm && (
          <button className="btn-new" onClick={handleNew}>
            + Novo
          </button>
        )}
      </div>

      {error && <p className="admin-error">{error}</p>}

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <h2>{editing ? "Editar Personagem" : "Novo Personagem"}</h2>

          <div className="form-group">
            <label>Nome *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              placeholder="Ex: Homem-Aranha (Peter Parker)"
            />
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Descrição do personagem..."
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>URL da imagem</label>
            <input
              type="url"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              placeholder="https://..."
            />
          </div>

          {form.imageUrl && (
            <div className="form-preview">
              <img src={form.imageUrl} alt="Preview" />
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn-save" disabled={saving}>
              {saving
                ? "Salvando..."
                : editing
                  ? "Salvar alterações"
                  : "Criar personagem"}
            </button>
          </div>
        </form>
      )}

      <div className="admin-list">
        {characters.length === 0 && (
          <p className="empty-msg">Nenhum personagem cadastrado.</p>
        )}
        {characters.map((character) => (
          <div key={character.id} className="admin-list-item">
            <div className="admin-list-item-image">
              {character.imageUrl ? (
                <img src={character.imageUrl} alt={character.name} />
              ) : (
                <span>{character.name.charAt(0)}</span>
              )}
            </div>
            <div className="admin-list-item-info">
              <h3>{character.name}</h3>
              <span className="admin-list-item-meta">
                {character._count?.comics} HQs
              </span>
            </div>
            <div className="admin-list-item-actions">
              <button
                className="btn-edit"
                onClick={() => handleEdit(character)}
              >
                Editar
              </button>
              <button
                className="btn-delete"
                onClick={() => handleDelete(character.id)}
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

export default AdminCharacters;
