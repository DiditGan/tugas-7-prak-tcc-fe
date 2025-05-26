import React, { useState } from 'react';
import { BASE_URL } from '../utils';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.accessToken);
        navigate('/');
      } else {
        setErrorMsg(data.msg || 'Login gagal');
      }
    } catch (error) {
      setErrorMsg('Terjadi kesalahan');
    }
  };

  return (
    <div className="container" style={{ maxWidth: 400, marginTop: 50 }}>
      <h2 className="title is-3">Login</h2>
      {errorMsg && <p className="has-text-danger">{errorMsg}</p>}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button className="button is-primary" type="submit">Login</button>
      </form>
      <p style={{ marginTop: 10 }}>
        Belum punya akun?{' '}
        <button className="button is-text" type="button" onClick={onSwitch}>Register</button>
      </p>
    </div>
  );
}

function RegisterForm({ onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/register');
      } else {
        setErrorMsg(data.msg || 'Register gagal');
      }
    } catch (error) {
      setErrorMsg('Terjadi kesalahan');
    }
  };

  return (
    <div className="container" style={{ maxWidth: 400, marginTop: 50 }}>
      <h2 className="title is-3">Register</h2>
      {errorMsg && <p className="has-text-danger">{errorMsg}</p>}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Nama</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button className="button is-primary" type="submit">Register</button>
      </form>
      <p style={{ marginTop: 10 }}>
        Sudah punya akun?{' '}
        <button className="button is-text" type="button" onClick={onSwitch}>Login</button>
      </p>
    </div>
  );
}

const Register = () => {
  const [showRegister, setShowRegister] = useState(false);
  const token = localStorage.getItem('token');

  // Jika sudah login, redirect ke halaman utama
  if (token) {
    window.location.href = '/';
  }

  return showRegister ? (
    <RegisterForm onSwitch={() => setShowRegister(false)} />
  ) : (
    <LoginForm onSwitch={() => setShowRegister(true)} />
  );
};

export default Register;