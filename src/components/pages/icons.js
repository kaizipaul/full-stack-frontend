import React from 'react';
import './pages.css';
import {
  FaTwitter, FaFacebookF, FaGooglePlusG, FaLinkedinIn, FaPinterestP,
} from 'react-icons/fa';

function Icons() {
  return (
    <div>
      <footer className="footer">
        <ul className="footer-list">
          <li><FaTwitter /></li>

          <li><FaFacebookF /></li>

          <li><FaGooglePlusG /></li>

          <li><FaLinkedinIn /></li>

          <li><FaPinterestP /></li>
        </ul>
        <h6>&copy; 2023 MAGGNO & C.SPA.PIVA</h6>
      </footer>
    </div>
  );
}

export default Icons;
