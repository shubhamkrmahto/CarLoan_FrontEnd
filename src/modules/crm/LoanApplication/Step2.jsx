import React from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';

function Step2({ formData, setFormData, nextStep, prevStep }) {
  const handleChange0 = (e) => {
    setFormData({ ...formData, loanAmount: e.target.value });
  };

  const handleChange1 = (e) => {
    setFormData({
      ...formData,
      loanApplicationStatus: e.target.value,
    });
  };

  return (
    <Box component={Paper} elevation={4} sx={{ maxWidth: 600, margin: 'auto', mt: 5, p: 4, borderRadius: 4 }}>
      <Typography variant="h5" gutterBottom>Loan Amount</Typography>

      <TextField
        fullWidth
        label="Enter Loan Amount"
        name="loanAmount"
        value={formData.loanAmount}
        onChange={handleChange0}
        margin="normal"
        variant="outlined"
      />

      <TextField
        fullWidth
        label="Enter Loan Status"
        name="loanApplicationStatus"
        value={formData.loanApplicationStatus}
        onChange={handleChange1}
        margin="normal"
        variant="outlined"
      />

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button variant="outlined" onClick={prevStep}>Back</Button>
        <Button variant="contained" onClick={nextStep}>Next</Button>
      </Box>
    </Box>
  );
}

export default Step2;
