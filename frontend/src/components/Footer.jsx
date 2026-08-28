import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const location = useLocation();
  
  if (['/dashboard', '/all', '/add', '/calculator', '/directory', '/profile'].includes(location.pathname)) {
    return null;
  }

  return (
    <footer className="app-footer">
      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} SubSight Tracker. All rights reserved.
      </div>
      <div className="footer-links">
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms of Service</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/support">Support</Link>
      </div>
    </footer>
  );
};

export default Footer;