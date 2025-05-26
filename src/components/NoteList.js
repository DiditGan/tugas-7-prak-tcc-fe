import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/notes`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNotes(response.data);
      setErrorMsg("");
    } catch (error) {
      setErrorMsg(error.response?.data?.msg || "Error fetching notes");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchNotes();
    } catch (error) {
      setErrorMsg(error.response?.data?.msg || "Error deleting note");
    }
  };

  return (
    <div className="hero is-light is-fullheight">
      <div className="hero-body">
        <div className="container">
          <h1 className="title has-text-centered">Daftar Catatan</h1>
          <h2 className="subtitle has-text-centered">Kelola catatanmu dengan mudah</h2>
          {token && (
            <div className="has-text-centered">
              <Link to="/add" className="button is-primary is-large mb-5">
                Tambah Catatan
              </Link>
            </div>
          )}
          {errorMsg && <p className="has-text-danger has-text-centered">{errorMsg}</p>}
          {notes.length === 0 ? (
            <p className="has-text-centered">Tidak ada catatan</p>
          ) : (
            <div className="columns is-multiline is-centered">
              {notes.map((note) => (
                <div key={note.id} className="column is-one-third">
                  <div className="card">
                    <div className="card-content">
                      <p className="title is-4">{note.title}</p>
                      <p className="content">{note.content}</p>
                    </div>
                    {token && (
                      <footer className="card-footer">
                        <Link
                          to={`/edit/${note.id}`}
                          className="card-footer-item has-text-info"
                        >
                          Edit
                        </Link>
                        <button
                          className="card-footer-item has-text-danger"
                          onClick={() => handleDelete(note.id)}
                        >
                          Hapus
                        </button>
                      </footer>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteList;