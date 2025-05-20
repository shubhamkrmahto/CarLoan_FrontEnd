// pages/Home.jsx
import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
    <section className="bg-light py-5 px-3">
  <div className="container text-center">
    <h1 className="display-5 text-primary">Drive Your Dreams with Krushna FinCorp</h1>
    <p className="lead mt-3 text-dark" style={{ fontSize: '1.25rem', fontWeight: '500' }}>
      Affordable, quick, and secure car loan solutions for individuals and businesses.
    </p>
    <Button variant="contained" color="primary" size="large" onClick={() => navigate('/loanenquiryhome')}>
      Apply for Car Loan
    </Button>
  </div>
</section>


    {/* Features Section */}
      <section className="container my-5 px-4">
  <h2 className="text-center mb-4">Why Choose Krushna FinCorp?</h2>
  <div className="row text-center">
    <div className="col-md-4 mb-4">
      <h5>✅ Instant Loan Approval</h5>
      <p>Get approval in minutes with minimal documentation and maximum convenience.</p>
    </div>
    <div className="col-md-4 mb-4">
      <h5>🔐 Safe & Secure Process</h5>
      <p>Your data and transactions are secured with end-to-end encryption.</p>
    </div>
    <div className="col-md-4 mb-4">
      <h5>📞 24/7 Support</h5>
      <p>Reach our expert team anytime for loan queries, status, and assistance.</p>
    </div>
  </div>
</section>

      </div>
  );
};

export default Home;
