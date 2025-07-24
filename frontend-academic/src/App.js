import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Careers from "./Careers.jsx";
import Groups from "./Groups.jsx";
import Students from "./Students.jsx";
import Subjects from "./Subjects.jsx";
import Teachers from "./Teachers.jsx";
import './App.css';

// Nuevo PrivateRoute que consulta al backend
function PrivateRoute({ children }) {
  const [auth, setAuth] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3001/api/profile", { credentials: "include" })
      .then(res => setAuth(res.ok))
      .catch(() => setAuth(false));
  }, []);
  if (auth === null) return <p>Cargando...</p>;
  return auth ? children : <Navigate to="/login" />;
}

function App() {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/profile", { credentials: "include" })
      .then(res => setIsAuth(res.ok))
      .catch(() => setIsAuth(false));
  }, []);

  const handleLogout = () => {
    fetch("http://localhost:3001/api/logout", { method: "POST", credentials: "include" })
      .then(() => {
        setIsAuth(false);
        window.location.href = '/login';
      });
  };

  return (
    <Router>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/">Inicio</Link> | {" "}
        {isAuth === false && <><Link to="/login">Login</Link> | {" "}<Link to="/register">Registro</Link> | {" "}</>}
        {isAuth && <>
          <Link to="/careers">Carreras</Link> | {" "}
          <Link to="/groups">Grupos</Link> | {" "}
          <Link to="/students">Estudiantes</Link> | {" "}
          <Link to="/subjects">Materias</Link> | {" "}
          <Link to="/teachers">Profesores</Link> | {" "}
          <button onClick={handleLogout} style={{background:'none',border:'none',color:'#00bfff',cursor:'pointer',fontWeight:'bold'}}>Logout</button>
        </>}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/careers" element={<PrivateRoute><Careers /></PrivateRoute>} />
        <Route path="/groups" element={<PrivateRoute><Groups /></PrivateRoute>} />
        <Route path="/students" element={<PrivateRoute><Students /></PrivateRoute>} />
        <Route path="/subjects" element={<PrivateRoute><Subjects /></PrivateRoute>} />
        <Route path="/teachers" element={<PrivateRoute><Teachers /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
