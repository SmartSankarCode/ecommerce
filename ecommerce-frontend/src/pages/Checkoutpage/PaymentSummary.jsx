import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PaymentSummary({ paymentSummary, fetchCartQuantity }) {
  const navigate = useNavigate();

  async function placeOrder() {
    await axios.post('/api/orders/place', {}, { withCredentials: true });
    await fetchCartQuantity();
    navigate('/orders');
  }

  return (
    <>
      {paymentSummary && (
        <div className="payment-summary">
          <div className="payment-summary-title">Payment Summary</div>
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

          <button className="place-order-button "
            onClick={placeOrder}>Place your order</button>
        </div>
      )}
    </>
  )
}