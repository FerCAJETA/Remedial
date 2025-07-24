import React, { useState, useEffect } from "react";

const API = "http://localhost:3001/api/careers";
const PROFILE_API = "http://localhost:3001/api/profile";

function CareerForm({ form, onChange, onSubmit, editId, onCancel, message }) {
  return (
    <form onSubmit={onSubmit}>
      <input name="career_code" placeholder="Código" value={form.career_code} onChange={onChange} required />
      <input name="career_name" placeholder="Nombre" value={form.career_name} onChange={onChange} required />
      <input name="career_description" placeholder="Descripción" value={form.career_description} onChange={onChange} required />
      <input name="modality" placeholder="Modalidad" value={form.modality} onChange={onChange} required />
      <input name="quarter_duration" placeholder="Duración (cuatrimestres)" value={form.quarter_duration} onChange={onChange} required />
      <input name="coordinator_name" placeholder="Coordinador" value={form.coordinator_name} onChange={onChange} required />
      <input name="coordinator_email" placeholder="Email coordinador" value={form.coordinator_email} onChange={onChange} required />
      <button type="submit">{editId ? "Actualizar" : "Crear"}</button>
      {editId && <button type="button" onClick={onCancel}>Cancelar</button>}
      {message && <p>{message}</p>}
    </form>
  );
}

function CareerList({ careers, onEdit, onDelete, onDetails }) {
  return (
    <ul>
      {careers.map(career => (
        <li key={career._id}>
          <b>{career.career_code}</b> - {career.career_name} ({career.modality})
          <br />
          <button onClick={() => onEdit(career)}>Editar</button>
          <button onClick={() => onDelete(career._id)}>Eliminar</button>
          <button onClick={() => onDetails(career)}>Ver detalles</button>
        </li>
      ))}
    </ul>
  );
}

function CareerDetailsModal({ details, onClose }) {
  if (!details) return null;
  return (
    <div style={{background:'#181a1bcc',position:'fixed',top:0,left:0,right:0,bottom:0,display:'flex',alignItems:'center',justifyContent:'center',zIndex:10}} onClick={onClose}>
      <div style={{background:'#23272f',padding:24,borderRadius:8,minWidth:300,maxWidth:400,color:'#f1f1f1'}} onClick={e=>e.stopPropagation()}>
        <h2>{details.career_name}</h2>
        <p><b>Código:</b> {details.career_code}</p>
        <p><b>Descripción:</b> {details.career_description}</p>
        <p><b>Modalidad:</b> {details.modality}</p>
        <p><b>Duración:</b> {details.quarter_duration} cuatrimestres</p>
        <p><b>Coordinador:</b> {details.coordinator?.name} ({details.coordinator?.email})</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default function Careers() {
  const [careers, setCareers] = useState([]);
  const [form, setForm] = useState({
    career_code: "",
    career_name: "",
    career_description: "",
    modality: "",
    quarter_duration: "",
    coordinator_name: "",
    coordinator_email: ""
  });
  const [editId, setEditId] = useState(null);
  const [auth, setAuth] = useState(null);
  const [message, setMessage] = useState("");
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch(PROFILE_API, { credentials: "include" })
      .then(res => res.ok ? res.json() : null)
      .then(data => setAuth(data && data.id ? true : false))
      .catch(() => setAuth(false));
  }, []);

  useEffect(() => {
    if (auth) {
      fetch(API, { credentials: "include" })
        .then(res => res.json())
        .then(data => setCareers(data));
    }
  }, [auth]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");
    const dataToSend = {
      career_code: form.career_code,
      career_name: form.career_name,
      career_description: form.career_description,
      modality: form.modality,
      quarter_duration: form.quarter_duration,
      coordinator: {
        name: form.coordinator_name,
        email: form.coordinator_email
      }
    };
    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API}/${editId}` : API;
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(dataToSend)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(editId ? "Carrera actualizada" : "Carrera creada");
        fetch(API, { credentials: "include" })
          .then(res => res.json())
          .then(data => setCareers(data));
        setForm({
          career_code: "",
          career_name: "",
          career_description: "",
          modality: "",
          quarter_duration: "",
          coordinator_name: "",
          coordinator_email: ""
        });
        setEditId(null);
      } else {
        setMessage(data.message || "Error al guardar");
      }
    } catch {
      setMessage("Error de conexión");
    }
  };

  const handleEdit = career => {
    setForm({
      career_code: career.career_code,
      career_name: career.career_name,
      career_description: career.career_description,
      modality: career.modality,
      quarter_duration: career.quarter_duration,
      coordinator_name: career.coordinator?.name || "",
      coordinator_email: career.coordinator?.email || ""
    });
    setEditId(career._id);
  };

  const handleDelete = async id => {
    setMessage("");
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE", credentials: "include" });
      const data = await res.json();
      if (res.ok) {
        setMessage("Carrera eliminada");
        setCareers(careers.filter(c => c._id !== id));
      } else {
        setMessage(data.message || "Error al eliminar");
      }
    } catch {
      setMessage("Error de conexión");
    }
  };

  if (auth === null) return <p>Cargando...</p>;
  if (auth === false) return <p>Acceso denegado. Debes iniciar sesión.</p>;

  return (
    <div className="container">
      <h2>CRUD de Carreras</h2>
      <CareerForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        editId={editId}
        onCancel={() => {
          setEditId(null);
          setForm({ career_code: "", career_name: "", career_description: "", modality: "", quarter_duration: "", coordinator_name: "", coordinator_email: "" });
        }}
        message={message}
      />
      <CareerList
        careers={careers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetails={setDetails}
      />
      <CareerDetailsModal details={details} onClose={() => setDetails(null)} />
    </div>
  );
} 