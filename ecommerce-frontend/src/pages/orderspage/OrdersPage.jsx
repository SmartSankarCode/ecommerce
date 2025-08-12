import "./OrdersPage.css";

export default function OrdersPage() {
  return (
    <div className="orders-page">
      <div className="page-title">Your Orders</div>

      <div className="orders-grid">
        <div className="order-container">
          <div className="order-header">
            <div className="order-header-left-section">
              <div className="order-date">
                <div className="order-header-label">Order Placed:</div>
                <div>August 12</div>
              </div>
              <div className="order-total">
                <div className="order-header-label">Total:</div>
                <div>₹3556</div>
              </div>
            </div>

            <div className="order-header-right-section">
              <div className="order-header-label">Order ID:</div>
              <div>89669993399939939993999399399939</div>
            </div>
          </div>

          {/* Order Items */}
          <div className="order-details-grid">
            <div className="product-image-container">
              <img
                src="images/products/Elephants Love Candle Holder with LED Candle.jpg"
                alt="Elephants Love Candle Holder"
              />
            </div>
            <div className="order-details">
              <div className="order-product-details">
                <div className="product-name">
                  Elephants Love Candle Holder With LED Candle
                </div>
                <div className="product-delivery-date">Arriving on: August 15</div>
                <div className="product-quantity">Quantity: 1</div>
                <button className="buy-again-button ">
                  <img
                    className="buy-again-icon"
                    src="images/icons/buy-again.png"
                    alt="Buy again"
                  />
                  <span className="buy-again-message">Add to Cart</span>
                </button>
              </div>
              <div className="product-actions">
                <a href="tracking.html">
                  <button className="track-package-button ">
                    Track package
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
