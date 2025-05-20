// components/Footer.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS globally if not done yet
import './Home.css'; // Your custom CSS

const Footer = () => (
  <footer className="bg-dark text-white py-4 text-center mt-auto">
    <p className="mb-0">&copy; {new Date().getFullYear()} Krushna FinCorp. All rights reserved.</p>
  </footer>
);

export default Footer;
