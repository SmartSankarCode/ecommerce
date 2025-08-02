import { Link } from 'react-router-dom';
import './HomePage.css'
import axios from 'axios';
import { useEffect, useState } from 'react';

function Header() {
  return (
    <>
      <div className="header">
        <div className="left-section">
          <Link to="">
            <img className='logo'
              src="images/S-logo-white.png" alt="S Logo" />
            <img className='ecommerce-logo'
              src="images/ecommerce-logo-white.png"
              alt="Ecommerce Logo" />
            <img className='ecommerce-logo-small'
              src="images/ecommerce-logo-white-small.png"
              alt="Ecommerce Logo small" />
          </Link>
        </div>
        <div className='middle-section'>
          <input className='search-input'
            type="text" placeholder="Search products..." />
          <button className="search-button">
            <img className='search-icon'
              src="images/icons/search-icon.png"
              alt="Search" />
          </button>
        </div>
        <div className='right-section'>
          <Link to="">
            <span>Login/Orders</span>
          </Link>
          <Link to="">
            <img className="cart-icon"
              src="images/icons/cart-icon.png" alt="Search Icon" />
            <div className="cart-quantity">0</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>
    </>
  )
}

export function HomePage() {
  const [trendingProducts, setTrendingProducts] = useState([]);

  function loadProducts() {
    axios.get('/api/products?isTrending=true')
      .then((response) => {
        setTrendingProducts(response.data);
      });
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <Header />

      <div className="categories">
        <Link to="/category/mens" className="category-box">
          <img src="/images/banners/Mens banner.jpg" alt="Mens" className="category-image" />
          <span>Mens</span>
        </Link>
        <Link to="/category/womens" className="category-box">
          <img src="/images/banners/Womens banner.jpg" alt="Womens" className="category-image" />
          <span>Womens</span>
        </Link>
        <Link to="/category/footwear" className="category-box">
          <img src="/images/banners/Footwear banner.jpg" alt="Footwear" className="category-image" />
          <span>Footwear</span>
        </Link>
        <Link to="/category/home-kitchen" className="category-box">
          <img src="/images/banners/Home-Kitchen banner.jpg" alt="Home & Kitchen" className="category-image" />
          <span>Home & Kitchen</span>
        </Link>
      </div>

      <div className="trending-products">
        <h2>Trending Products</h2>
        <div className="product-grid">
          {trendingProducts.map(product => {
            return (
              <Link to={`/product/${product._id}`} className="product-card"
                key={product._id}>
                <img src={`http://localhost:3000${product.image}`} alt={product.name} />
                <h3>{product.name}</h3>
                <p>₹{product.priceRupees}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}