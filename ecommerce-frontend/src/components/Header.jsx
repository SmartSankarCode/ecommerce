import { Link } from 'react-router-dom';

import './Header.css';

export default function Header({ cartQuantity, isLoggedIn }) {
  

  return (
    <div className="header">
      <div className="left-section">
        <Link to="/">
          <img className="logo" src="/frontend-images/S-logo-white.png" alt="S Logo" />
          <img className="ecommerce-logo" src="/frontend-images/ecommerce-logo-white.png" alt="Ecommerce Logo" />
          <img className="ecommerce-logo-small" src="/frontend-images/ecommerce-logo-white-small.png" alt="Ecommerce Logo Small" />
        </Link>
      </div>
      <div className="middle-section">
        <input className="search-input" type="text" placeholder="Search products..." />
        <button className="search-button">
          <img className="search-icon" src="/frontend-images/icons/search-icon.png" alt="Search" />
        </button>
      </div>
      <div className="right-section">
        <Link to={isLoggedIn ? '/orders' : '/login'}>
          <span>Orders</span>
        </Link>
        <Link to={isLoggedIn ? '/checkout' : '/login'}>
          <img className="cart-icon" src="/frontend-images/icons/cart-icon.png" alt="Cart" />
          <div className="cart-quantity">{ cartQuantity }</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
}
