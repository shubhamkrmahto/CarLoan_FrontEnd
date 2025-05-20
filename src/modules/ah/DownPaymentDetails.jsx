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
  DialogContent,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function DownPaymentDetails() {
  const { loanDisbursementID } = useParams();
  const navigate = useNavigate();

  const [openPopup, setOpenPopup] = useState(false);

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      amountPayType: 'Online',
      transferAmount: '',
      paymentStatus: 'PAID',
    },
  });

  const onSubmit = (data) => {
    setOpenPopup(true);
    axios
      .patch(`http://localhost:9090/ah/ah/payDownPayment/${loanDisbursementID}`, data)
      .then(() => {
        setTimeout(() => {
          setOpenPopup(false);
          navigate('/dashboard/allloandisbursements');
        }, 3000);
      })
      .catch((err) => {
        alert(err.response?.data?.message || 'Error submitting Down Payment Details');
        setOpenPopup(false);
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Add Down Payment Details
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="amountPayType"
          control={control}
          render={({ field }) => (
            <TextField
              select
              fullWidth
              label="Amount Pay Type"
              margin="normal"
              {...field}
            >
              <MenuItem value="Online">Online</MenuItem>
              <MenuItem value="Cheque">Cheque</MenuItem>
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="RTGS">RTGS</MenuItem>
            </TextField>
          )}
        />

        <Controller
          name="transferAmount"
          control={control}
          render={({ field }) => (
            <TextField
              type="number"
              label="Transfer Amount"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />

        <Controller
          name="paymentStatus"
          control={control}
          render={({ field }) => (
            <TextField
              select
              fullWidth
              label="Payment Status"
              margin="normal"
              {...field}
            >
              <MenuItem value="PAID">PAID</MenuItem>
              <MenuItem value="UNPAID">UNPAID</MenuItem>
              <MenuItem value="PENDING">PENDING</MenuItem>
            </TextField>
          )}
        />

        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <Button variant="contained" color="secondary" onClick={() => reset()}>
            Reset
          </Button>
        </Box>
      </form>

      {/* Dialog Popup */}
      <Dialog open={openPopup}>
        <DialogTitle>Processing Down Payment</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Please wait while we update down payment details...
          </Typography>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default DownPaymentDetails;
