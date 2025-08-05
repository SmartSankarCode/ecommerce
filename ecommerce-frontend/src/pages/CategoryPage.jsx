
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './HomePage.css'


export function Header() {
  return (
    <>
      <div className="header">
        <div className="left-section">
          <Link to="">
            <img className='logo'
              src="/images/S-logo-white.png" alt="S Logo" />
            <img className='ecommerce-logo'
              src="/images/ecommerce-logo-white.png"
              alt="Ecommerce Logo" />
            <img className='ecommerce-logo-small'
              src="/images/ecommerce-logo-white-small.png"
              alt="Ecommerce Logo small" />
          </Link>
        </div>
        <div className='middle-section'>
          <input className='search-input'
            type="text" placeholder="Search " />
          <button className="search-button">
            <img className='search-icon'
              src="/images/icons/search-icon.png"
              alt="Search" />
          </button>
        </div>
        <div className='right-section'>
          <Link to="">
            <span>Login/Orders</span>
          </Link>
          <Link to="">
            <img className="cart-icon"
              src="/images/icons/cart-icon.png" alt="Search Icon" />
            <div className="cart-quantity">0</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>
    </>
  )
}

export function CategoryPage() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`/api/products?mainCategory=${categoryName}`)
      .then(res => {
        setProducts(res.data);
      });
  }, [categoryName]);

  return (
    <>
      <Header/>

      <div className="category-page">
        <h2>{categoryName.toUpperCase()}</h2>

        <div className="product-grid">
            {products.map(product => {
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
  );
}
