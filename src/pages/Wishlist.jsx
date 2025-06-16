import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-empty">
        <h2>Your Wishlist is Empty</h2>
        <p>Add items to your wishlist to save them for later!</p>
        <button onClick={() => navigate('/shop')} className="shop-now-btn">
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h1>My Wishlist</h1>
        <button onClick={clearWishlist} className="clear-wishlist-btn">
          Clear Wishlist
        </button>
      </div>

      <div className="wishlist-grid">
        {wishlistItems.map((item) => (
          <div key={item.id} className="wishlist-item">
            <div className="wishlist-item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="wishlist-item-info">
              <h3>{item.name}</h3>
              <p className="price">₹{item.price.toFixed(2)}</p>
              <div className="wishlist-item-actions">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="add-to-cart-btn"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleViewProduct(item.id)}
                  className="view-product-btn"
                >
                  View Product
                </button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
