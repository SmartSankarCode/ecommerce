import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from 'dayjs';
import Header from '../../components/Header';

import "./OrdersPage.css";
import { Fragment } from "react";

export default function OrdersPage({ cartQuantity, isLoggedIn }) {

  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  async function fetchOrders() {
    const response = await axios.get("/api/orders/my-orders", {
      withCredentials: true,
    });

    setOrders(response.data);
    // console.log(response.data);
  }
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    fetchOrders();
  }, []);

  return (
    <>
      <Header cartQuantity={cartQuantity} isLoggedIn={isLoggedIn} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map(order => {
            return (
              <div className="order-container" key={order._id}>
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(order.orderedAt).format('MMMM D')}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>₹{order.totalAmount}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order._id}</div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="order-details-grid">
                {order.items.map(item => {
                  return (
                    <Fragment key={item._id}>
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
                    </Fragment>
                  )
                })}
                </div>
              </div>
            )
          })}

        </div>
      </div>
    </>
  );
}
