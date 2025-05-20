// components/Navbar.jsx
import React, { useState } from 'react';
import { Button, Stack, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import Login from './Login';

const Navbar = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false); // control modal

  return (
    <>
      <header className="sticky-top bg-dark text-white py-3 shadow-sm">
        <div className="container-fluid px-3 px-md-4">
          <div className="row align-items-center mx-0">
            <div className="col-6 col-md-4 text-start d-flex align-items-center">
              <Box display="flex" alignItems="center">
                <img
                  src={logo}
                  alt="Car Icon"
                  style={{ width: 36, height: 36, marginRight: 12 }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 'bold',
                    fontFamily: 'Roboto, sans-serif',
                    background: 'linear-gradient(to right, #00c6ff, #0072ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    userSelect: 'none',
                  }}
                >
                  Krushna FinCorp
                </Typography>
              </Box>
            </div>
            <div className="col-6 col-md-8 text-end">
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Button variant="contained" className="mui-gradient-button pulse-button" onClick={() => navigate('/')} size="small">Home</Button>
                <Button variant="contained" className="mui-gradient-button pulse-button" onClick={() => navigate('/about')} size="small">About</Button>
                <Button variant="contained" className="mui-gradient-button pulse-button" onClick={() => navigate('/contact')} size="small">Contact</Button>
                <Button variant="contained" className="mui-gradient-button pulse-button" onClick={() => navigate('/blogs')} size="small">Blogs</Button>
                <Button
                  variant="contained"
                  className="mui-gradient-button pulse-button"
                  onClick={() => setShowLogin(true)}
                  size="small"
                >
                  Login
                </Button>
              </Stack>
            </div>
          </div>
        </div>
      </header>

      {/* Render Modal */}
      <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
};

export default Navbar;
