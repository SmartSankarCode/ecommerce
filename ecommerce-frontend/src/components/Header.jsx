import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import './Header.css';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      try {
        await axios.get('/api/users/profile', { withCredentials: true });
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      }
    }
    checkAuth();
  }, []);

  function handleLogin (e) {
    if (!isLoggedIn) {
      e.preventDefault(); // Stop the normal <Link> navigation
      navigate('/login');
    }
  }

  return (
    <div className="header">
      <div className="left-section">
        <Link to="/">
          <img className="logo" src="/images/S-logo-white.png" alt="S Logo" />
          <img className="ecommerce-logo" src="/images/ecommerce-logo-white.png" alt="Ecommerce Logo" />
          <img className="ecommerce-logo-small" src="/images/ecommerce-logo-white-small.png" alt="Ecommerce Logo Small" />
        </Link>
      </div>
      <div className="middle-section">
        <input className="search-input" type="text" placeholder="Search products..." />
        <button className="search-button">
          <img className="search-icon" src="/images/icons/search-icon.png" alt="Search" />
        </button>
      </div>
      <div className="right-section">
        <Link to="/orders" onClick={handleLogin}>
          <span>Orders</span>
        </Link>
        <Link to="/checkout" onClick={handleLogin}>
          <img className="cart-icon" src="/images/icons/cart-icon.png" alt="Cart" />
          <div className="cart-quantity">0</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
}
