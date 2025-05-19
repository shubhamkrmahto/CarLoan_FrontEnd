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
  const [applicationID, setApplicationID] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getLoanApplicationID();
  }, []);

  const fillSanctionDetails = (loanApplicationID) => {
    navigate(`/dashboard/fillsanctiondetails/${loanApplicationID}`);
  };

  const getLoanApplicationID = () => {
    axios
      .get('http://localhost:6051/loanApplication/getAllApplicationID')
      .then((res) => {
        setApplicationID(res.data);
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Error fetching loan application IDs.");
      });
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom color="primary">
        Loan Applications
      </Typography>

      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1976d2' }}>
                <TableCell><strong>Loan Application ID</strong></TableCell>
                <TableCell><strong>Update Sanction Details</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applicationID.map((id, index) => (
                <TableRow key={index}>
                  <TableCell>{id}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => fillSanctionDetails(id)}>
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {applicationID.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
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
