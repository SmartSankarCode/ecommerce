import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

import Header from '../../components/Header';
import './TrackingPage.css';


export default function TrackingPage({ cartQuantity }) {
  const { orderId, itemId } = useParams();
  const [item, setItem] = useState(null);


  useEffect(() => {
    async function fetchOrderData() {
      const res = await axios.get('/api/orders/my-orders', {
        withCredentials: true
      });

      // find order by matching logic using id
      const requiredOrder = res.data.find(order => {
        return order._id === orderId
      });

      // find matching item
      const requiredItem = requiredOrder.items.find(item => {
        return item._id === itemId
      });

      setItem(requiredItem);

    }

    fetchOrderData();
  }, [])

  return (
    <>
      <Header cartQuantity={cartQuantity} />
      {/* getting item details take more time than actual
      bcz of matching technique used above */}
      {item && (
        <div>
          <div className="tracking-page">
            <div className="order-tracking">

              <div className="delivery-date">
                Arriving on: {dayjs(item.estimatedDeliveryTime).format('MMMM D')}
              </div>

              <div className="product-info">
                {item.productId.name}
              </div>

              <div className="product-info">
                Quantity: {item.quantity}
              </div>

              <img
                className="product-image"
                src={`http://localhost:3000${item.productId.image}`}
                alt={item.productId.name}
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
      )}
    </>
  );
}
