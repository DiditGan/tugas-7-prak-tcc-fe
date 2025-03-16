import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const NoteEdit = () => {
  const { id } = useParams();
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      const response = await axios.get("http://localhost:5000/notes");
      const note = response.data.find((n) => n.id === parseInt(id));
      if (note) {
        setJudul(note.judul);
        setIsi(note.isi);
      }
    };
    fetchNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/edit-note/${id}`, { judul, isi });
    navigate("/");
  };

  return (
    <div className="hero is-light is-fullheight">
      <div className="hero-body">
        <div className="container">
          <h1 className="title has-text-centered">Edit Catatan</h1>
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
                <button className="button is-info is-large" type="submit">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NoteEdit;