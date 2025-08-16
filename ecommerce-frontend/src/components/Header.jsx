import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';

import './Header.css';

export default function Header({ cartQuantity, isLoggedIn }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchText = searchParams.get('search');

  const [search, setSearch] = useState(searchText || '');

  function searchInput(event) {
    setSearch(event.target.value);
  }

  function searchProducts() {
    if (!search.trim()) {
      return; // Don't search if empty or only spaces
    }
    // console.log(search)
    // navigate(`/search/${search}`) another way
    navigate(`/category/?search=${search}`);
  }

  function searchKeyDown(event) {
    if (event.key === 'Enter') {
      searchProducts();
    }
  }

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
        <input className="search-input" type="text"
          placeholder="Search products..." onKeyDown={searchKeyDown}
          value={search} onChange={searchInput} />
        <button className="search-button"
          onClick={searchProducts}>
          <img className="search-icon" src="/frontend-images/icons/search-icon.png" alt="Search" />
        </button>
      </div>
      <div className="right-section">
        <Link to={isLoggedIn ? '/orders' : '/login'}>
          <span>Orders</span>
        </Link>
        <Link to={isLoggedIn ? '/checkout' : '/login'}>
          <img className="cart-icon" src="/frontend-images/icons/cart-icon.png" alt="Cart" />
          <div className="cart-quantity">{cartQuantity}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
}
