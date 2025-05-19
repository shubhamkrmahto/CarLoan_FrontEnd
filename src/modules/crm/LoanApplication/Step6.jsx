import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

function Step6({ formData, setFormData, nextStep, prevStep }) {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      previousLoanDetails: {
        ...formData.previousLoanDetails,
        [e.target.name]: e.target.value
      }
    });
  };

  const fields = [
    'branchId', 'branchName', 'branchCode', 'branchType', 'branchIFSC',
    'branchMICR', 'contact', 'bankAddress', 'email', 'status'
  ];

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>Previous Loan Details</Typography>
      {fields.map((field, i) => (
        <TextField
          key={i}
          fullWidth
          margin="normal"
          label={`Enter ${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}`}
          name={field}
          value={formData.previousLoanDetails[field]}
          onChange={handleChange}
        />
      ))}
      <Box mt={3} display="flex" justifyContent="space-between">
        <Button variant="outlined" onClick={prevStep}>Back</Button>
        <Button variant="contained" onClick={nextStep}>Next</Button>
      </Box>
    </Box>
  );
}

export default Step6;
