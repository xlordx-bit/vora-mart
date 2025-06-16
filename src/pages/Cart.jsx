import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity > 0 && newQuantity <= item.stock) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store order details in localStorage (you might want to use a backend instead)
      const order = {
        items: cartItems,
        total: getTotalPrice(),
        date: new Date().toISOString(),
        orderId: Math.random().toString(36).substr(2, 9).toUpperCase()
      };
      
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Clear cart and navigate to success page
      clearCart();
      navigate('/order-success', { state: { order } });
    } catch (error) {
      console.error('Error processing order:', error);
      alert('Failed to process order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your Cart is Empty</h2>
        <p>Add some products to your cart to see them here!</p>
        <button onClick={() => navigate('/shop')} className="continue-shopping">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-price">${item.price}</p>
                
                <div className="quantity-controls">
                  <button
                    onClick={() => handleQuantityChange(item, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="item-actions">
                <p className="item-subtotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-item"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>FREE</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="checkout-button"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
          </button>
          <button
            onClick={() => navigate('/shop')}
            className="continue-shopping"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
