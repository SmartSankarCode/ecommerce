import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import dayjs from 'dayjs';
import Header from '../../components/Header';
import OrderItems from "./OrderItems";

import "./OrdersPage.css";

export default function OrdersPage({ cartQuantity, isLoggedIn, fetchCartQuantity }) {

  const [orders, setOrders] = useState(null);

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
      {orders?.length > 0 ? (
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
                        <OrderItems item={item} orderId={order._id}
                          fetchCartQuantity={fetchCartQuantity} key={item._id} />
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      ) : (
        <>
          {orders && (
            <div className="no-orders">
              <img src="/frontend-images/no-orders.png" alt="No Orders" />
              <h2>You have no orders yet</h2>
              <p>When you place an order, you’ll see it here.</p>
              <Link to="/" className="browse-products-link">
                Start Shopping
              </Link>
            </div>
          )}
        </>
      )}

    </>
  );
}
