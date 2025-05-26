import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";

const NoteForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      await axios.post(`${BASE_URL}/notes`, {
        title,
        content,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate("/");
    } catch (error) {
      setErrorMsg(error.response?.data?.msg || error.message);
    }
  };

  return (
    <div className="hero is-light is-fullheight">
      <div className="hero-body">
        <div className="container">
          <h1 className="title has-text-centered">Tambah Catatan</h1>
          {errorMsg && <p className="has-text-danger has-text-centered">{errorMsg}</p>}
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Judul</label>
              <div className="control">
                <input
                  className="input is-medium"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Isi</label>
              <div className="control">
                <textarea
                  className="textarea is-medium"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>

            <div className="field is-grouped is-grouped-centered">
              <div className="control">
                <button className="button is-primary is-large" type="submit">
                  Simpan
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NoteForm;