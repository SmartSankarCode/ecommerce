import { useState, Fragment } from "react";
import axios from "axios";
import dayjs from 'dayjs';
import { Link } from "react-router-dom";


//  i seperate this into component so that addtocart msg show
//  to individual item
export default function OrderItems({ item, fetchCartQuantity, orderId}) {
  const [showMessage, setShowMessage] = useState(false);

  const today = dayjs();
  const deliveryTime = dayjs(item.estimatedDeliveryTime);
  const deliveryMessage = today.isBefore(deliveryTime)
    ? "Arriving on"
    : "Delivered on";

  async function addToCart(productId) {
    await axios.post('/api/cart', {
      productId,
      quantity: 1
    }, {
      withCredentials: true,
    });

    await fetchCartQuantity();
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 1000);// appear msg for 2s

  }

  return (
    <Fragment >
      <div className="product-image-container"  >
        <Link to={`/product/${item.productId._id}`}>
          <img
            src={item.productId.image}
            alt={item.productId.name}
          />
        </Link>
      </div>
      <div className="order-details" >
        <div className="order-product-details">
          <div className="product-name">
            {item.productId.name}
          </div>
          <div className="product-delivery-date">
            {deliveryMessage}: {dayjs(item.estimatedDeliveryTime).format('MMMM D')}
          </div>
          <div className="product-quantity">
            Quantity: {item.quantity}
          </div>
          <button className="buy-again-button "
            onClick={() => addToCart(item.productId)}>
            <img
              className="buy-again-icon"
              src={
                showMessage
                  ? "/frontend-images/icons/checkmark-white.png"
                  : "/frontend-images/icons/buy-again.png"
              }
              alt={showMessage ? "Item Added" : "Buy again"}
            />
            <span className="buy-again-message">
              {showMessage ? "Added" : "Add to Cart"}
            </span>
          </button>
        </div>
        <div className="product-actions">
          <Link to={`/tracking/${orderId}/${item._id}`}>
            <button className="track-package-button ">
              Track package
            </button>
          </Link>
        </div>
      </div>
    </Fragment>
  )
}