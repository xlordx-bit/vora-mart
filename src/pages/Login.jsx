// pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config.js";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/invalid-credential') {
        setError("Invalid email or password. Please try again.");
      } else if (err.code === 'auth/network-request-failed') {
        setError("Network error. Please check your connection.");
      } else {
        setError("An error occurred. Please try again later.");
      }
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address first");
      return;
    }

    try {
      await resetPassword(email);
      setError("Password reset email sent! Check your inbox.");
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError("No account exists with this email");
      } else {
        setError("Failed to reset password. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Welcome Back</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            placeholder="Enter your password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="form-footer">
          <button 
            type="button" 
            className="forgot-password-link" 
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>
          <div className="register-link-container">
            <span>Don't have an account?</span>
            <Link to="/register" className="register-link">Sign up</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
