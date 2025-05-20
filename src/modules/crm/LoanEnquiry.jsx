import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {
  Container, TextField, MenuItem, Button, Box, Typography, Dialog, DialogTitle, DialogContent
} from '@mui/material';
import './LoanEnquiry.css';

function LoanEnquiry() {
  const { register, handleSubmit, reset } = useForm();
  const [openPopup, setOpenPopup] = useState(false);

  const addData = (data) => {
    const customer = {
      customerName: data.customerName,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      customerEmailId: data.customerEmailId,
      customerContactNumber: data.customerContactNumber,
      customerAlternateNumber: data.customerAlternateNumber,
      aadharNo: data.aadharNo,
      panCardNo: data.panCardNo,
      cibil: {}
    };

    setOpenPopup(true);

    setTimeout(() => {
      axios.post('http://localhost:9090/crm/enquiry/saveEnquiry', customer)
        .then(() => {
          setOpenPopup(false);
          alert('Enquiry has been Registered...');
          reset();
        })
        .catch(() => {
          setOpenPopup(false);
          alert('Enquiry not registered properly.');
        });
    }, 3000);
  };

  return (
    <Container maxWidth="md" className="enquiry-container">
      <Typography variant="h4" align="center" gutterBottom>
        Loan Enquiry Form
      </Typography>
      <form onSubmit={handleSubmit(addData)} className="loan-form">
        <TextField label="Customer Name" fullWidth margin="normal" placeholder="Enter full name" {...register('customerName')} />
        <TextField type="date" fullWidth margin="normal" label="Date of Birth" InputLabelProps={{ shrink: true }} {...register('dateOfBirth')} />
        <TextField
          select
          fullWidth
          margin="normal"
          label="Gender"
          defaultValue=""
          {...register('gender')}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Others">Others</MenuItem>
        </TextField>
        <TextField label="Email ID" type="email" fullWidth margin="normal" placeholder="example@email.com" {...register('customerEmailId')} />
        <TextField label="Contact Number" type="number" fullWidth margin="normal" placeholder="10-digit number" {...register('customerContactNumber')} />
        <TextField label="Alternate Number" type="number" fullWidth margin="normal" placeholder="Optional" {...register('customerAlternateNumber')} />
        <TextField label="Aadhar Number" type="number" fullWidth margin="normal" placeholder="12-digit Aadhar" {...register('aadharNo')} />
        <TextField label="PAN Card Number" fullWidth margin="normal" placeholder="ABCDE1234F" {...register('panCardNo')} />

        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button variant="contained" color="primary" type="submit">
            Register Your Enquiry
          </Button>
          <Button variant="contained" color="warning" onClick={() => reset()}>
            Clear Form
          </Button>
        </Box>
      </form>

      {/* Popup Dialog */}
      <Dialog open={openPopup}>
        <DialogTitle>Processing Your Enquiry</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Please wait while we register your enquiry...</Typography>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default LoanEnquiry;
