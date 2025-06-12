import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';
import headphoneImg from '../assets/headphone1.webp';

const Home = () => {
  const { currentUser } = useAuth();

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
    return () => observer.disconnect();
  }, []);

  return (
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
          <img src={headphoneImg} alt="Hero" className="hero-img" />
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

      {/* PRODUCTS */}
      <section className="products-section" data-animate>
        <h3>Featured Products</h3>
        <div className="product-grid">
          <div className="product-card">Smartwatch</div>
          <div className="product-card">Wireless Earbuds</div>
          <div className="product-card">AI Chat Assistant</div>
          <div className="product-card">eLearning Pack</div>
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
    </div>
  );
};

export default Home;
