import React, { useState, useEffect } from 'react';

const API = "http://localhost:3001/api/subjects";
const CAREERS_API = "http://localhost:3001/api/careers";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [careers, setCareers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    code: '',
    career: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(API, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setSubjects(data));
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
          .then(data => setSubjects(data));
        setForm({ name: '', description: '', code: '', career: '' });
        setEditingId(null);
        setMessage(editingId ? 'Materia actualizada' : 'Materia creada');
      } else {
        setMessage('Error al guardar');
      }
    } catch {
      setMessage('Error de conexión');
    }
  };

  const handleEdit = (id) => {
    const subject = subjects.find(s => s._id === id);
    setForm({
      name: subject.name,
      description: subject.description,
      code: subject.code,
      career: subject.career?._id || subject.career
    });
    setEditingId(id);
  };

  const handleDelete = async (id) => {
    setMessage('');
    try {
      const res = await fetch(`${API}/${id}`, { method: 'DELETE', credentials: 'include' });
      if (res.ok) {
        setSubjects(subjects.filter(s => s._id !== id));
        setMessage('Materia eliminada');
      } else {
        setMessage('Error al eliminar');
      }
    } catch {
      setMessage('Error de conexión');
    }
  };

  return (
    <div className="container">
      <h2>Materias</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre de la materia" required />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Descripción" required />
        <input name="code" value={form.code} onChange={handleChange} placeholder="Código" required />
        <select name="career" value={form.career} onChange={handleChange} required>
          <option value="">Selecciona una carrera</option>
          {careers.map(c => <option key={c._id} value={c._id}>{c.career_name}</option>)}
        </select>
        <button type="submit">{editingId ? 'Actualizar' : 'Agregar'}</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', description: '', code: '', career: '' }); }}>Cancelar</button>}
      </form>
      {message && <p>{message}</p>}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Código</th>
              <th>Carrera</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map(s => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.description}</td>
                <td>{s.code}</td>
                <td>{s.career?.career_name || ''}</td>
                <td>
                  <button onClick={() => handleEdit(s._id)}>Editar</button>
                  <button onClick={() => handleDelete(s._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subjects; 