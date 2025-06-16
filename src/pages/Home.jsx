import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiStar, FiChevronLeft, FiChevronRight, FiCalendar, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { featuredProducts } from '../data/featuredProducts';
import { blogPosts } from '../assets/blogData';
import Footer from '../components/Footer';
import './Home.css';
import img21 from '../assets/21.jpg';

const imageStyle = {
  objectFit: 'contain',
  padding: '1rem',
  background: '#fff'
};

const Home = () => {
  const { currentUser } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const scrollElements = document.querySelectorAll("[data-animate]");
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
          }
        });
      },
      { threshold: 0.1 }
    );
    scrollElements.forEach(el => observer.observe(el));
    return () => {
      scrollElements.forEach(el => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(featuredProducts.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(featuredProducts.length / 3)) % Math.ceil(featuredProducts.length / 3));
  };

  return (
    <>
      <div className="home-container">
        {/* HERO */}
        <section className="hero-section" data-animate>
          <div className="hero-left">
            <h2 className="hero-title">Your One-Stop Digital Store</h2>
            <p className="hero-sub">Explore premium products & smart services for every need.</p>
            {!currentUser && (
              <Link to="/register">
                <button className="cta-button">Get Started</button>
              </Link>
            )}
          </div>
          <div className="hero-right">
            <img src={img21} alt="Hero" className="hero-img" />
          </div>
        </section>

        {/* FEATURES */}
        <section className="grid-highlight" data-animate>
          <div className="grid-item">Free Delivery</div>
          <div className="grid-item">AI Recommendations</div>
          <div className="grid-item">Top Quality</div>
          <div className="grid-item">Global Reach</div>
        </section>

        {/* CATEGORIES */}
        <section className="category-section" data-animate>
          <h3>Shop by Categories</h3>
          <div className="categories">
            <div className="category-card">Fashion</div>
            <div className="category-card">Electronics</div>
            <div className="category-card">AI Tools</div>
            <div className="category-card">Subscriptions</div>
          </div>
        </section>

        {/* ENHANCED FEATURED PRODUCTS SECTION */}
        <section className="featured-products-section" data-animate>
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Discover our handpicked premium items</p>
          </div>

          <div className="products-slider-container">
            <button className="slider-button prev" onClick={prevSlide}>
              <FiChevronLeft />
            </button>

            <div className="products-slider">
              <div 
                className="products-track" 
                style={{ 
                  transform: `translateX(-${currentSlide * 100}%)`,
                  width: `${Math.ceil(featuredProducts.length / 3) * 100}%`
                }}
              >
                {featuredProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="product-badge">{product.badge}</div>
                    <div className="product-image">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        style={imageStyle}
                      />
                      <div className="product-actions">
                        <button className="action-button cart">
                          <FiShoppingCart />
                        </button>
                        <button className="action-button wishlist">
                          <FiHeart />
                        </button>
                      </div>
                    </div>
                    <div className="product-info">
                      <div className="product-category">{product.category}</div>
                      <h3 className="product-name">{product.name}</h3>
                      <div className="product-rating">
                        <FiStar className="star-filled" />
                        <span>{product.rating}</span>
                      </div>
                      <p className="product-description">{product.description}</p>
                      <div className="product-price">
                        <span className="price">${product.price}</span>
                        <Link to={`/product/${product.id}`} className="view-button">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="slider-button next" onClick={nextSlide}>
              <FiChevronRight />
            </button>
          </div>

          <div className="slider-dots">
            {Array.from({ length: Math.ceil(featuredProducts.length / 3) }).map((_, index) => (
              <button
                key={index}
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>

          <div className="view-all-container">
            <Link to="/shop" className="view-all-button">
              View All Products
            </Link>
          </div>
        </section>

        {/* SERVICES */}
        <section className="services-section" data-animate>
          <h3>Smart Services</h3>
          <ul className="services-list">
            <li>Logo & Branding Design</li>
            <li>Resume Building with AI</li>
            <li>Virtual Assistant</li>
            <li>Career Counselling</li>
          </ul>
        </section>

        {/* TESTIMONIALS */}
        <section className="testimonial-section" data-animate>
          <h3>What Our Customers Say</h3>
          <div className="testimonial-card">
            <div className="testimonial-text">
              "Best marketplace I've used! The AI-powered suggestions are incredibly accurate and saved me hours of browsing."
            </div>
            <div className="testimonial-author">- Sarah Johnson</div>
          </div>
        </section>

        {/* BLOG SECTION */}
        <section className="blog-section" data-animate>
          <div className="section-header">
            <h2 className="section-title">Latest Blog Posts</h2>
            <p className="section-subtitle">Stay updated with the latest tech trends and news</p>
          </div>

          <div className="blog-grid">
            {blogPosts.slice(0, 3).map((post) => (
              <article key={post.id} className="blog-card">
                <div className="blog-image">
                  <img src={post.image} alt={post.title} />
                  <div className="blog-category">{post.category}</div>
                </div>
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="blog-date">
                      <FiCalendar />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="blog-author">
                      <FiUser />
                      {post.author}
                    </span>
                  </div>
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-summary">{post.summary}</p>
                  <div className="blog-tags">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="blog-tag">#{tag}</span>
                    ))}
                  </div>
                  <Link to={`/blog/${post.id}`} className="read-more">
                    Read More
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="view-all-container">
            <Link to="/blog" className="view-all-button">
              View All Posts
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
