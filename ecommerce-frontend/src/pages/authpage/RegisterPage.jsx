import { Link } from 'react-router-dom';
import Header from '../../components/Header';

import './AuthPage.css';

export default function RegisterPage() {
  return (
    <>
      <Header/>
      
      <div className="auth-page">
        <h2>Create an Account</h2>
        <form className="auth-form">
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email address" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </>
  );
}

