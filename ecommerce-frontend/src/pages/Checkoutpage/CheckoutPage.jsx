import { Link } from "react-router-dom";

import "./CheckoutPage.css"; // Convert your HTML styles into this CSS file

export default function CheckoutPage() {
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
            Checkout (<a className="return-to-home-link" href="/">2 items</a>)
          </div>

          <div className="checkout-header-right-section">
            <span>User  </span>
            <img src="/images/icons/user-icon.png" alt="User Icon" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review items</div>

        <div className="checkout-grid">
          <div className="order-summary">
            <div className="cart-item-container">
              <div className="delivery-date">Delivery date: Wednesday, August 13</div>

              <div className="cart-item-details-grid">
                <img className="product-image" src="/images/products/Elephants Love Candle Holder with LED Candle.jpg" alt="Product" />

                <div className="cart-item-details">
                  <div className="product-name">Elephants Love Candle Holder With LED Candle</div>
                  <div className="product-price">₹675</div>
                  <div className="product-quantity">
                    <span>
                      Quantity:
                      <span className="update-quantity-container">
                        <select>
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
                        </select>
                      </span>
                    </span>
                    <span className="delete-item">
                      <img className="delete-icon"
                        src="/images/icons/delete-icon.png" alt="delete-icon" />
                      <span>Remove</span>
                    </span>
                  </div>
                </div>

                <div className="delivery-options">
                  <div className="delivery-options-title">Choose a delivery option:</div>

                  <div className="delivery-option">
                    <input type="radio" className="delivery-option-input" name="delivery-option-1" defaultChecked />
                    <div>
                      <div className="delivery-option-date">Wednesday, August 13</div>
                      <div className="delivery-option-price">FREE Shipping</div>
                    </div>
                  </div>

                  <div className="delivery-option">
                    <input type="radio" className="delivery-option-input" name="delivery-option-1" />
                    <div>
                      <div className="delivery-option-date">Saturday, August 9</div>
                      <div className="delivery-option-price">₹49 - Shipping</div>
                    </div>
                  </div>

                  <div className="delivery-option">
                    <input type="radio" className="delivery-option-input" name="delivery-option-1" />
                    <div>
                      <div className="delivery-option-date">Thursday, August 7</div>
                      <div className="delivery-option-price">₹99 - Shipping</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cart-item-container">
              <div className="delivery-date">Delivery date: Wednesday, August 13</div>

              <div className="cart-item-details-grid">
                <img className="product-image" src="/images/products/Elephants Love Candle Holder with LED Candle.jpg" alt="Product" />

                <div className="cart-item-details">
                  <div className="product-name">Elephants Love Candle Holder With LED Candle</div>
                  <div className="product-price">₹675</div>
                  <div className="product-quantity">
                    <span>
                      Quantity:
                      <span className="update-quantity-container">
                        <select>
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
                        </select>
                      </span>
                    </span>
                    <span className="delete-item">
                      <img className="delete-icon"
                        src="/images/icons/delete-icon.png" alt="delete-icon" />
                      <span>Remove</span>
                    </span>
                  </div>
                </div>

                <div className="delivery-options">
                  <div className="delivery-options-title">Choose a delivery option:</div>

                  <div className="delivery-option">
                    <input type="radio" className="delivery-option-input" name="delivery-option-1" defaultChecked />
                    <div>
                      <div className="delivery-option-date">Wednesday, August 13</div>
                      <div className="delivery-option-price">FREE Shipping</div>
                    </div>
                  </div>

                  <div className="delivery-option">
                    <input type="radio" className="delivery-option-input" name="delivery-option-1" />
                    <div>
                      <div className="delivery-option-date">Saturday, August 9</div>
                      <div className="delivery-option-price">₹49 - Shipping</div>
                    </div>
                  </div>

                  <div className="delivery-option">
                    <input type="radio" className="delivery-option-input" name="delivery-option-1" />
                    <div>
                      <div className="delivery-option-date">Thursday, August 7</div>
                      <div className="delivery-option-price">₹99 - Shipping</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>

            <div className="payment-summary-row">
              <div>Price (3 Items ) :</div>
              <div className="payment-summary-money">₹999</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping & handling:</div>
              <div className="payment-summary-money">₹49</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before discount:</div>
              <div className="payment-summary-money">₹1048</div>
            </div>

            <div className="payment-summary-row">
              <div>Discount (5%):</div>
              <div className="payment-summary-money">₹53</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">₹995</div>
            </div>

            <button className="place-order-button ">Place your order</button>
          </div>
        </div>
      </div>
    </>
  );
}
 