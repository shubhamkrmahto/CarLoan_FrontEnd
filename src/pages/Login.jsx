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
    const url =
      authMode === 'login'
        ? `http://localhost:9090/admin/admin/getEmployeeDetails/${data.username}/${data.password}`
        : `http://localhost:9090/admin/admin/registerEmployee`;

    const method = authMode === 'login' ? axios.get : axios.post;

    method(url, authMode === 'register' ? data : undefined)
      .then((response) => {
        if (authMode === 'login') {
          localStorage.setItem('user', JSON.stringify(response.data));
          setShowPopup(true);
          reset();
          setTimeout(() => {
            setShowPopup(false);
            onClose();
            navigate('/dashboard');
            reset(); // Clear form
          }, 2000);
        } else {
          alert('Registration successful! You can now log in.');
          setAuthMode('login');
        }
      })
      .catch((err) => {
        console.error(`${authMode} failed`, err);
        alert(`Error: ${authMode === 'login' ? 'Invalid credentials' : 'Registration failed'}`);
      })
      .finally(() => setLoading(false));
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
              {...register('username', { required: true })}
            />

            {authMode === 'register' && (
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                margin="normal"
                {...register('email', { required: true })}
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
                {...register('fullName', { required: true })}
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
