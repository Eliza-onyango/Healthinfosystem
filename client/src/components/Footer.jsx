import React from 'react';
import { 
  FaHospital, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { icon: <FaFacebook />, url: "https://facebook.com" },
    { icon: <FaTwitter />, url: "https://twitter.com" },
    { icon: <FaLinkedin />, url: "https://linkedin.com" },
    { icon: <FaYoutube />, url: "https://youtube.com" }
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Clients", path: "/clients" },
    { name: "Programs", path: "/programs" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  const contactInfo = [
    { icon: <FaPhone />, text: "+1 (234) 567-8900" },
    { icon: <FaEnvelope />, text: "info@healthinfosystem.com" },
    { icon: <FaMapMarkerAlt />, text: "123 Medical Drive, Health City, HC 12345" }
  ];

  return (
    <footer className="bg-dark text-white pt-5 pb-3 w-100">
      <div className="container-fluid px-5">
        <div className="row g-4">
          {/* Brand Column */}
          <div className="col-lg-4">
            <div className="d-flex align-items-center mb-3">
              <FaHospital className="fs-2 text-primary me-2" />
              <h4 className="mb-0">HealthInfo System</h4>
            </div>
            <p className="text-muted">
              A comprehensive health management solution designed for modern clinics 
              and hospitals to streamline patient care and program management.
            </p>
            
            <div className="social-links mt-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white me-3 fs-5"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="col-lg-2 col-md-6">
            <h5 className="mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              {quickLinks.map((link, index) => (
                <li key={index} className="mb-2">
                  <Link 
                    to={link.path} 
                    className="text-white text-decoration-none hover-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="col-lg-3 col-md-6">
            <h5 className="mb-4">Contact Us</h5>
            <ul className="list-unstyled">
              {contactInfo.map((item, index) => (
                <li key={index} className="d-flex align-items-start mb-3">
                  <span className="text-primary me-2 mt-1">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="col-lg-3">
            <h5 className="mb-4">Newsletter</h5>
            <p className="text-muted">Subscribe to our newsletter for updates.</p>
            <div className="input-group mb-3">
              <input 
                type="email" 
                className="form-control" 
                placeholder="Your email" 
                aria-label="Your email"
              />
              <button className="btn btn-primary" type="button">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-top border-secondary pt-4 mt-4">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <small className="text-muted">
                © {currentYear} HealthInfo System. All rights reserved.
              </small>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <small className="text-muted">
                <a href="/privacy" className="text-muted text-decoration-none me-3">Privacy Policy</a>
                <a href="/terms" className="text-muted text-decoration-none">Terms of Service</a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;