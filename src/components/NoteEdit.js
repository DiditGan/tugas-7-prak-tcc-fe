import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils";

const NoteEdit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/notes/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTitle(response.data.title || "");
        setContent(response.data.content || "");
      } catch (error) {
        setErrorMsg(error.response?.data?.msg || "Error fetching note");
      }
    };
    fetchNote();
    // eslint-disable-next-line
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      await axios.patch(`${BASE_URL}/notes/${id}`, {
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
          <h1 className="title has-text-centered">Edit Catatan</h1>
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