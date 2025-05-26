import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TableContainer
} from '@mui/material';

function ViewLoanapplicationCM() {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getLoanApplicationID();
  }, []);

  const fillSanctionDetails = (loanApplicationID) => {
    navigate(`/dashboard/fillsanctiondetails/${loanApplicationID}`);
  };

  const getLoanApplicationID = () => {
    axios
      .get('http://localhost:9090/crm/loanApplication/getAllApplications')
      .then((res) => {
        setApplications(res.data);
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Error fetching loan applications.");
      });
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom color="primary">
        Loan Applications
      </Typography>

      <Paper elevation={3}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1976d2' }}>
                <TableCell sx={{ color: 'white' }}><strong>Loan App ID</strong></TableCell>
                <TableCell sx={{ color: 'white' }}><strong>Name</strong></TableCell>
                <TableCell sx={{ color: 'white' }}><strong>Username</strong></TableCell>
                <TableCell sx={{ color: 'white' }}><strong>DOB</strong></TableCell>
                <TableCell sx={{ color: 'white' }}><strong>Gender</strong></TableCell>
                <TableCell sx={{ color: 'white' }}><strong>Contact</strong></TableCell>
                <TableCell sx={{ color: 'white' }}><strong>Email</strong></TableCell>
                <TableCell sx={{ color: 'white' }}><strong>Address</strong></TableCell>
                <TableCell sx={{ color: 'white' }}><strong>Aadhar</strong></TableCell>
                <TableCell sx={{ color: 'white' }}><strong>PAN</strong></TableCell>
                <TableCell sx={{ color: 'white' }}><strong>Sanction Details</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((app, index) => (
                <TableRow key={index}>
                  <TableCell>{app.applicationId}</TableCell>
                  <TableCell>{app.customer?.customerName}</TableCell>
                  <TableCell>{app.customer?.userName}</TableCell>
                  <TableCell>{app.customer?.dateOfBirth}</TableCell>
                  <TableCell>{app.customer?.gender}</TableCell>
                  <TableCell>{app.customer?.customerContactNumber}</TableCell>
                  <TableCell>{app.customer?.customerEmailId}</TableCell>
                  <TableCell>{app.customer?.customerPermanentAddress}</TableCell>
                  <TableCell>{app.customer?.aadharNo}</TableCell>
                  <TableCell>{app.customer?.panCardNo}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => fillSanctionDetails(app.applicationId)}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {applications.length === 0 && (
                <TableRow>
                  <TableCell colSpan={11} align="center">
                    No loan applications found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default ViewLoanapplicationCM;
