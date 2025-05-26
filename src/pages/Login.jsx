import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Fade,
  Backdrop,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './Login.css';

function LoginModal({ isOpen, onClose }) {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
  if (!isOpen) {
    reset(); // reset when modal is closed
  }
}, [isOpen, reset]);

  const handleAuthModeChange = (_, newMode) => {
    if (newMode) {
      setAuthMode(newMode);
    }
  };

  const onSubmit = (data) => {
  setLoading(true);

  if (authMode === 'login') {
    const url = `http://localhost:9090/admin/admin/getEmployeeDetails/${data.userName}/${data.password}`;
    axios.get(url)
      .then((response) => {
        const userData = response.data;
        localStorage.setItem('user', JSON.stringify(userData));
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          onClose();
          const role = userData.employeeType?.toUpperCase(); // Defensive check
          if (['ADMIN', 'AH', 'OE', 'CRM', 'CM'].includes(role)) {
            navigate('/dashboard');
          } else if (role === 'CUSTOMER') {
            navigate(`/customer`);
          } else {
            alert('Unrecognized role. Please contact support.');
          }
        }, 2000);
      })
      .catch((err) => {
        console.error('Login failed', err);
        alert('Error: Invalid credentials');
      })
      .finally(() => setLoading(false));
  } else {
    // Registration flow for customer
    const register = {
      userName: data.userName,
      password: data.password,
      customerName: data.customerName,
      customerEmailId: data.customerEmailId,
      le:{
        cibil:{}
      }
    };

    const registerData = new FormData();
    registerData.append("cJson", JSON.stringify(register));
    registerData.append("profileImage", new Blob([], { type: 'application/octet-stream' }), "empty.jpg");

    axios.post('http://localhost:9090/customer/customer/savecustomer', registerData)
      .then(() => {
        alert('Registration successful! You can now log in.');
        setAuthMode('login');
        reset();
      })
      .catch((err) => {
        console.error('Registration failed', err);
        alert('Error: Registration failed');
      })
      .finally(() => setLoading(false));
  }
};


  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={isOpen}>
        <Box className="mui-modal-box">
          <button className="close-btn" onClick={onClose}>×</button>
          <Typography variant="h4" align="center" color="primary" gutterBottom>
            {authMode === 'login' ? 'Login' : 'Register'}
          </Typography>

          <ToggleButtonGroup
            color="primary"
            value={authMode}
            exclusive
            onChange={handleAuthModeChange}
            fullWidth
            sx={{ mb: 2 }}
          >
            <ToggleButton value="login">Login</ToggleButton>
            <ToggleButton value="register">Register</ToggleButton>
          </ToggleButtonGroup>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              {...register('userName', { required: true })}
            />

            {authMode === 'register' && (
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                margin="normal"
                {...register('customerEmailId', { required: true })}
              />
            )}

            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: true })}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            {authMode === 'register' && (
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                margin="normal"
                {...register('customerName', { required: true })}
              />
            )}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? (authMode === 'login' ? 'Logging in...' : 'Registering...') : authMode === 'login' ? 'Login' : 'Register'}
            </Button>
          </form>

          {showPopup && (
            <Box className="popup-box" sx={{ mt: 3 }}>
              <Typography color="success.main">Logged in successfully!</Typography>
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  );
}

export default LoginModal;
