import dayjs from 'dayjs';
import axios from 'axios';
import DeliveryOptions from './DeliveryOptions';


export default function orderSummary({ cartItems, deliveryOptions,
  fetchCartQuantity, fetchCheckoutData }) {

  async function updateQuantity(productId, event) {
    const newQuantity = Number(event.target.value)

    await axios.put(`/api/cart/${productId}`, {
      quantity: newQuantity
    })

    await fetchCartQuantity();
    // fetchCheckoutData()
  }

  async function removeCartItem(productId) {
    await axios.delete(`/api/cart/${productId}`);

    await fetchCartQuantity();
    // fetchCheckoutData();
  }
  return (
    <>
      <div className="order-summary">
        {deliveryOptions.length > 0 && cartItems.map(item => {
          const selectedDeliveryOption = deliveryOptions
            .find(option => {
              return option.id === item.deliveryOptionId
            });

          return (
            <div className="cart-item-container" key={item.productId}>
              <div className="delivery-date">
                Delivery date: {dayjs().add(selectedDeliveryOption.deliveryDays, 'day')
                  .format('dddd, MMMM D')}
              </div>

              <div className="cart-item-details-grid">
                <img className="product-image" src={`http://localhost:3000${item.product.image}`} alt="Product" />

                <div className="cart-item-details">
                  <div className="product-name">{item.product.name}</div>
                  <div className="product-price">₹{item.product.priceRupees}</div>
                  <div className="product-quantity">
                    <span>
                      Quantity:
                      <span className="update-quantity-container">
                        <select value={item.quantity}
                          onChange={(event) => updateQuantity(item.productId, event)}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          {
                            item.quantity > 10 && (
                              <option key={item.quantity} value={item.quantity}>
                                {item.quantity}
                              </option>
                            )
                          }
                        </select>
                      </span>
                    </span>
                    <span className="delete-item"
                      onClick={() => removeCartItem(item.productId)}>
                      <img className="delete-icon"
                        src="/images/icons/delete-icon.png" alt="delete-icon" />
                      <span>Remove</span>
                    </span>
                  </div>
                </div>
                <DeliveryOptions fetchCheckoutData={fetchCheckoutData}
                deliveryOptions={deliveryOptions} 
                item={item}
                />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}