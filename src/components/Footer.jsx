import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '../assets/logo.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <Link to="/" className="footer-logo">
            <img src={logo} alt="VORA MART" className="footer-logo-image" />
            <span className="footer-logo-text">VORA MART</span>
          </Link>
          <p>Your one-stop shop for premium electronics and accessories.</p>
          <div className="socials">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>
            <span>Phone: +1 234 567 8900</span>
            <span>Email: support@voramart.com</span>
            <span>Address: 123 Tech Street, Digital City</span>
          </p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} VORA MART | All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
