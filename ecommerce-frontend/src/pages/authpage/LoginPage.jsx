import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import Header from '../../components/Header';

import './AuthPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleInput = (setter) => (e) => setter(e.target.value);

  async function authLogin(event) {
    event.preventDefault();

    try {
      await axios.post('/api/users/login', {
        email,
        password
      }, {
        withCredentials: true
      });

      navigate('/'); 

      setEmail('');
      setPassword('');
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      setErrorMessage(message);
    }
  }
  return (
    <>
      <Header />

      <div className="auth-page" >
        <h2>Login to Your Account</h2>
        <form className="auth-form" onSubmit={authLogin}>
          <input type="email" placeholder="Email address"
          value={email} onChange={handleInput(setEmail)} required />
          <input type="password" placeholder="Password" 
          value={password} onChange={handleInput(setPassword)}required />
          <button type="submit">Login</button>
        </form>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </>
  );
}

