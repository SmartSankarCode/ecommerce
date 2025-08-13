import Header from '../../components/Header';
import './TrackingPage.css';

export default function TrackingPage({ cartQuantity }) {

  return (
    <>
      <Header cartQuantity={cartQuantity} />
      <div>
        <div className="tracking-page">
          <div className="order-tracking">

            <div className="delivery-date">
              Arriving on Thursday, August 14
            </div>

            <div className="product-info">
              Elephants Love Candle Holder With LED Candle
            </div>

            <div className="product-info">
              Quantity: 1
            </div>

            <img
              className="product-image"
              src="/images/products/Elephants Love Candle Holder with LED Candle.jpg"
              alt="Product"
            />

            <div className="progress-labels-container">
              <div className="progress-label">Preparing</div>
              <div className="progress-label current-status">Shipped</div>
              <div className="progress-label">Delivered</div>
            </div>

            <div className="progress-bar-container">
              <div className="progress-bar"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
