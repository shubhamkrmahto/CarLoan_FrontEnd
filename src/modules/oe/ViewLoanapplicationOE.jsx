import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Typography,
  Skeleton, Fade
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ViewLoanapplicationOE() {
  const [applicationID, setApplicationID] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getLoanApplicationID();
  }, []);

  function verifyDocuments(loanApplicationID) {
    navigate(`/dashboard/verifydocuments/${loanApplicationID}`);
  }

  function getLoanApplicationID() {
    setLoading(true);
    axios.get('http://localhost:6051/loanApplication/getAllApplicationID')
      .then((res) => {
        setApplicationID(res.data);
        setLoading(false);
      })
      .catch(err => {
        alert("Error: " + err.message);
        setLoading(false);
      });
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom mt={2}>
        Loan Applications
      </Typography>

      <TableContainer component={Paper} elevation={4} sx={{ maxWidth: 600, mt: 2 }}>
        <Table size="small" aria-label="loan applications table">
          <TableHead sx={{ backgroundColor: '#1976d2' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Loan Application ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton variant="text" width={180} /></TableCell>
                  <TableCell><Skeleton variant="rectangular" width={80} height={30} /></TableCell>
                </TableRow>
              ))
            ) : (
              applicationID.map((id, index) => (
                <TableRow key={index} hover>
                  <TableCell>{typeof id === 'object' ? id.applicationId || id.ApplicationId || JSON.stringify(id) : id}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => verifyDocuments(typeof id === 'object' ? id.applicationId || id.ApplicationId || id : id)}
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
    </div>
  );
}

export default ViewLoanapplicationOE;
