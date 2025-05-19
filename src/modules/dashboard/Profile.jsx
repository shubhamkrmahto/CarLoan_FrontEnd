import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert, Button } from '@mui/material';
import './Profile.css';

function Profile() {
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : {};
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setSnackbarOpen(true);
    setTimeout(() => {
      navigate('/');
    }, 1500); // navigate after 1.5 seconds to show snackbar
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  return (
    <>
      <header className="profile-header">
        <img
          className="profile-image"
          src={user.profilePhoto ? `data:image/jpeg;base64,${user.profilePhoto}` : '/default-profile.png'}
          alt="Profile"
        />
        <div className="profile-details">
          <span><strong>Welcome,</strong> {user.employeeName}</span>
          <span><strong>Role: </strong>{user.employeeType}</span>
        </div>
        <Button 
          variant="contained" 
          color="error" 
          onClick={handleLogout}
          sx={{ height: '36px' }}
        >
          Logout
        </Button>
      </header>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Logged Out Successfully
        </Alert>
      </Snackbar>
    </>
  );
}

export default Profile;
