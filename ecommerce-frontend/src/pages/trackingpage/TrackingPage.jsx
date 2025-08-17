import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

import Header from '../../components/Header';
import './TrackingPage.css';


export default function TrackingPage({ cartQuantity, isLoggedIn }) {
  const { orderId, itemId } = useParams();
  const [item, setItem] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0);
  // const [currentStage, setCurrentStage] = useState('');
  const [deliveredMessage, setDeliveredMessage] = useState('');
  const navigate = useNavigate();



  useEffect(() => {
    if (isLoggedIn === null) return; 

    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

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

      const today = dayjs();
      const orderTime = dayjs(requiredOrder.orderedAt);
      const deliveryTime = dayjs(requiredItem.estimatedDeliveryTime);

      const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;
      setTimeout(() => {
        setProgressPercent(percentProgress);
      }, 100); // smooth transition


      const deliveredMessage = today < deliveryTime ? 'Arriving on' : 'Delivered on';
      setDeliveredMessage(deliveredMessage);
      /*
      if (progressPercent < 50) {
        setCurrentStage('Preparing');
      } else if (progressPercent < 100) {
        setCurrentStage('Shipped');
      } else {
        setCurrentStage('Delivered');
      }
      */

    }

    fetchOrderData();
  }, [orderId, itemId, isLoggedIn])

  return (
    <>
      <title>Tracking</title>
      <Header cartQuantity={cartQuantity} isLoggedIn={isLoggedIn} />
      {/* getting item details take more time than actual
      bcz of matching technique used above */}
      {item && (
        <div>
          <div className="tracking-page">
            <div className="order-tracking">

              <div className="delivery-date">
                {deliveredMessage} {dayjs(item.estimatedDeliveryTime).format('MMMM D')}
              </div>

              <div className="product-info">
                {item.productId.name}
              </div>

              <div className="product-info">
                Quantity: {item.quantity}
              </div>

              <img
                className="product-image"
                src={item.productId.image}
                alt={item.productId.name}
              />

              <div className="progress-labels-container">
                <div className={`progress-label ${progressPercent < 50
                  ? 'current-status' : ''}`}>Preparing</div>
                <div className={`progress-label ${progressPercent >= 50 && progressPercent < 100
                  ? 'current-status' : ''}`}>Shipped</div>
                <div className={`progress-label ${progressPercent > 100
                  ? 'current-status' : ''}`}>Delivered</div>
              </div>

              <div className="progress-bar-container">
                <div className="progress-bar"
                  style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
