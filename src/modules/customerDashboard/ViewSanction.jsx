import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TableContainer,
  Snackbar,
  Alert,
} from '@mui/material';

function ViewSanction() {
  const customerId = localStorage.getItem("customerId");
  const [sanctions, setSanctions] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    getSanctionDetails();
  }, []);

  const getSanctionDetails = () => {
    axios
      .get(`http://localhost:9090/cm/cm/getSanctionByCustomerId/${customerId}`)
      .then((res) => {
        const data = res.data;
        console.log("Sanction data:", data);
        setSanctions(Array.isArray(data) ? data : data ? [data] : []);
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Error fetching sanction letters.");
      });
  };

  const handleApproval = (id) => {
    axios.get(`http://localhost:9090/cm/cm/acceptSanction/${id}`)
      .then(() => {
        showSnackbar('Sanction Approved', 'success');
        getSanctionDetails();
      })
      .catch(() => {
        showSnackbar('Failed to approve', 'error');
      });
  };

  const handleRejection = (id) => {
    axios.get(`http://localhost:9090/cm/cm/rejectSanction/${id}`)
      .then(() => {
        showSnackbar('Sanction Rejected', 'error');
        getSanctionDetails();
      })
      .catch(() => {
        showSnackbar('Failed to reject', 'error');
      });
  };

  const openPDF = (base64String) => {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length).fill().map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank');
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
    setTimeout(() => setSnackbar({ open: false, message: '', severity: 'info' }), 3000);
  };

  const fieldMap = {
    sanctionLetterId: 'Sanction ID',
    customerId: 'Customer ID',
    sanctionDate: 'Sanction Date',
    applicantName: 'Applicant Name',
    contactDetails: 'Contact Number',
    applicantEmail: 'Email',
    loanAmount: 'Loan Amount',
    loanAmtountSanctioned: 'Amount Sanctioned',
    interestType: 'Interest Type',
    rateOfInterest: 'Rate of Interest (%)',
    loanTenureInMonth: 'Loan Tenure (Months)',
    monthlyEMIAmount: 'Monthly EMI',
    modeOfPayment: 'Payment Mode',
    remarks: 'Remarks',
    termsAndCondition: 'Terms & Conditions',
    status: 'Status',
    cibilScore: 'CIBIL Score'
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom color="primary">
        Sanction Letters
      </Typography>

      {sanctions.length > 0 ? (
        sanctions.map((s) => (
          <Paper key={s.sanctionLetterId} elevation={3} sx={{ mb: 4, p: 2 }}>
            <TableContainer>
              <Table size="small">
                <TableBody>
                  {Object.entries(fieldMap).map(([key, label]) => (
                    <TableRow key={key}>
                      <TableCell sx={{ fontWeight: 'bold' }}>{label}</TableCell>
                      <TableCell>{s[key]}</TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Sanction Letter (PDF)</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => openPDF(s.sanctionLetter)}
                      >
                        View PDF
                      </Button>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        sx={{ mr: 2 }}
                        onClick={() => handleApproval(s.sanctionLetterId)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleRejection(s.sanctionLetterId)}
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        ))
      ) : (
        <Typography>No sanction letters found.</Typography>
      )}

      <Snackbar
        open={snackbar.open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ViewSanction;
