import { Link } from 'react-router-dom';
import Header from '../../components/Header';

import './AuthPage.css';

export default function LoginPage() {
  return (
    <>
      <Header/>
      
      <div className="auth-page">
        <h2>Login to Your Account</h2>
        <form className="auth-form">
          <input type="email" placeholder="Email address" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </>
  );
}

