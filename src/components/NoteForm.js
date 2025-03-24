import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";

const NoteForm = () => {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${BASE_URL}/add-note`, {
      judul,
      isi,
    });
    navigate("/");
  };

  return (
    <div className="hero is-light is-fullheight">
      <div className="hero-body">
        <div className="container">
          <h1 className="title has-text-centered">Tambah Catatan</h1>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Judul</label>
              <div className="control">
                <input
                  className="input is-medium"
                  type="text"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Isi</label>
              <div className="control">
                <textarea
                  className="textarea is-medium"
                  value={isi}
                  onChange={(e) => setIsi(e.target.value)}
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