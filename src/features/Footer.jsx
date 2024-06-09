import React from "react";
import "./css/Footer.css"; // ייבוא קובץ ה-CSS עבור עיצוב

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>ניווט</h4>
          <ul className="footer-links">
            <li><a href="/about">אודות</a></li>
            <li><a href="/contact">צור קשר</a></li>
            <li><a href="/privacy">מדיניות פרטיות</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>עקבו אחרינו</h4>
          <div className="footer-socials">
            <a href="https://facebook.com" className="footer-social"><i className="fab fa-facebook-f"></i></a>
            <a href="https://twitter.com" className="footer-social"><i className="fab fa-twitter"></i></a>
            <a href="https://linkedin.com" className="footer-social"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        <div className="footer-section">
          <h4>יצירת קשר</h4>
          <p>טלפון: 03-1234567</p>
          <p>אימייל: info@mahatcode.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 MahatCode. כל הזכויות שמורות.
      </div>
    </footer>
  );
};

export default Footer;
