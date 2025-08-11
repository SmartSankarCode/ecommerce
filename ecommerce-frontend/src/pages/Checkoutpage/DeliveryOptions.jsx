import dayjs from 'dayjs';
import axios from 'axios';

export default function DeliveryOptions({deliveryOptions, fetchCheckoutData, item}) {
  async function updateDeliveryOption(productId, deliveryOptionId) {
    await axios.put(`/api/cart/${productId}`, {
      deliveryOptionId
    })
    
    // await fetchCartQuantity();
    fetchCheckoutData();
  }
  return (
    <>
      <div className="delivery-options">
        <div className="delivery-options-title">Choose a delivery option:</div>
        {deliveryOptions.map(option => {
          const deliveryDate = dayjs().add(option.deliveryDays, 'day')
            .format('dddd, MMMM D');
          return (
            <div className="delivery-option" key={option.id}>
              <input type="radio" className="delivery-option-input"
                name={`delivery-option-${item.productId}`}
                checked={option.id === item.deliveryOptionId}
                onChange={() => updateDeliveryOption(item.productId, option.id)} />
              <div>
                <div className="delivery-option-date">{deliveryDate}</div>
                <div className="delivery-option-price">
                  {option.priceRupees === 0
                    ? "FREE Shipping"
                    : `₹${option.priceRupees} - Shipping`}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}