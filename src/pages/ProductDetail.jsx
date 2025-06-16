import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { FiShoppingCart, FiHeart, FiArrowLeft, FiStar, FiTruck, FiShield, FiPackage } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { products } from '../assets/products';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find(p => p.id === parseInt(id));

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success('Added to cart!');
  };
  
  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist!');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist!');
    }
  };

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found!</h2>
        <button onClick={() => navigate('/shop')}>Back to Shop</button>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <button className="back-button" onClick={() => navigate('/shop')}>
        <FiArrowLeft /> Back to Shop
      </button>
      
      <div className="product-detail-content">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          
          <div className="product-meta">
            <div className="product-rating">
              <FiStar /> {product.rating}
            </div>
            <span className="product-category">{product.category}</span>
          </div>
          
          <p className="product-description">{product.description}</p>
          
          <div className="product-price">
            <span className="price-amount">${product.price}</span>
            {product.originalPrice && (
              <span className="price-original">${product.originalPrice}</span>
            )}
          </div>

          <div className="quantity-selector">
            <button 
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              disabled={quantity === 1}
            >
              -
            </button>
            <span>{quantity}</span>
            <button 
              onClick={() => setQuantity(q => q + 1)}
            >
              +
            </button>
          </div>
          
          <div className="product-actions">
            <button className="add-to-cart" onClick={handleAddToCart}>
              <FiShoppingCart /> Add to Cart
            </button>
            <button 
              className={`wishlist-button ${isInWishlist(product.id) ? 'active' : ''}`}
              onClick={handleWishlistToggle}
            >
              <FiHeart />
            </button>
          </div>
        </div>
      </div>

      <div className="product-additional-info">
        <div className="info-card">
          <h3>Shipping Information</h3>
          <ul>
            <li><FiTruck /> Free shipping on orders over $50</li>
            <li><FiPackage /> Delivery within 3-5 business days</li>
            <li><FiShield /> Secure packaging</li>
          </ul>
        </div>
        
        <div className="info-card">
          <h3>Product Features</h3>
          <ul>
            {product.features?.map((feature, index) => (
              <li key={index}>{feature}</li>
            )) || (
              <>
                <li>High-quality materials</li>
                <li>Premium design</li>
                <li>Long-lasting durability</li>
              </>
            )}
          </ul>
        </div>
        
        <div className="info-card">
          <h3>Returns & Warranty</h3>
          <ul>
            <li><FiShield /> 30-day return policy</li>
            <li><FiShield /> 1-year warranty</li>
            <li><FiShield /> 100% money-back guarantee</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
