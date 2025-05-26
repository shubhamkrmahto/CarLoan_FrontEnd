import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
  Fab,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

function CustomerProfile() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const userJson = localStorage.getItem("user");
  const { employeeEmail, password } = JSON.parse(userJson);

  const [customer, setCustomer] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:9090/customer/customer/getcustomer/${employeeEmail}/${password}`)
      .then(res => setCustomer(res.data))
      .catch(err => alert(`Customer Doesn't Exist: ` + err.message));
  }, []);

  const handleImageClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleUpdateClick = (id) => {
    navigate(`/customer/updatedetails/${id}`);
  };

  const handleLogout = () => {
  localStorage.removeItem("user");
  navigate('/');
};


  return (
    <Box
  sx={{
    px: { xs: 2, sm: 4 },
    py: 4,
    maxWidth: 1000,
    mx: 'auto',
    mt: 4,
    overflowX: 'hidden',
    overflowY: 'auto', // allows vertical scroll if needed
    minHeight: '100vh', // ensures full-page layout
  }}
>
      <Paper
  elevation={6}
  sx={{
    p: { xs: 2, md: 4 },
    borderRadius: 4,
    boxShadow: theme.shadows[8],
    overflow: 'hidden', // Prevent scrollbar if not needed
  }}
>

        
        {/* Profile Image and Title */}
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          <Box display="flex" justifyContent="flex-end" mb={2}>
  <Button
    variant="outlined"
    color="error"
    onClick={handleLogout}
    sx={{ fontWeight: 'bold' }}
  >
    Logout
  </Button>
</Box>

          <Avatar
            src={customer?.profilePicture ? `data:image/jpeg;base64,${customer.profilePicture}` : ''}
            alt={customer?.customerName || "Customer"}
            sx={{
              width: 130,
              height: 130,
              mb: 2,
              border: '3px solid #1976d2',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
              }
            }}
            onClick={handleImageClick}
          />
          <Typography variant="h5" fontWeight="bold" color="primary">
            Customer Profile
          </Typography>
        </Box>

        {/* Customer Details Grid */}
        {customer ? (
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <Field label="Name" value={customer.customerName} />
                <Field label="Date of Birth" value={customer.dateOfBirth} />
                <Field label="Age" value={customer.age} />
                <Field label="Gender" value={customer.gender} />
                <Field label="State" value={customer.state} />
                <Field label="Contact Number" value={customer.customerContactNumber} />
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <Field label="Alternate Contact" value={customer.customerAlternateNumber} />
                <Field label="Email ID" value={`${customer.customerEmailId} (${customer.emailStatus})`} />
                <Field label="Permanent Address" value={customer.customerPermanentAddress} />
                <Field label="City" value={customer.customerCity} />
                <Field label="Pincode" value={customer.customerPincode} />
              </Stack>

              {/* Button inside table layout */}
              <Box mt={4} display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdateClick(customer.customerId)}
                  sx={{ px: 4, py: 1.5, borderRadius: 2, fontWeight: 'bold', marginLeft:23 }}
                >
                  Update Profile
                </Button>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Typography textAlign="center" mt={4}>Loading customer details...</Typography>
        )}
      </Paper>

      {/* Dialog for Full Image */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <img
            src={`data:image/jpeg;base64,${customer?.profilePicture}`}
            alt="Full Profile"
            style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: 10 }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

// Reusable Field Component
const Field = ({ label, value }) => (
  <Box>
    <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">{label}</Typography>
    <Typography variant="body1">{value}</Typography>
    <Divider sx={{ mt: 1 }} />
  </Box>
);

export default CustomerProfile;
