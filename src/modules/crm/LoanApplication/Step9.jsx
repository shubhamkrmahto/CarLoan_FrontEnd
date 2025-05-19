import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

function Step9({ formData, setFormData, nextStep, prevStep }) {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      verification: {
        ...formData.verification,
        [e.target.name]: e.target.value
      }
    });
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Verification
      </Typography>

      <TextField
        fullWidth
        margin="normal"
        label="Verification Date"
        name="verificationDate"
        value={formData.verification.verificationDate}
        onChange={handleChange}
        type="date"
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Verification Status"
        name="status"
        value={formData.verification.status}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Remarks"
        name="remarks"
        value={formData.verification.remarks}
        onChange={handleChange}
        multiline
        rows={3}
      />

      <Box mt={3} display="flex" justifyContent="space-between">
        <Button variant="outlined" onClick={prevStep}>
          Back
        </Button>
        <Button variant="contained" onClick={nextStep}>
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default Step9;
