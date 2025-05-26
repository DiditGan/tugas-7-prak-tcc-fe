/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import NoteList from "./NoteList";
import NoteForm from "./NoteForm";
import NoteEdit from "./NoteEdit";
import Register from "./Register";
import Home from "./Home";
import "bulma/css/bulma.min.css";

const NoteApp = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/register');
  };

  return (
    <>
      <nav className="navbar is-dark">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <strong>My Notes</strong>
            </Link>
            <a
              role="button"
              className={`navbar-burger ${isActive ? "is-active" : ""}`}
              onClick={() => setIsActive(!isActive)}
            >
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
          <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
            <div className="navbar-end">
              <Link className="navbar-item" to="/">Home</Link>
              {token && (
                <>
                  <Link className="navbar-item" to="/add">Tambah</Link>
                  <button className="button is-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <section className="section">
        <div className="container">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={token ? <NoteList /> : <Navigate to="/register" />} />
            <Route path="/add" element={token ? <NoteForm /> : <Navigate to="/register" />} />
            <Route path="/edit/:id" element={token ? <NoteEdit /> : <Navigate to="/register" />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
      </section>
    </>
  );
};

export default NoteApp;