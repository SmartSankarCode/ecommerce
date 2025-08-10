import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import dayjs from 'dayjs'

import "./CheckoutPage.css";

export default function CheckoutPage({ cartQuantity, fetchCartQuantity }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [user, setUser] = useState(null);
  const [showLogoutOption, setShowLogoutOption] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    async function getDeliveryOptions() {
      const res = await axios.get('/api/delivery-options/')
      setDeliveryOptions(res.data)
      // console.log(res.data)
    }

    async function getCartItems() {
      const res = await axios.get('/api/cart/')
      setCartItems(res.data)
      // console.log(res.data)
    }

    async function getPaymentsDetails() {
      const res = await axios.get('/api/cart/summary')
      setPaymentSummary(res.data)
      // console.log(res.data)
    }

    async function getUserProfile() {
      const res = await axios.get('/api/users/profile', { withCredentials: true });
      setUser(res.data);
      // console.log(res.data)
    }

    getUserProfile();
    getPaymentsDetails();
    getCartItems();
    getDeliveryOptions();
  }, [])

  async function updateQuantity(productId, event) {
    const newQuantity = Number(event.target.value)

    await axios.put(`/api/cart/${productId}`, {
      quantity: newQuantity
    })

    const [cartRes, summaryRes] = await Promise.all([
      axios.get('/api/cart/'),
      axios.get('/api/cart/summary'),
    ]);

    await fetchCartQuantity();
    setCartItems(cartRes.data);
    setPaymentSummary(summaryRes.data);
  }

  async function updateDeliveryOption(productId, deliveryOptionId) {
    await axios.put(`/api/cart/${productId}`, {
      deliveryOptionId
    })
    // destructuring
    const [cartRes, summaryRes] = await Promise.all([
      axios.get('/api/cart/'),
      axios.get('/api/cart/summary'),
    ]);

    await fetchCartQuantity();
    setCartItems(cartRes.data);
    setPaymentSummary(summaryRes.data);
  }

  async function removeCartItem(productId) {
    await axios.delete(`/api/cart/${productId}`);

    const [cartRes, summaryRes] = await Promise.all([
      axios.get('/api/cart/'),
      axios.get('/api/cart/summary'),
    ]);

    await fetchCartQuantity();
    setCartItems(cartRes.data);
    setPaymentSummary(summaryRes.data);
  }

  async function logout() {
    await axios.post('/api/users/logout', { withCredentials: true });
    setUser(null);
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
            Checkout (<a className="return-to-home-link" href="/">{cartQuantity} items</a>)
          </div>

          <div className="checkout-header-right-section">
            <span onClick={() => { setShowLogoutOption(!showLogoutOption) }}>
              {user?.name || "Guest"}</span>
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
          <div className="order-summary">
            {deliveryOptions.length > 0 && cartItems.map(item => {
              const selectedDeliveryOption = deliveryOptions
                .find(option => {
                  return option.id === item.deliveryOptionId
                });

              return (
                <div className="cart-item-container" key={item.productId}>
                  <div className="delivery-date">
                    Delivery date: {dayjs().add(selectedDeliveryOption.deliveryDays, 'day')
                      .format('dddd, MMMM D')}
                  </div>

                  <div className="cart-item-details-grid">
                    <img className="product-image" src={`http://localhost:3000${item.product.image}`} alt="Product" />

                    <div className="cart-item-details">
                      <div className="product-name">{item.product.name}</div>
                      <div className="product-price">₹{item.product.priceRupees}</div>
                      <div className="product-quantity">
                        <span>
                          Quantity:
                          <span className="update-quantity-container">
                            <select value={item.quantity}
                              onChange={(event) => updateQuantity(item.productId, event)}>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                              {
                                item.quantity > 10 && (
                                  <option key={item.quantity} value={item.quantity}>
                                    {item.quantity}
                                  </option>
                                )
                              }
                            </select>
                          </span>
                        </span>
                        <span className="delete-item"
                          onClick={() => removeCartItem(item.productId)}>
                          <img className="delete-icon"
                            src="/images/icons/delete-icon.png" alt="delete-icon" />
                          <span>Remove</span>
                        </span>
                      </div>
                    </div>

                    <div className="delivery-options">
                      <div className="delivery-options-title">Choose a delivery option:</div>
                      {deliveryOptions.map(option => {
                        const deliveryDate = dayjs().add(option.deliveryDays, 'day')
                          .format('dddd, MMMM D');
                        return (
                          <div className="delivery-option" key={option.id}>
                            <input type="radio" className="delivery-option-input"
                              name={`delivery-option-${item.productId}`}
                              checked={option.id === item.deliveryOptionId}
                              onChange={() => updateDeliveryOption(item.productId, option.id)} />
                            <div>
                              <div className="delivery-option-date">{deliveryDate}</div>
                              <div className="delivery-option-price">
                                {option.priceRupees === 0
                                  ? "FREE Shipping"
                                  : `₹${option.priceRupees} - Shipping`}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>
            {paymentSummary && (
              <>
                <div className="payment-summary-row">
                  <div>
                    Price ({paymentSummary.cartQuantity} Items ):
                  </div>
                  <div className="payment-summary-money">
                    ₹{paymentSummary.productPriceRupees}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Shipping & handling:</div>
                  <div className="payment-summary-money">
                    ₹{paymentSummary.shippingPriceRupees}
                  </div>
                </div>

                <div className="payment-summary-row subtotal-row">
                  <div>Total before discount:</div>
                  <div className="payment-summary-money">
                    ₹{paymentSummary.productPriceRupees
                      + paymentSummary.shippingPriceRupees}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Discount (5%):</div>
                  <div className="payment-summary-money">
                    ₹{paymentSummary.discountAmount}
                  </div>
                </div>

                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">
                    ₹{paymentSummary.orderTotal}
                  </div>
                </div>

                <button className="place-order-button ">Place your order</button>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
