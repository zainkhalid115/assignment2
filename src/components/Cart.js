import React from 'react';
import './Cart.css';

const Cart = ({ cartItems, onCheckout }) => {
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckoutClick = () => {
    if (cartItems.length > 0) {
      onCheckout(cartItems, total);
    } else {
      alert('Cart is empty!');
    }
  };

  return (
    <div className="cart">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul className="cart-items">
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              {item.name} - ${item.price.toFixed(2)} x {item.quantity}
            </li>
          ))}
        </ul>
      )}
      <div className="cart-summary">
        <h3>Total: ${total.toFixed(2)}</h3>
        <button
          onClick={handleCheckoutClick}
          disabled={cartItems.length === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;