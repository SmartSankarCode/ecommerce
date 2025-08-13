import { useState } from "react";
import axios from "axios";
import { Fragment } from "react";
import dayjs from 'dayjs';
import { Link } from "react-router-dom";


//  i seperate this into component so that addtocart msg show
//  to individual item
export default function OrderItems({ item, fetchCartQuantity, orderId}) {
  const [showMessage, setShowMessage] = useState(false);

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
        <img
          src={`http://localhost:3000${item.productId.image}`}
          alt={item.productId.name}
        />
      </div>
      <div className="order-details" >
        <div className="order-product-details">
          <div className="product-name">
            {item.productId.name}
          </div>
          <div className="product-delivery-date">
            Arriving on: {dayjs(item.estimatedDeliveryTime).format('MMMM D')}
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
                  ? "images/icons/checkmark-white.png"
                  : "images/icons/buy-again.png"
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