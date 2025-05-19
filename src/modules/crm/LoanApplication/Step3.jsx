import React from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';

function Step3({ formData, setFormData, nextStep, prevStep }) {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      dependent: {
        ...formData.dependent,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <Box component={Paper} elevation={4} sx={{ maxWidth: 600, margin: 'auto', mt: 5, p: 4, borderRadius: 4 }}>
      <Typography variant="h5" gutterBottom>Dependent Details</Typography>

      <TextField
        fullWidth
        label="Number of Family Members"
        name="noOfFamilyMembers"
        value={formData.dependent.noOfFamilyMembers}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Number of Children"
        name="noOfChild"
        value={formData.dependent.noOfChild}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Marital Status"
        name="maritalStatus"
        value={formData.dependent.maritalStatus}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Number of Dependent Members"
        name="dependentMember"
        value={formData.dependent.dependentMember}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Family Income"
        name="familyIncome"
        value={formData.dependent.familyIncome}
        onChange={handleChange}
        margin="normal"
      />

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button variant="outlined" onClick={prevStep}>Back</Button>
        <Button variant="contained" onClick={nextStep}>Next</Button>
      </Box>
    </Box>
  );
}

export default Step3;
