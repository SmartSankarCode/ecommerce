import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from './CategoryPage';
// import './HomePage.css';
import './ProductPage.css';


export function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);


  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(response => {
        setProduct(response.data)
      });

    axios.get(`/api/products?recommendationsFor=${id}`)
      .then(res => setRecommendedProducts(res.data))

  }, [id]);

  if (!product) return <p>Loading product...</p>;

  return (
    <>
      <Header />

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
          <p className="price">
            ₹{product.priceRupees}
          </p>
          <p className="rating">⭐ {product.rating?.stars}
            ({product.rating?.count} ratings)</p>
          <button className="add-to-cart-btn">Add to Cart</button>
          <div className="coupon-section">
            <h3>🧾 Coupons</h3>
            <p>Get <strong>5% discount</strong> on total cart value during checkout</p>
            <p>Get <strong>5% discount</strong> on total cart value during checkout</p>
            <p>Get <strong>5% discount</strong> on total cart value during checkout</p>
            <p>Get <strong>5% discount</strong> on total cart value during checkout</p>
          </div>
        </div>

      </div>

      <div className="recommended-section">
        <h2>Related Products</h2>
        <div className="recommended-grid">
          {recommendedProducts.map(product => {
            return (
              <Link to={`/product/${product._id}`} className="recommended-card"
                key={product._id}>
                <img src={`http://localhost:3000${product.image}`} alt={product.name} />
                <h3>{product.name}</h3>
                <p>₹{product.priceRupees}</p>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="product-reviews">
        <h2>Ratings & Reviews</h2>
        <div className="review-rating">
          <img
            src={`/images/ratings/rating-${product.rating.stars * 10}.png`}
            alt="rating image" />
          <span>{product.rating?.count}</span> 
        </div>

        <div className="review">
          <div className="review-header">
            <strong>Raja Babu</strong>
            <span className="review-stars">⭐ 5.0</span>
          </div>
          <p className="review-comment">"Super product! Highly recommend."</p>
        </div>

        <div className="review">
          <div className="review-header">
            <strong>Satyanarayana</strong>
            <span className="review-stars">⭐ 4.5</span>
          </div>
          <p className="review-comment">"Nice quality, worth the price."</p>
        </div>

        <div className="review">
          <div className="review-header">
            <strong>Sai </strong>
            <span className="review-stars">⭐ 5.0</span>
          </div>
          <p className="review-comment">"Excellent! I want to buy more."</p>
        </div>

        <div className="review">
          <div className="review-header">
            <strong>Ram Seshu</strong>
            <span className="review-stars">⭐ 4.0</span>
          </div>
          <p className="review-comment">"Good value, fast delivery."</p>
        </div>
      </div>
    </>
  );
}
