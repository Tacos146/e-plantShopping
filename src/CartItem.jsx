import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';


const CartItem = ({ onContinueShopping, cartCount, setCartCount, }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  
  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      return total + item.quantity * parseFloat(item.cost.replace('$', '')); // Convert price to value and multiply
    }, 0).toFixed(2); // Round two decimal
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e); // Call method in parent component
  };


  const handleIncrement = (item) => {
    console.log('Pushed plus button', item);
    setCartCount(prev => prev + 1);
  
    dispatch(updateQuantity({ ...item, quantity: item.quantity + 1 }));
  };


  const handleDecrement = (item) => {
    console.log('Pushed minus button', item);
    setCartCount(prev => prev - 1);


    if (item.quantity > 1) {
      dispatch(updateQuantity({ ...item, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item)); // Delete if quantity becomes less than one
    }
  };

  

  const handleRemove = (item) => {
    console.log('Pushed delete button', item);
    setCartCount(prev => prev - item.quantity);

    dispatch(removeItem(item));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return (item.quantity * parseFloat(item.cost.replace('$', ''))).toFixed(2); // Calculate decimal
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={ () => handleDecrement(item)} >-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>p
                <button className="cart-item-button cart-item-button-inc" onClick={() => {handleIncrement(item);add()}}>+</button>
              </div>

              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


