import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config.js';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="nav-bar">
      <Link to="/" className="logo">
        <img src={logo} alt="VORA MART" className="logo-image" />
        <span className="logo-text">VORA MART</span>
      </Link>
      <ul className="nav-menu">
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/shop">SHOP</Link></li>
        <li><Link to="/services">SERVICES</Link></li>
        <li><Link to="/blog">BLOG</Link></li>
        <li><Link to="/contact">CONTACT</Link></li>
        {currentUser ? (
          <>
            <li className="user-profile" onMouseEnter={() => setShowUserMenu(true)} onMouseLeave={() => setShowUserMenu(false)}>
              <span className="user-name">Hello, {currentUser.displayName || 'User'}</span>
              {showUserMenu && (
                <div className="user-dropdown">
                  <Link to="/profile">My Profile</Link>
                  <Link to="/my-orders">My Orders</Link>
                  <Link to="/wishlist">Wishlist</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </li>
            <li><Link to="/cart" className="cart-icon">🛒</Link></li>
          </>
        ) : (          <li className="auth-buttons">
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/register" className="signup-btn">Sign Up</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
