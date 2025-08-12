import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function ProductDetails({ product, fetchCartQuantity, isLoggedIn }) {
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  async function addToCart() {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    try {
      await axios.post('/api/cart/', {
        productId: product._id,
        quantity: 1
      }, {
        withCredentials: true
      }
      );

      await fetchCartQuantity();

      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);// appear msg for 2s

    } catch {
      navigate('/login');
      return;
    }
  }

  return (
    <div className="product-details">
      <img
        className="product-details-image"
        src={`http://localhost:3000${product.image}`}
        alt={product.name}
      />

      <div className="product-details-info">
        <div className="breadcrumb">
          <span>Home</span> &gt;{' '}
          <span>Categories</span> &gt;{' '}
          <span>{product.mainCategory}</span> &gt;{' '}
          <span>{product.subCategory}</span>
        </div>

        <h2>{product.name}</h2>
        <p className="price">₹{product.priceRupees}</p>
        <p className="rating">⭐ {product.rating?.stars} ({product.rating?.count} ratings)</p>

        <div className={`success-message ${showMessage ? 'visible' : ''}`}>
          <img className="checkmark-icon" src="/images/icons/checkmark.png" alt="checkmark-img" />
          <span>Added</span>
        </div>

        <button className="add-to-cart-btn" onClick={addToCart}>Add to Cart</button>

        <div className="coupon-section">
          <h3>🧾 Coupons</h3>
          {[...Array(4)].map((_, i) => (
            <p key={i}>Get <strong>5% discount</strong> on total cart value during checkout</p>
          ))}
        </div>
      </div>
    </div>
  );
}
