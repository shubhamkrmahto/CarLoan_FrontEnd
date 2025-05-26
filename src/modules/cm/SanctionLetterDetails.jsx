import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  Stack,
} from '@mui/material';

function SanctionLetterDetails() {
  const navigate = useNavigate();
  const { loanApplicationID } = useParams();
  const { register, handleSubmit } = useForm();

  const submitSanctionDetails = (data) => {
    console.log(data);

    const sanctionLetter = {
      customerId:'',
      sanctionDate: '',
      applicantName: '',
      contactDetails: '',
      applicantEmail: '',
      loanAmtountSanctioned: '',
      rateOfInterest: '',
      monthlyEMIAmount: '',
      loanAmount: '',
      cibilScore: '',
      interestType: data.interestType,
      loanTenureInMonth: data.loanTenureInMonth,
      modeOfPayment: data.modeOfPayment,
      remarks: data.remarks,
      termsAndCondition: data.termsAndCondition,
      status:'NOT_GENERATED',
      sanctionletter: '',
    };

    axios
      .post(
        `http://localhost:9090/cm/cm/saveSanction/${loanApplicationID}`,
        sanctionLetter
      )
      .then((res) => {
        alert('Sanction Details Saved...');
        navigate('/dashboard/viewloanapplicationid');
      })
      .catch((err) => {
        alert(err.response?.data?.message || 'Error saving sanction details');
      });
  };

  return (
    <Box p={4} maxWidth="600px" mx="auto">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom color="primary">
          Enter Sanction Details
        </Typography>

        <form onSubmit={handleSubmit(submitSanctionDetails)}>
          <Stack spacing={3}>
            <TextField
              label="Interest Type"
              fullWidth
              {...register('interestType')}
            />
            <TextField
              label="Loan Tenure (In Years)"
              type="number"
              fullWidth
              {...register('loanTenureInMonth')}
            />
            <TextField
              label="Mode of Payment"
              fullWidth
              {...register('modeOfPayment')}
            />
            <TextField
              label="Terms and Conditions"
              fullWidth
              multiline
              {...register('termsAndCondition')}
            />
            <TextField
              label="Remarks"
              fullWidth
              multiline
              {...register('remarks')}
            />

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}

export default SanctionLetterDetails;
