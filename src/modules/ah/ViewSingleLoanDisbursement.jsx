import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography
} from '@mui/material';
import { useParams } from 'react-router-dom';

function ViewSingleLoanDisbursement() {
  const { loanDisbursementID } = useParams();
  const [loanDisbursement, setLoanDisbursement] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:9090/ah/ah/getLoanDisbursement/${loanDisbursementID}`)
      .then(res => setLoanDisbursement(res.data))
      .catch(err => alert('Error fetching loan details: ' + err.message));
  }, [loanDisbursementID]);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Loan Disbursement Details
      </Typography>

      {loanDisbursement ? (
        <TableContainer component={Paper} elevation={4}>
          <Table size="small" sx={{ minWidth: 800 }}>
            <TableHead sx={{ backgroundColor: '#1976d2' }}>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>Loan Disbursement</TableCell>
                <TableCell sx={{ color: 'white' }}>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow><TableCell>Loan Disbursement ID</TableCell><TableCell>{loanDisbursement.loanDisbursementId}</TableCell></TableRow>
              <TableRow><TableCell>Agreement Date</TableCell><TableCell>{loanDisbursement.agreementDate}</TableCell></TableRow>
              <TableRow><TableCell>Amount Pay Type</TableCell><TableCell>{loanDisbursement.amountPayType}</TableCell></TableRow>
              <TableRow><TableCell>Total Amount</TableCell><TableCell>{loanDisbursement.totalAmount}</TableCell></TableRow>
              <TableRow><TableCell>Bank Name</TableCell><TableCell>{loanDisbursement.bankName}</TableCell></TableRow>
              <TableRow><TableCell>Account Number</TableCell><TableCell>{loanDisbursement.accountNumber}</TableCell></TableRow>
              <TableRow><TableCell>IFSC Code</TableCell><TableCell>{loanDisbursement.ifscCode}</TableCell></TableRow>
              <TableRow><TableCell>Account Type</TableCell><TableCell>{loanDisbursement.accountType}</TableCell></TableRow>
              <TableRow><TableCell>Transfer Amount</TableCell><TableCell>{loanDisbursement.transferAmount}</TableCell></TableRow>
              <TableRow><TableCell>Payment Status</TableCell><TableCell>{loanDisbursement.paymentStatus}</TableCell></TableRow>
              <TableRow><TableCell>Amount Paid Date</TableCell><TableCell>{loanDisbursement.amountPaidDate}</TableCell></TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>Loading loan disbursement details...</Typography>
      )}
    </div>
  );
}

export default ViewSingleLoanDisbursement;
