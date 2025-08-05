import { Link } from 'react-router-dom';

export default function RecommendedProducts({ products }) {
  return (
    <div className="recommended-section">
      <h2>Related Products</h2>
      <div className="recommended-grid">
        {products.map(product => (
          <Link
            to={`/product/${product._id}`}
            className="recommended-card"
            key={product._id}
          >
            <img src={`http://localhost:3000${product.image}`} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{product.priceRupees}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
