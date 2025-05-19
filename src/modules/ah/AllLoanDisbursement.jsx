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
  Button
} from '@mui/material';

function AllLoanDisbursement() {
  const [loandisbursement, setLoandisbursement] = useState([]);
  const [loanDisbursementId, setLoanDisbursementId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllLoanDisbursement();
  }, []);

  useEffect(() => {
    if (shouldRefresh) {
      getAllLoanDisbursement();
      setShouldRefresh(false);
    }
  }, [shouldRefresh]);

  const getAllLoanDisbursement = () => {
    axios
      .get('http://localhost:6054/AH/getAllLoanDisbursement')
      .then((res) => {
        setLoandisbursement(res.data);
      })
      .catch((err) => {
        alert(err.response?.data?.message || 'Error fetching loan disbursements');
      });
  };

  const createLoanDisbursement = (id) => {
    setLoanDisbursementId(id);
    axios
      .post(`http://localhost:6054/AH/loandisbursement/${id}`)
      .then(() => {
        setShowSuccess(true);
        setShouldRefresh(true);
      })
      .catch((err) => {
        alert(err.response?.data?.message || 'Error Creating Loan Disbursement.');
      })
      .finally(() => {
        setTimeout(() => {
          setLoanDisbursementId(null);
        }, 2000);
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
        Loan Disbursements
      </Typography>

      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1976d2' }}>
                <TableCell sx={{ color: 'white' }}><strong>Loan Disbursement ID</strong></TableCell>
                <TableCell sx={{ color: 'white' }}><strong>Add Bank Details</strong></TableCell>
                <TableCell sx={{ color: 'white' }}><strong>Add Down Payment Details</strong></TableCell>
                <TableCell sx={{ color: 'white' }}><strong>View Loan Disbursement</strong></TableCell>
                <TableCell sx={{ color: 'white' }}><strong>View Ledger</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loandisbursement.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No Loan Disbursement Records Found
                  </TableCell>
                </TableRow>
              ) : (
                loandisbursement.map((l, index) => (
                  <TableRow key={index}>
                    <TableCell>{l.loanDisbursementId}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ borderRadius: 2 }}
                        onClick={() => navigate(`/dashboard/addbankdetails/${l.loanDisbursementId}`)}
                      >
                        Add Bank
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        sx={{ borderRadius: 2 }}
                        onClick={() => navigate(`/dashboard/adddownpaymentdetails/${l.loanDisbursementId}`)}
                      >
                        Add Down Payment
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="info"
                        size="small"
                        sx={{ borderRadius: 2 }}
                        onClick={() => navigate(`/dashboard/viewsingleloandisbursement/${l.loanDisbursementId}`)}
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        sx={{ borderRadius: 2 }}
                        onClick={() => navigate(`/dashboard/viewledger/${l.loanDisbursementId}`)}
                      >
                        View
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
        <Box
          position="fixed"
          top={10}
          left="50%"
          style={{ transform: 'translateX(-50%)', zIndex: 9999 }}
        >
          <Paper
            elevation={6}
            sx={{ px: 3, py: 1, backgroundColor: '#2196f3', color: '#fff' }}
          >
            Loan Disbursement Created.
          </Paper>
        </Box>
      )}
    </Box>
  );
}

export default AllLoanDisbursement;
