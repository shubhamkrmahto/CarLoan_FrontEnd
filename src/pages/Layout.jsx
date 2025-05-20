// pages/Layout.jsx
import React from 'react';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Navbar from './NavBar';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main
        className="container home-wrapper"
        style={{ minHeight: '80vh', paddingTop: '1rem', paddingBottom: '1rem' }}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
