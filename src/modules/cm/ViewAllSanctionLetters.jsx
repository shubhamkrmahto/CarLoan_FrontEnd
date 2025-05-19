import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Button,
  CircularProgress
} from '@mui/material';

function ViewAllSanctionLetters() {
  const [sanction, setSanction] = useState([]);
  const [loadingSanctionId, setLoadingSanctionId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
  getSanctionLetters(); // fetch once on mount
}, []);


  useEffect(() => {
  if (shouldRefresh) {
    getSanctionLetters();
    setShouldRefresh(false);
  }
}, [shouldRefresh]);



  const getSanctionLetters = () => {
    axios
      .get('http://localhost:6053/CM/getAllSanction')
      .then((res) => {
        setSanction(res.data);
      })
      .catch((err) => {
        alert(err.response?.data?.message || 'Error fetching sanction letters');
      });
  };

  const generateSanctionLetter = (id) => {
  setLoadingSanctionId(id);

  axios
    .get(`http://localhost:6053/CM/generateSanctionLetterPDF/${id}`)
    .then((res) => {
      setShowSuccess(true);
      setShouldRefresh(true);
    })
    .catch((err) => {
      alert(err.response?.data?.message || 'Error updating rate of interest');
    })
    .finally(() => {
      setTimeout(() => {
        setLoadingSanctionId(null);
      }, 2000); // Wait 2s before clearing loading spinner
    });
};


  const openBase64PDF = (base64String) => {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length).fill().map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank');
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom color="primary">
        Sanction Letters
      </Typography>

      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1976d2' }}>
                <TableCell><strong>Sanction Letter ID</strong></TableCell>
                <TableCell><strong>Applicant Name</strong></TableCell>
                <TableCell><strong>Applicant Email</strong></TableCell>
                <TableCell><strong>Contact Details</strong></TableCell>
                <TableCell><strong>Sanction Date</strong></TableCell>
                <TableCell><strong>Loan Amtount Sanctioned</strong></TableCell>
                <TableCell><strong>Interest Type</strong></TableCell>
                <TableCell><strong>Rate Of Interest</strong></TableCell>
                <TableCell><strong>Loan Tenure In Month</strong></TableCell>
                <TableCell><strong>Monthly EMI Amount</strong></TableCell>
                <TableCell><strong>Loan Amount</strong></TableCell>
                <TableCell><strong>Mode Of Payment</strong></TableCell>
                <TableCell><strong>Sanction Status</strong></TableCell>
                <TableCell><strong>Cibil Score</strong></TableCell>
                <TableCell><strong>Sanction Letter</strong></TableCell>
                <TableCell><strong>Generate Sanction Letter</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sanction.map((s, index) => (
                <TableRow key={index}>
                  <TableCell>{s.sanctionLetterId}</TableCell>
                  <TableCell>{s.applicantName}</TableCell>
                  <TableCell>{s.applicantEmail}</TableCell>
                  <TableCell>{s.contactDetails}</TableCell>
                  <TableCell>{s.sanctionDate}</TableCell>
                  <TableCell>{s.loanAmtountSanctioned}</TableCell>
                  <TableCell>{s.interestType}</TableCell>
                  <TableCell>{s.rateOfInterest}</TableCell>
                  <TableCell>{s.loanTenureInMonth}</TableCell>
                  <TableCell>{s.monthlyEMIAmount}</TableCell>
                  <TableCell>{s.loanAmount}</TableCell>
                  <TableCell>{s.modeOfPayment}</TableCell>
                  <TableCell>{s.status}</TableCell>
                  <TableCell>{s.cibilScore}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => openBase64PDF(s.sanctionLetter)}
                      disabled={!s.sanctionLetter}
                    >
                      View
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => generateSanctionLetter(s.sanctionLetterId)}
                      disabled={loadingSanctionId === s.sanctionLetterId}
                      startIcon={
                        loadingSanctionId === s.sanctionLetterId ? <CircularProgress size={20} color="inherit" /> : null
                      }
                    >
                      {loadingSanctionId === s.sanctionLetterId ? 'Generating...' : 'Generate'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {sanction.length === 0 && (
                <TableRow>
                  <TableCell colSpan={16} align="center">
                    No sanction letters available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {showSuccess && (
        <Box position="fixed" top={10} left="50%" style={{ transform: 'translateX(-50%)', zIndex: 9999 }}>
          <Paper elevation={6} sx={{ px: 3, py: 1, backgroundColor: '#2196f3', color: '#fff' }}>
            Sanction Letter Generated
          </Paper>
        </Box>
      )}
    </Box>
  );
}

export default ViewAllSanctionLetters;
