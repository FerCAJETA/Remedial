import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setLoggedIn(true);
        setMessage("¡Login exitoso!");
        if (setIsAuth) setIsAuth(true);
        setTimeout(() => navigate("/careers"), 1000); // Redirige tras 1 segundo
      } else {
        setMessage(data.message || "Error al iniciar sesión");
      }
    } catch (err) {
      setMessage("Error de conexión con el servidor");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Entrar</button>
        {message && <p>{message}</p>}
        {loggedIn && <p></p>}
      </form>
    </div>
  );
} 