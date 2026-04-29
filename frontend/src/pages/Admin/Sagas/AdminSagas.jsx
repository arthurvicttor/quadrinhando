import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import Loading from "../../../components/Loading/Loading";
import "./AdminSagas.css";

function AdminSagas() {
  const [sagas, setSagas] = useState([]);
  const [universes, setUniverses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    order: "",
    universeId: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [universesRes] = await Promise.all([api.get("/universes")]);
      setUniverses(universesRes.data.data);

      // Busca sagas de todos os universos
      const sagasAll = [];
      for (const u of universesRes.data.data) {
        const res = await api.get(`/universes/${u.slug}/sagas`);
        res.data.data.forEach((s) =>
          sagasAll.push({ ...s, universeName: u.name }),
        );
      }
      sagasAll.sort((a, b) => a.order - b.order);
      setSagas(sagasAll);
    } catch {
      setError("Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (saga) => {
    setEditing(saga.id);
    setForm({
      name: saga.name,
      description: saga.description || "",
      order: saga.order,
      universeId: saga.universeId || "",
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNew = () => {
    setEditing(null);
    setForm({ name: "", description: "", order: "", universeId: "" });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
    setForm({ name: "", description: "", order: "", universeId: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editing) {
        await api.put(`/sagas/${editing}`, {
          ...form,
          order: Number(form.order),
          universeId: Number(form.universeId),
        });
      } else {
        await api.post("/sagas", {
          ...form,
          order: Number(form.order),
          universeId: Number(form.universeId),
        });
      }
      await fetchData();
      handleCancel();
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao salvar saga.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que deseja excluir esta saga?")) return;
    try {
      await api.delete(`/sagas/${id}`);
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao excluir saga.");
    }
  };

  if (loading) return <Loading text="Carregando sagas..." />;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <Link to="/admin" className="admin-back">
            ← Painel
          </Link>
          <h1>Sagas</h1>
        </div>
        {!showForm && (
          <button className="btn-new" onClick={handleNew}>
            + Nova
          </button>
        )}
      </div>

      {error && <p className="admin-error">{error}</p>}

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <h2>{editing ? "Editar Saga" : "Nova Saga"}</h2>

          <div className="form-group">
            <label>Nome *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              placeholder="Ex: Guerra Civil"
            />
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Descrição da saga..."
              rows={3}
            />
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
              <label>Ordem *</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: e.target.value })}
                required
                placeholder="Ex: 1"
                min="1"
              />
            </div>
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
                  : "Criar saga"}
            </button>
          </div>
        </form>
      )}

      <div className="admin-list">
        {sagas.length === 0 && (
          <p className="empty-msg">Nenhuma saga cadastrada.</p>
        )}
        {sagas.map((saga) => (
          <div key={saga.id} className="admin-list-item">
            <div className="admin-saga-order">{saga.order}</div>
            <div className="admin-list-item-info">
              <span className="admin-list-item-label">{saga.universeName}</span>
              <h3>{saga.name}</h3>
              <span className="admin-list-item-meta">
                {saga._count?.comics} HQs
              </span>
            </div>
            <div className="admin-list-item-actions">
              <button className="btn-edit" onClick={() => handleEdit(saga)}>
                Editar
              </button>
              <button
                className="btn-delete"
                onClick={() => handleDelete(saga.id)}
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

export default AdminSagas;
