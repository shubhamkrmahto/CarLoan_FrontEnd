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
  CircularProgress,
  Fade
} from '@mui/material';

function LoanDisbursement() {
  const [sanction, setSanction] = useState([]);
  const [loadingSanctionId, setLoadingSanctionId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state

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
    setLoading(true);
    axios
      .get('http://localhost:9090/cm/cm/getAllSanction')
      .then((res) => {
        setSanction(res.data);
      })
      .catch((err) => {
        alert(err.response?.data?.message || 'Error fetching sanction letters');
      })
      .finally(() => setLoading(false));
  };

  const createLoanDisbursement = (id) => {
    setLoadingSanctionId(id);

    axios
      .post(`http://localhost:9090/ah/ah/loandisbursement/${id}`)
      .then((res) => {
        setShowSuccess(true);
        setShouldRefresh(true);
      })
      .catch((err) => {
        alert(err.response?.data?.message || 'Error Creating Loan Disbursement.');
      })
      .finally(() => {
        setTimeout(() => {
          setLoadingSanctionId(null);
        }, 2000); // Wait 2s before clearing loading spinner
      });
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
                <TableCell><strong>Sanction Status</strong></TableCell>
                <TableCell><strong>Generate Ledger</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={16} align="center">
                    <Fade in={loading}>
                      <Box display="flex" alignItems="center" justifyContent="center" py={3}>
                        <CircularProgress size={24} color="primary" />
                        <Typography ml={2} fontSize="1rem" fontWeight="500">
                          Loading sanction letters...
                        </Typography>
                      </Box>
                    </Fade>
                  </TableCell>
                </TableRow>
              ) : sanction.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={16} align="center">
                    No sanction letters available.
                  </TableCell>
                </TableRow>
              ) : (
                sanction.map((s, index) => (
                  <TableRow key={index}>
                    <TableCell>{s.sanctionLetterId}</TableCell>
                    <TableCell>{s.applicantName}</TableCell>
                    <TableCell>{s.applicantEmail}</TableCell>
                    <TableCell>{s.contactDetails}</TableCell>
                    <TableCell>{s.sanctionDate}</TableCell>
                    <TableCell>{s.status}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => createLoanDisbursement(s.sanctionLetterId)}
                        disabled={loadingSanctionId === s.sanctionLetterId}
                        startIcon={
                          loadingSanctionId === s.sanctionLetterId ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : null
                        }
                      >
                        {loadingSanctionId === s.sanctionLetterId ? 'Generating...' : 'Generate'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {showSuccess && (
        <Box position="fixed" top={10} left="50%" style={{ transform: 'translateX(-50%)', zIndex: 9999 }}>
          <Paper elevation={6} sx={{ px: 3, py: 1, backgroundColor: '#2196f3', color: '#fff' }}>
            Loan Disbursement Created.
          </Paper>
        </Box>
      )}
    </Box>
  );
}

export default LoanDisbursement;
