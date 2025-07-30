import { Link } from 'react-router-dom';
import './HomePage.css'

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
 
  fetch('http://localhost:3000/api/products?isTrending=true')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    console.log(data)
  })

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
          <Link to="/product/:" className="product-card">
            <img src="/images/products/Elephants Love Candle Holder with LED Candle.jpg" alt="Elephant Candle Holder" />
            <h3>Elephant Lamp Home Decorater art plastic lamp with electric batteries</h3>
            <p>₹999</p>
          </Link>

          <Link to="/product/:" className="product-card">
            <img src="/images/products/Fashion mens denim shirt blue.jpg" alt="Men's Blue Shirt" />
            <h3>Party wear Blue Shirt For Mens</h3>
            <p>₹499</p>
          </Link>

          <Link to="/product/:" className="product-card">
            <img src="/images/products/wishted fit womens Jeans.jpg" alt="Women's Jeans" />
            <h3>Women's Blue Jeans </h3>
            <p>₹799</p>
          </Link>
        </div>
      </div>
    </>
  )
}