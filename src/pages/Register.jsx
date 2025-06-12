import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase-config.js";
import { useAuth } from "../context/AuthContext";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // If user is already logged in, redirect to home
  React.useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError("");
      setLoading(true);

      // Form validation
      if (!formData.name.trim()) {
        throw new Error("Name is required");
      }

      if (!formData.email.trim()) {
        throw new Error("Email is required");
      }

      if (!formData.password) {
        throw new Error("Password is required");
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (formData.password.length < 6) {
        throw new Error("Password should be at least 6 characters");
      }

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Update user profile with name
      await updateProfile(userCredential.user, {
        displayName: formData.name
      });

      // Clear form data
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });

      // Navigate to home page
      navigate('/');
      
    } catch (err) {
      console.error('Registration error:', err);
      
      // Handle specific Firebase errors
      if (err?.code === 'auth/email-already-in-use') {
        setError("This email is already registered");
      } else if (err?.code === 'auth/invalid-email') {
        setError("Invalid email address");
      } else if (err?.code === 'auth/network-request-failed') {
        setError("Network error. Please check your connection.");
      } else if (err?.code === 'auth/weak-password') {
        setError("Password is too weak. Please use a stronger password.");
      } else if (err?.message) {
        // Handle custom validation errors
        setError(err.message);
      } else {
        setError("Failed to create account. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Create Account</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
        <div className="login-link-container">
          <span>Already have an account?</span>
          <Link to="/login" className="login-link">Login here</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;