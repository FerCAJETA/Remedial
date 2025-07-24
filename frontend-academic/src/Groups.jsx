import React, { useState, useEffect } from 'react';

const API = "http://localhost:3001/api/groups";
const CAREERS_API = "http://localhost:3001/api/careers";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [careers, setCareers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    career: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(API, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setGroups(data));
    fetch(CAREERS_API, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setCareers(data));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${API}/${editingId}` : API;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form)
      });
      if (res.ok) {
        fetch(API, { credentials: 'include' })
          .then(res => res.json())
          .then(data => setGroups(data));
        setForm({ name: '', career: '' });
        setEditingId(null);
        setMessage(editingId ? 'Grupo actualizado' : 'Grupo creado');
      } else {
        setMessage('Error al guardar');
      }
    } catch {
      setMessage('Error de conexión');
    }
  };

  const handleEdit = (id) => {
    const group = groups.find(g => g._id === id);
    setForm({
      name: group.name,
      career: group.career?._id || group.career
    });
    setEditingId(id);
  };

  const handleDelete = async (id) => {
    setMessage('');
    try {
      const res = await fetch(`${API}/${id}`, { method: 'DELETE', credentials: 'include' });
      if (res.ok) {
        setGroups(groups.filter(g => g._id !== id));
        setMessage('Grupo eliminado');
      } else {
        setMessage('Error al eliminar');
      }
    } catch {
      setMessage('Error de conexión');
    }
  };

  return (
    <div className="container">
      <h2>Grupos</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre del grupo" required />
        <select name="career" value={form.career} onChange={handleChange} required>
          <option value="">Selecciona una carrera</option>
          {careers.map(c => <option key={c._id} value={c._id}>{c.career_name}</option>)}
        </select>
        <button type="submit">{editingId ? 'Actualizar' : 'Agregar'}</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', career: '' }); }}>Cancelar</button>}
      </form>
      {message && <p>{message}</p>}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Carrera</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {groups.map(g => (
              <tr key={g._id}>
                <td>{g.name}</td>
                <td>{g.career?.career_name || ''}</td>
                <td>
                  <button onClick={() => handleEdit(g._id)}>Editar</button>
                  <button onClick={() => handleDelete(g._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Groups; 