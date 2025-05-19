import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper, FormControlLabel, Checkbox } from '@mui/material';

function Step4({ formData, setFormData, nextStep, prevStep }) {
  const [sameAsPermanent, setSameAsPermanent] = useState(false);

  const handleChangePaddr = (e) => {
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        paddr: {
          ...formData.address.paddr,
          [e.target.name]: e.target.value,
        },
        laddr: sameAsPermanent
          ? { ...formData.address.paddr, [e.target.name]: e.target.value }
          : formData.address.laddr,
      },
    });
  };

  const handleChangeLaddr = (e) => {
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        laddr: {
          ...formData.address.laddr,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setSameAsPermanent(checked);
    if (checked) {
      setFormData((prev) => ({
        ...formData,
        address: {
          ...prev.address,
          laddr: { ...prev.address.paddr },
        },
      }));
    }
  };

  const renderAddressFields = (prefix, data, onChange, disabled = false) => (
    <>
      {['areaName', 'cityName', 'district', 'state', 'pincode', 'houseNumber', 'streetName'].map((field) => (
        <TextField
          key={field}
          fullWidth
          label={`Enter ${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}`}
          name={field}
          value={data[field] || ''}
          onChange={onChange}
          margin="normal"
          disabled={disabled}
        />
      ))}
    </>
  );

  return (
    <Box component={Paper} elevation={4} sx={{ maxWidth: 600, margin: 'auto', mt: 5, p: 4, borderRadius: 4 }}>
      <Typography variant="h5" gutterBottom>Address Details</Typography>

      <Typography variant="subtitle1">Permanent Address</Typography>
      {renderAddressFields('paddr', formData.address.paddr, handleChangePaddr)}

      <FormControlLabel
        control={
          <Checkbox checked={sameAsPermanent} onChange={handleCheckboxChange} />
        }
        label="Local address same as permanent"
      />

      <Typography variant="subtitle1">Local Address</Typography>
      {renderAddressFields('laddr', formData.address.laddr, handleChangeLaddr, sameAsPermanent)}

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button variant="outlined" onClick={prevStep}>Back</Button>
        <Button variant="contained" onClick={nextStep}>Next</Button>
      </Box>
    </Box>
  );
}

export default Step4;
