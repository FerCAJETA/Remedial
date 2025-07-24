import React, { useState, useEffect } from 'react';

const API = "http://localhost:3001/api/teachers";
const SUBJECTS_API = "http://localhost:3001/api/subjects";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    subjects: []
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(API, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setTeachers(data));
    fetch(SUBJECTS_API, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setSubjects(data));
  }, []);

  const handleChange = e => {
    const { name, value, type, selectedOptions } = e.target;
    if (type === 'select-multiple') {
      setForm({ ...form, [name]: Array.from(selectedOptions, option => option.value) });
    } else {
      setForm({ ...form, [name]: value });
    }
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
          .then(data => setTeachers(data));
        setForm({ first_name: '', last_name: '', phone: '', email: '', subjects: [] });
        setEditingId(null);
        setMessage(editingId ? 'Profesor actualizado' : 'Profesor creado');
      } else {
        setMessage('Error al guardar');
      }
    } catch {
      setMessage('Error de conexión');
    }
  };

  const handleEdit = (id) => {
    const teacher = teachers.find(t => t._id === id);
    setForm({
      first_name: teacher.first_name,
      last_name: teacher.last_name,
      phone: teacher.phone,
      email: teacher.email,
      subjects: teacher.subjects?.map(s => s._id) || []
    });
    setEditingId(id);
  };

  const handleDelete = async (id) => {
    setMessage('');
    try {
      const res = await fetch(`${API}/${id}`, { method: 'DELETE', credentials: 'include' });
      if (res.ok) {
        setTeachers(teachers.filter(t => t._id !== id));
        setMessage('Profesor eliminado');
      } else {
        setMessage('Error al eliminar');
      }
    } catch {
      setMessage('Error de conexión');
    }
  };

  return (
    <div className="container">
      <h2>Profesores</h2>
      <form onSubmit={handleSubmit}>
        <input name="first_name" value={form.first_name} onChange={handleChange} placeholder="Nombre(s)" required />
        <input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Apellido(s)" required />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Teléfono" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <select name="subjects" value={form.subjects} onChange={handleChange} multiple required>
          {subjects.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
        </select>
        <button type="submit">{editingId ? 'Actualizar' : 'Agregar'}</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ first_name: '', last_name: '', phone: '', email: '', subjects: [] }); }}>Cancelar</button>}
      </form>
      {message && <p>{message}</p>}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Materias</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map(t => (
              <tr key={t._id}>
                <td>{t.first_name}</td>
                <td>{t.last_name}</td>
                <td>{t.phone}</td>
                <td>{t.email}</td>
                <td>{t.subjects?.map(s => s.name).join(', ')}</td>
                <td>
                  <button onClick={() => handleEdit(t._id)}>Editar</button>
                  <button onClick={() => handleDelete(t._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teachers; 