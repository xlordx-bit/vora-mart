import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { products } from '../assets/products';
import './Shop.css';

const Shop = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  return (
    <div className="shop-container">
      <div className="shop-header">
        <h1>Our Shop</h1>
        <div className="shop-controls">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="default">Default Sorting</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">By Rating</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div 
            key={product.id} 
            className="product-card" 
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-details">
                <span className="product-price">${product.price}</span>
                <div className="product-rating">
                  ⭐ {product.rating} ({product.stock} in stock)
                </div>
              </div>              <button 
                className="add-to-cart" 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation when clicking the button
                  addToCart(product, 1);
                  toast.success(`${product.name} added to cart!`, {
                    icon: '🛍️'
                  });
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;