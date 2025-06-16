import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending the message
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Store the message in localStorage
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    const newMessage = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString(),
      status: 'Received'
    };
    messages.push(newMessage);
    localStorage.setItem('contactMessages', JSON.stringify(messages));

    // Show success message
    toast.success('Message sent successfully! We will get back to you soon.');

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setLoading(false);
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-info">
          <h1>Contact Us</h1>
          <p>Get in touch with us for any questions or concerns.</p>
          
          <div className="contact-details">
            <div className="contact-item">
              <div className="icon">📍</div>
              <div className="info">
                <h3>Address</h3>
                <p>123 Tech Street, Digital City, 12345</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="icon">📞</div>
              <div className="info">
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="icon">📧</div>
              <div className="info">
                <h3>Email</h3>
                <p>support@voramart.com</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="icon">⏰</div>
              <div className="info">
                <h3>Business Hours</h3>
                <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                <p>Sat - Sun: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>

          <div className="social-links">
            <a href="#" className="social-link">Facebook</a>
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">Instagram</a>
            <a href="#" className="social-link">LinkedIn</a>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your Email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Message Subject"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your Message"
                rows="5"
              ></textarea>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.67890!2d-73.935242!3d40.730610!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM40zMCczMC42IkEgNzPCsDE1JzEyLjkiVw!5e0!3m2!1sen!2sus!4v1234567890"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
