import React from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';

function Step1({ formData, setFormData, nextStep }) {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      customer: {
        ...formData.customer,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <Box 
      component={Paper}
      elevation={4}
      sx={{
        maxWidth: 600,
        margin: 'auto',
        mt: 5,
        p: 4,
        borderRadius: 4,
        backgroundColor: '#fdfdfd',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Customer Details
      </Typography>

      <TextField
        fullWidth
        label="Enter Applicant's Age"
        name="age"
        value={formData.customer.age}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
      />

      <TextField
        fullWidth
        label="Enter Applicant's State"
        name="state"
        value={formData.customer.state}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
      />

      <TextField
        fullWidth
        label="Enter Applicant's Permanent Address"
        name="customerPermanentAddress"
        value={formData.customer.customerPermanentAddress}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
      />

      <TextField
        fullWidth
        label="Enter Applicant's City"
        name="customerCity"
        value={formData.customer.customerCity}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
      />

      <TextField
        fullWidth
        label="Enter Applicant's Pincode"
        name="customerPincode"
        value={formData.customer.customerPincode}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
      />

      <Box textAlign="right" mt={3}>
        <Button variant="contained" color="primary" onClick={nextStep}>
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default Step1;
