export default function ProductDetails({ product }) {
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
        <button className="add-to-cart-btn">Add to Cart</button>

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
