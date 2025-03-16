/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NoteList from "./NoteList";
import NoteForm from "./NoteForm";
import NoteEdit from "./NoteEdit";
import "bulma/css/bulma.min.css";

const NoteApp = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Router>
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
              <Link className="navbar-item" to="/add">Tambah</Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<NoteList />} />
            <Route path="/add" element={<NoteForm />} />
            <Route path="/edit/:id" element={<NoteEdit />} />
          </Routes>
        </div>
      </section>
    </Router>
  );
};

export default NoteApp;