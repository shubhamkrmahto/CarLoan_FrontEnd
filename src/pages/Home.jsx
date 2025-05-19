import React from 'react'
import './Home.css';
import { Link, useNavigate } from 'react-router-dom'
import { Button, Stack, Typography, Box } from '@mui/material';
import logo from '../assets/logo.png';
import '../App.css';

function Home() {

  const navigate = useNavigate();


  return (
    <div >
      {/* Sticky Top Navigation Bar */}
      <header className="sticky-top bg-dark text-white py-3 shadow-sm">
        <div className="container-fluid px-0" >
          <div className="row align-items-center mx-0">
            <div className="col-6 col-md-4 text-start">
              <Box display="flex" alignItems="center">
              <img
                src={logo}
                alt="Car Icon"
                style={{ width: 36, height: 36, marginRight: 12 }}
              />
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: 'bold',
                  fontFamily: 'Roboto, sans-serif',
                  background: 'linear-gradient(to right, #00c6ff, #0072ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Krushna FinCorp
              </Typography>
            </Box>

            </div>
            <div className="col-6 col-md-8 text-end">
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Button variant="contained" className="mui-gradient-button" onClick={() => navigate('/login')}>Login</Button>
                <Button variant="contained" className="mui-gradient-button" onClick={() => navigate('/about')}>About</Button>
                <Button variant="contained" className="mui-gradient-button" onClick={() => navigate('/contact')}>Contact</Button>
                <Button variant="contained" className="mui-gradient-button" onClick={() => navigate('/blogs')}>Blogs</Button>
                <Button variant="contained" className="mui-gradient-button" onClick={() => navigate('/location')}>Location</Button>
              </Stack>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center bg-light py-5 px-3 hero-section">
        <h1 className="display-5 text-primary">Drive Your Dreams with Krushna FinCorp</h1>
        <p className="lead mt-3 text-dark" style={{ fontSize: '1.25rem', fontWeight: '500' }}>
          Affordable, quick, and secure car loan solutions for individuals and businesses.
        </p>
        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          onClick={() => navigate('/loanenquiryhome')}
        >
          Apply for Car Loan
        </Button>
      </section>

      {/* Features Section */}
      <section className="container-fluid my-5 px-4">
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

      {/* Footer */}
      <footer className="bg-dark text-white py-4 text-center">
        <p className="mb-0">&copy; {new Date().getFullYear()} Krushna FinCorp. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Home