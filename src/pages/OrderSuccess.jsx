import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    navigate('/shop');
    return null;
  }

  return (
    <div className="order-success">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase</p>
        
        <div className="order-details">
          <h2>Order Details</h2>
          <p className="order-id">Order ID: {order.orderId}</p>
          
          <div className="order-items">
            {order.items.map(item => (
              <div key={item.id} className="order-item">
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="order-total">
            <span>Total Amount:</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="action-buttons">
          <button onClick={() => navigate('/shop')} className="continue-shopping">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
