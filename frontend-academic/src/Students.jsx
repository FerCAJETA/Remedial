import React, { useState, useEffect } from 'react';

const API = "http://localhost:3001/api/students";
const GROUPS_API = "http://localhost:3001/api/groups";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    institutional_account: '',
    email: '',
    group: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(API, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setStudents(data));
    fetch(GROUPS_API, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setGroups(data));
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
          .then(data => setStudents(data));
        setForm({ first_name: '', last_name: '', phone: '', institutional_account: '', email: '', group: '' });
        setEditingId(null);
        setMessage(editingId ? 'Estudiante actualizado' : 'Estudiante creado');
      } else {
        setMessage('Error al guardar');
      }
    } catch {
      setMessage('Error de conexión');
    }
  };

  const handleEdit = (id) => {
    const student = students.find(s => s._id === id);
    setForm({
      first_name: student.first_name,
      last_name: student.last_name,
      phone: student.phone,
      institutional_account: student.institutional_account,
      email: student.email,
      group: student.group?._id || student.group
    });
    setEditingId(id);
  };

  const handleDelete = async (id) => {
    setMessage('');
    try {
      const res = await fetch(`${API}/${id}`, { method: 'DELETE', credentials: 'include' });
      if (res.ok) {
        setStudents(students.filter(s => s._id !== id));
        setMessage('Estudiante eliminado');
      } else {
        setMessage('Error al eliminar');
      }
    } catch {
      setMessage('Error de conexión');
    }
  };

  return (
    <div className="container">
      <h2>Estudiantes</h2>
      <form onSubmit={handleSubmit}>
        <input name="first_name" value={form.first_name} onChange={handleChange} placeholder="Nombre(s)" required />
        <input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Apellido(s)" required />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Teléfono" required />
        <input name="institutional_account" value={form.institutional_account} onChange={handleChange} placeholder="Cuenta institucional" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <select name="group" value={form.group} onChange={handleChange} required>
          <option value="">Selecciona un grupo</option>
          {groups.map(g => <option key={g._id} value={g._id}>{g.name}</option>)}
        </select>
        <button type="submit">{editingId ? 'Actualizar' : 'Agregar'}</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ first_name: '', last_name: '', phone: '', institutional_account: '', email: '', group: '' }); }}>Cancelar</button>}
      </form>
      {message && <p>{message}</p>}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Teléfono</th>
              <th>Cuenta</th>
              <th>Email</th>
              <th>Grupo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s._id}>
                <td>{s.first_name}</td>
                <td>{s.last_name}</td>
                <td>{s.phone}</td>
                <td>{s.institutional_account}</td>
                <td>{s.email}</td>
                <td>{s.group?.name || ''}</td>
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

export default Students; 