import React, { useState } from 'react';
import {
  Container,
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function AddBankDetails() {
  const { loanDisbursementID } = useParams();
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const addBankDetails = async (data) => {
    try {
      await axios.patch(
        `http://localhost:9090/ah/AH/addBankAccountDetails/${loanDisbursementID}`,
        data
      );
      setOpenPopup(true);
      setTimeout(() => {
        setOpenPopup(false);
        navigate('/dashboard/allloandisbursements');
      }, 2000);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add bank details');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Add Bank Details
      </Typography>
      <form onSubmit={handleSubmit(addBankDetails)}>
        <TextField
          label="Bank Name"
          fullWidth
          margin="normal"
          {...register('bankName', { required: 'Bank Name is required' })}
          error={!!errors.bankName}
          helperText={errors.bankName?.message}
        />

        <TextField
          label="Account Number"
          fullWidth
          margin="normal"
          {...register('accountNumber', {
            required: 'Account Number is required',
            pattern: {
              value: /^[0-9]{9,18}$/,
              message: 'Invalid account number'
            }
          })}
          error={!!errors.accountNumber}
          helperText={errors.accountNumber?.message}
        />

        <TextField
          label="IFSC Code"
          fullWidth
          margin="normal"
          {...register('ifscCode', {
            required: 'IFSC Code is required',
            pattern: {
              value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
              message: 'Invalid IFSC Code'
            }
          })}
          error={!!errors.ifscCode}
          helperText={errors.ifscCode?.message}
        />

        <TextField
          select
          label="Account Type"
          fullWidth
          margin="normal"
          defaultValue=""
          {...register('accountType', { required: 'Account Type is required' })}
          error={!!errors.accountType}
          helperText={errors.accountType?.message}
        >
          <MenuItem value="Savings">Savings</MenuItem>
          <MenuItem value="Current">Current</MenuItem>
        </TextField>

        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => reset()}
          >
            Clear
          </Button>
        </Box>
      </form>

      <Dialog open={openPopup}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Typography>Bank details added successfully!</Typography>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default AddBankDetails;
