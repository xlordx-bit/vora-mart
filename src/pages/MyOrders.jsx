import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MyOrders.css';

const MyOrders = () => {
  const navigate = useNavigate();
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');

  if (orders.length === 0) {
    return (
      <div className="no-orders">
        <h2>No Orders Yet</h2>
        <p>Looks like you haven't placed any orders yet.</p>
        <button onClick={() => navigate('/shop')} className="shop-now-btn">
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="my-orders-container">
      <h1>My Orders</h1>
      <div className="orders-list">
        {orders.map((order, index) => (
          <div key={order.orderId} className="order-card">
            <div className="order-header">
              <div className="order-info">
                <h3>Order #{order.orderId}</h3>
                <p className="order-date">
                  {new Date(order.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div className="order-total">
                Total: ${order.total.toFixed(2)}
              </div>
            </div>

            <div className="order-items-list">
              {order.items.map((item) => (
                <div key={item.id} className="order-item">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p className="item-quantity">Quantity: {item.quantity}</p>
                    <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button 
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="buy-again-btn"
                  >
                    Buy Again
                  </button>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <div className="delivery-status">
                <span className="status-label">Status:</span>
                <span className="status-value">Delivered</span>
              </div>
              <button
                onClick={() => {
                  const orderItems = order.items.map(item => ({ ...item, quantity: 1 }));
                  orderItems.forEach(item => {
                    navigate(`/product/${item.id}`);
                  });
                }}
                className="reorder-btn"
              >
                Reorder All
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
