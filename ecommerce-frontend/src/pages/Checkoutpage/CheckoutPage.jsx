import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

import OrderSummary from './OrderSummary';
import PaymentSummary from './PaymentSummary';

import "./CheckoutPage.css";

export default function CheckoutPage({ 
  cartQuantity, 
  setCartQuantity,
  fetchCartQuantity, 
  isLoggedIn, 
  setIsLoggedIn,
  user, 
}) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  // const [user, setUser] = useState(null);
  const [showLogoutOption, setShowLogoutOption] = useState(false);
  const navigate = useNavigate();

  async function fetchCheckoutData() {
    const [
      deliveryOptionsRes,
      cartItemsRes,
      paymentSummaryRes,
      // profileRes
    ] = await Promise.all([
      axios.get('/api/delivery-options/', { withCredentials: true }),
      axios.get('/api/cart/', { withCredentials: true }),
      axios.get('/api/cart/summary', { withCredentials: true }),
      // axios.get('/api/users/profile')
    ]);

    setDeliveryOptions(deliveryOptionsRes.data);
    setCartItems(cartItemsRes.data);
    setPaymentSummary(paymentSummaryRes.data);
    // setUser(profileRes.data);
  }

  useEffect(() => {
    if (isLoggedIn) {
      fetchCheckoutData();
    } else {
      navigate("/login");
    }
  }, [isLoggedIn, cartQuantity])



  async function logout() {
    await axios.post('/api/users/logout', { withCredentials: true });
    // setUser(null);
    setIsLoggedIn(false);
    setCartQuantity('');
    // await fetchCartQuantity();
    navigate('/login');
  }

  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="checkout-logo" src="/images/S-logo.png" alt="S Logo" />
              <img className="checkout-ecommerce-logo" src="/images/ecommerce-logo.png" alt="Ecommerce Logo" />
              <img className="checkout-ecommerce-logo-small" src="/images/ecommerce-logo-small.png" alt="Ecommerce Logo Small" />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<Link className="return-to-home-link" to="/">{cartQuantity} items</Link>)
          </div>

          <div className="checkout-header-right-section">
            <span onClick={() => { setShowLogoutOption(!showLogoutOption) }}>
              {user?.name || ""}</span>
            <img onClick={() => { setShowLogoutOption(!showLogoutOption) }}
              src="/images/icons/user-icon.png" alt="User Icon" />
            {showLogoutOption && user && <span
              className="user-logout"
              onClick={() => { logout() }}>Logout</span>}
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review items</div>

        <div className="checkout-grid">
          <OrderSummary cartItems={cartItems} deliveryOptions={deliveryOptions}
            fetchCartQuantity={fetchCartQuantity} fetchCheckoutData={fetchCheckoutData} />

          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}
