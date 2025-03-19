import React from 'react';
import '../compCSS/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
      <Link to="/">
      <span className="logo-part FP">FP</span>
      <span className="logo-part way">way</span>
      </Link>
      </div>
      <div className="footer-text">
        <p>Connecting freelancers with diverse project-based opportunities, our platform streamlines job searching, offers comprehensive profile management, and ensures secure transactions through escrow accounts. Powered by AI-driven insights and recommendations, we empower both freelancers and employers to find and manage work efficiently, enhancing job satisfaction and income potential.</p>
      </div>
      <div className="footer-copyright">
        <p>&copy; 2024 FPway. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
