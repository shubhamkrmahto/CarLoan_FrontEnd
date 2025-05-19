import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Paper,
  Divider,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';

function prettifyLabel(label) {
  return label
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
}

function Submit({ files, formData, prevStep }) {
  const { enquiryID } = useParams();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = () => {
    const loanApplication = new FormData();
    loanApplication.append("data", JSON.stringify(formData));
    Object.entries(files).forEach(([key, file]) => {
      loanApplication.append(key, file);
    });

    axios
      .post(`http://localhost:9090/crm/loanApplication/saveapplication/${enquiryID}`, loanApplication)
      .then(() => {
        setOpenSnackbar(true);
        setTimeout(() => navigate('/dashboard'), 3000);
      })
      .catch(() => {
        alert("Error submitting loan application.");
      });
  };

  // Render each field with label on top and value below (vertical stack)
  const renderFieldsVertically = (obj) =>
    Object.entries(obj).map(([label, value]) => (
      <Box key={label} mb={2}>
        <Typography variant="subtitle2" color="textSecondary">
          {prettifyLabel(label)}
        </Typography>
        <Typography variant="body1">{value}</Typography>
      </Box>
    ));

  return (
    <Box maxWidth="md" mx="auto" my={4}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom color="primary">
          Confirm Your Details
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={4}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Customer Information
            </Typography>
            {renderFieldsVertically(formData.customer)}
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Loan Details
            </Typography>
            <Box mb={2}>
              <Typography variant="subtitle2" color="textSecondary">
                Loan Amount
              </Typography>
              <Typography variant="body1">{formData.loanAmount}</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle2" color="textSecondary">
                Loan Status
              </Typography>
              <Typography variant="body1">{formData.loanStatus}</Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Dependent Info
            </Typography>
            {renderFieldsVertically(formData.dependent)}
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Permanent Address
            </Typography>
            {renderFieldsVertically(formData.address.paddr)}
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Local Address
            </Typography>
            {renderFieldsVertically(formData.address.laddr)}
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Medical Information
            </Typography>
            {renderFieldsVertically(formData.medicalInfo)}
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Previous Loan Details
            </Typography>
            {renderFieldsVertically(formData.previousLoanDetails)}
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Bank Details
            </Typography>
            {renderFieldsVertically(formData.bankDetails)}
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Loan Guarantor
            </Typography>
            {renderFieldsVertically(formData.loanGuarantor)}
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Verification
            </Typography>
            {renderFieldsVertically(formData.verification)}
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box display="flex" justifyContent="space-between">
            <Button variant="outlined" color="secondary" onClick={prevStep}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit Application
            </Button>
          </Box>
        </Stack>
      </Paper>

      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="info" variant="filled" sx={{ width: '100%' }}>
          Loan application registered.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Submit;
