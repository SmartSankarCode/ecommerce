import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

import Header from '../../components/Header';

import './AuthPage.css';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  // input handlers
  /*
  function inputName(event) {
    setName(event.target.value);
  }
  function inputEmail(event) {
    setEmail(event.target.value);
  }
  function inputPassword(event) {
    setPassword(event.target.value);
  }
  */

  const handleInput = (setter) => (e) => setter(e.target.value);


  async function authRegister(event) {
    event.preventDefault();

    try {
      await axios.post('/api/users/register', {
        name,
        email,
        password
      }, {
        withCredentials: true
      });

      // console.log('Logged in user after register:', userData);

      navigate('/');

      setName('');
      setEmail('');
      setPassword('');

    } catch (error) {
      const message = error.response?.data?.message || 'Something went wrong';
      setErrorMessage(message);
    }

  }

  return (
    <>
      <Header />

      <div className="auth-page">
        <h2>Create an Account</h2>
        <form className="auth-form" onSubmit={authRegister}>
          <input type="text" placeholder="Full Name"
            // onChange={inputName} 
            onChange={handleInput(setName)}
            value={name} required />
          <input type="email" placeholder="Email address"
            // onChange={inputEmail} 
            onChange={handleInput(setEmail)}
            value={email} required />
          <input type="password" placeholder="Password"
            // onChange={inputPassword} 
            onChange={handleInput(setPassword)}
            value={password} required />
          <button type="submit"
           /* onClick={authRegitser} */>Register</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </>
  );
}

