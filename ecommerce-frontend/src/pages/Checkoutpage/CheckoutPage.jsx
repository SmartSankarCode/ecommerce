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
  const [cartItems, setCartItems] = useState(null);
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
    // after refresh this page the app mount and isloggedin null.
    // so here the isloggedin null intailly and navigate to login
    // Wait until isLoggedIn is either true or false
    // or set navigate only if isloggedin = false;

    if (isLoggedIn === null) return;

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    fetchCheckoutData();
  }, [isLoggedIn, cartQuantity])



  async function logout() {
    await axios.post('/api/users/logout', { withCredentials: true });
    // setUser(null);
    setIsLoggedIn(null); // safety
    setCartQuantity('');
    // await fetchCartQuantity();
    navigate('/login');
  }

  return (
    <>
      <title>Checkout</title>
      {cartItems && (
        <>
          <div className="checkout-header">
            <div className="header-content">
              <div className="checkout-header-left-section">
                <Link to="/">
                  <img className="checkout-logo" src="/frontend-images/S-logo.png" alt="S Logo" />
                  <img className="checkout-ecommerce-logo" src="/frontend-images/ecommerce-logo.png" alt="Ecommerce Logo" />
                  <img className="checkout-ecommerce-logo-small" src="/frontend-images/ecommerce-logo-small.png" alt="Ecommerce Logo Small" />
                </Link>
              </div>

              <div className="checkout-header-middle-section">
                Checkout (<Link className="return-to-home-link" to="/">
                  {cartQuantity.length === 0 ? 0 : cartQuantity} items</Link>)
              </div>

              <div className="checkout-header-right-section">
                <span onClick={() => { setShowLogoutOption(!showLogoutOption) }}>
                  {/* set up with help of ai  */}
                  {user?.name
                    ? (user.name.split(" ")[0].length > 10
                      ? user.name.split(" ")[0].substring(0, 10) + "..."
                      : user.name.split(" ")[0])
                    : ""}
                </span>
                <img onClick={() => { setShowLogoutOption(!showLogoutOption) }}
                  src="/frontend-images/icons/user-icon.png" alt="User Icon" />
                {showLogoutOption && user && <span
                  className="user-logout"
                  onClick={() => { logout() }}>Logout</span>}
              </div>
            </div>
          </div>

          {cartItems.length > 0 ? (
            <div className="checkout-page">
              <div className="page-title">Review items</div>

              <div className="checkout-grid">
                <OrderSummary cartItems={cartItems} deliveryOptions={deliveryOptions}
                  fetchCartQuantity={fetchCartQuantity} fetchCheckoutData={fetchCheckoutData} />

                <PaymentSummary paymentSummary={paymentSummary}
                  fetchCartQuantity={fetchCartQuantity} />
              </div>
            </div>
          ) : (
            <div className="empty-cart">
              <img src="/frontend-images/empty-cart.png" alt="Empty Cart" />
              <p>Your cart is empty</p>
              <Link to="/" className="browse-products-link">
                Browse Products
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
}
