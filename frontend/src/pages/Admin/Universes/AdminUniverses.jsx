import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import Loading from "../../../components/Loading/Loading";
import "./AdminUniverses.css";

function AdminUniverses() {
  const [universes, setUniverses] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    startYear: "",
    companyId: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [universesRes, companiesRes] = await Promise.all([
        api.get("/universes"),
        api.get("/companies"),
      ]);
      setUniverses(universesRes.data.data);
      setCompanies(companiesRes.data.data);
    } catch {
      setError("Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (universe) => {
    setEditing(universe.id);
    setForm({
      name: universe.name,
      description: universe.description || "",
      startYear: universe.startYear || "",
      companyId: universe.company?.id || "",
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNew = () => {
    setEditing(null);
    setForm({ name: "", description: "", startYear: "", companyId: "" });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
    setForm({ name: "", description: "", startYear: "", companyId: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await api.put(`/universes/${editing}`, {
          ...form,
          startYear: form.startYear ? Number(form.startYear) : null,
          companyId: Number(form.companyId),
        });
      } else {
        await api.post("/universes", {
          ...form,
          startYear: form.startYear ? Number(form.startYear) : null,
          companyId: Number(form.companyId),
        });
      }
      await fetchData();
      handleCancel();
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao salvar universo.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este universo?")) return;
    try {
      await api.delete(`/universes/${id}`);
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao excluir universo.");
    }
  };

  if (loading) return <Loading text="Carregando universos..." />;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <Link to="/admin" className="admin-back">
            ← Painel
          </Link>
          <h1>Universos</h1>
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
          <h2>{editing ? "Editar Universo" : "Novo Universo"}</h2>

          <div className="form-group">
            <label>Nome *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              placeholder="Ex: Marvel 616 (Terra-616)"
            />
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Descrição do universo..."
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Ano de início</label>
              <input
                type="number"
                value={form.startYear}
                onChange={(e) =>
                  setForm({ ...form, startYear: e.target.value })
                }
                placeholder="Ex: 1961"
              />
            </div>

            <div className="form-group">
              <label>Editora *</label>
              <select
                value={form.companyId}
                onChange={(e) =>
                  setForm({ ...form, companyId: e.target.value })
                }
                required
              >
                <option value="">Selecione...</option>
                {companies.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
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
                  : "Criar universo"}
            </button>
          </div>
        </form>
      )}

      <div className="admin-list">
        {universes.length === 0 && (
          <p className="empty-msg">Nenhum universo cadastrado.</p>
        )}
        {universes.map((universe) => (
          <div key={universe.id} className="admin-list-item">
            <div className="admin-list-item-info">
              <span className="admin-list-item-label">
                {universe.company?.name}
              </span>
              <h3>{universe.name}</h3>
              <span className="admin-list-item-meta">
                {universe._count?.comics} HQs
                {universe.startYear && ` • Desde ${universe.startYear}`}
              </span>
            </div>
            <div className="admin-list-item-actions">
              <button className="btn-edit" onClick={() => handleEdit(universe)}>
                Editar
              </button>
              <button
                className="btn-delete"
                onClick={() => handleDelete(universe.id)}
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

export default AdminUniverses;
