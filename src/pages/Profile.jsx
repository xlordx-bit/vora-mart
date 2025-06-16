import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase-config';
import toast from 'react-hot-toast';
import './Profile.css';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock } from 'react-icons/fa';

const Profile = () => {
  const { currentUser, updateUserEmail, updateUserPassword, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    displayName: currentUser?.displayName || '',
    email: currentUser?.email || '',
    phone: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update basic profile info
      if (formData.displayName !== currentUser.displayName) {
        await updateProfile(auth.currentUser, {
          displayName: formData.displayName
        });
      }

      // Update email if changed
      if (formData.email !== currentUser.email) {
        await updateUserEmail(formData.email);
      }

      // Update password if provided
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error("New passwords don't match");
        }
        await updateUserPassword(formData.newPassword);
      }

      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>

      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-placeholder">
              {currentUser?.displayName?.[0]?.toUpperCase() || 'U'}
            </div>
          </div>
          <div className="profile-info">
            <h2>{currentUser?.displayName || 'User'}</h2>
            <p>{currentUser?.email}</p>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="profile-form">
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-group">
              <label>
                <FaUser /> Name
              </label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>
                <FaEnvelope /> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>
                <FaPhone /> Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label>
                <FaMapMarkerAlt /> Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter your address"
              />
            </div>
          </div>

          {isEditing && (
            <div className="form-section">
              <h3>Change Password</h3>
              <div className="form-group">
                <label>
                  <FaLock /> Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  placeholder="Enter current password"
                />
              </div>

              <div className="form-group">
                <label>
                  <FaLock /> New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                />
              </div>

              <div className="form-group">
                <label>
                  <FaLock /> Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          )}

          <div className="profile-actions">
            {!isEditing ? (
              <button
                type="button"
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  className="save-button"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setIsEditing(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
              </>
            )}
            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
              disabled={loading}
            >
              Logout
            </button>
          </div>
        </form>

        <div className="profile-sections">
          <div className="quick-links">
            <h3>Quick Links</h3>
            <button onClick={() => navigate('/my-orders')}>My Orders</button>
            <button onClick={() => navigate('/wishlist')}>My Wishlist</button>
            <button onClick={() => navigate('/cart')}>My Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
