import { Link } from 'react-router-dom';
import './ProductList.css'; 

export default function ProductList({ products }) {
  return (
    <div className="product-grid">
      {products.map(product => (
        <Link
          to={`/product/${product._id}`}
          className="product-card"
          key={product._id}
        >
          <img
            src={product.image}
            alt={product.name}
          />
          <h3>{product.name}</h3>
          <p>₹{product.priceRupees}</p>
        </Link>
      ))}
    </div>
  );
}
