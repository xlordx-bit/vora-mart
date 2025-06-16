import React from 'react';
import './Services.css';
import { FaShippingFast, FaHeadset, FaExchangeAlt, FaShieldAlt, FaGift, FaCreditCard } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      id: 1,
      icon: <FaShippingFast />,
      title: "Free Shipping",
      description: "Free shipping on all orders over ₹999. Fast and reliable delivery to your doorstep."
    },
    {
      id: 2,
      icon: <FaHeadset />,
      title: "24/7 Support",
      description: "Our customer service team is available 24/7 to assist you with any queries or concerns."
    },
    {
      id: 3,
      icon: <FaExchangeAlt />,
      title: "Easy Returns",
      description: "Hassle-free return policy. Return or exchange products within 30 days of delivery."
    },
    {
      id: 4,
      icon: <FaShieldAlt />,
      title: "Secure Payments",
      description: "100% secure payment processing. We ensure your payment information is protected."
    },
    {
      id: 5,
      icon: <FaGift />,
      title: "Special Offers",
      description: "Regular discounts and special offers for our valued customers. Save more on your purchases."
    },
    {
      id: 6,
      icon: <FaCreditCard />,
      title: "Multiple Payment Options",
      description: "Choose from various payment methods including credit cards, UPI, and cash on delivery."
    }
  ];

  const specialServices = [
    {
      title: "Premium Membership",
      features: [
        "Early access to sales",
        "Exclusive discounts",
        "Free priority shipping",
        "Special member events",
        "Dedicated support line"
      ],
      price: "₹999/year"
    },
    {
      title: "Installation Services",
      features: [
        "Professional installation",
        "Expert technicians",
        "Service warranty",
        "Flexible scheduling",
        "Post-installation support"
      ],
      price: "Starting from ₹499"
    }
  ];

  return (
    <div className="services-container">
      <section className="services-hero">
        <h1>Our Services</h1>
        <p>Discover the premium services that make VORA MART stand out</p>
      </section>

      <section className="core-services">
        <h2>Core Services</h2>
        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="premium-services">
        <h2>Premium Services</h2>
        <div className="premium-services-grid">
          {specialServices.map((service, index) => (
            <div key={index} className="premium-service-card">
              <h3>{service.title}</h3>
              <ul>
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <div className="price">{service.price}</div>
              <button className="subscribe-btn">Learn More</button>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-support">
        <h2>Need Help?</h2>
        <p>Our customer service team is here to assist you</p>
        <div className="support-options">
          <div className="support-option">
            <FaHeadset className="support-icon" />
            <h3>Call Us</h3>
            <p>+91 1234567890</p>
          </div>
          <div className="support-option">
            <button className="chat-btn">Start Live Chat</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
