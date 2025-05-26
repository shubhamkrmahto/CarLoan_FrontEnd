// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import Login from './pages/Login';
import LoanEnquiryHome from './pages/LoanEnquiryHome';
import RegisterEnquiry from './pages/RegisterEnquiry';
import './App.css'
import BlogDetail from './pages/Blogdetail';
import Dashboard from './modules/dashboard/Dashboard';
import CustomerDashBoard from './modules/customerDashboard/CustomerDashboard';

const App = () => {
  return (
    <div className='bg-neutral-gradient-2'>
    <Router>
      <Routes>
        {/* Layout Route with children */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          {/* <Route path="login" element={<Login />} /> */}
          <Route path="contact" element={<Contact />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="location" element={<RegisterEnquiry />} />
          <Route path="loanenquiryhome" element={<LoanEnquiryHome />} />
          <Route path="/blogs/:slug" element={<BlogDetail />} />
          <Route path="dashboard/*" element={<Dashboard />} />
          <Route path="customer/*" element={<CustomerDashBoard />} />
        </Route>

        {/* Outside Layout */}
        
      </Routes>
    </Router>
    </div>
  );
};

export default App;
