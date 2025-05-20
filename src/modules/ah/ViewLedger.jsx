import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, TablePagination,
  Snackbar, Alert
} from '@mui/material';

function ViewLedger() {
  const { loanDisbursementID } = useParams();
  const [ledgers, setLedgers] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetchLedger();
  }, [loanDisbursementID]);

  const fetchLedger = () => {
    axios.get(`http://localhost:9090/ah/ah/getLoanDisbursement/${loanDisbursementID}`)
      .then(response => {
        setLedgers(response.data.ledger || []);
      })
      .catch(error => {
        console.error("Error fetching ledger data:", error);
      });
  };

  const handlePayEMI = (monthlyId) => {
    axios.patch(`http://localhost:9090/ah/ah/payEMI/${loanDisbursementID}/${monthlyId}`)
      .then(() => {
        setSnackbarOpen(true); // show success popup
        return axios.get(`http://localhost:9090/ah/ah/getLoanDisbursement/${loanDisbursementID}`);
      })
      .then(response => {
        setLedgers(response.data.ledger || []);
      })
      .catch(err => {
        console.error("Payment failed:", err);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <h2>Ledger Details</h2>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" variant="filled">
          EMI for respective month successfully paid!
        </Alert>
      </Snackbar>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S No.</TableCell>
              <TableCell>Ledger Created Date</TableCell>
              <TableCell>Loan Tenure (Months)</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Payable Amount With Interest</TableCell>
              <TableCell>Amount Paid Till Date</TableCell>
              <TableCell>Remaining Amount</TableCell>
              <TableCell>Next EMI Date Start</TableCell>
              <TableCell>Monthly EMI</TableCell>
              <TableCell>Next EMI Date End</TableCell>
              <TableCell>Defaulter Count</TableCell>
              <TableCell>Previous EMI Status</TableCell>
              <TableCell>Current Month EMI Status</TableCell>
              <TableCell>Loan End Date</TableCell>
              <TableCell>Pay</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ledgers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ledger) => (
              <TableRow key={ledger.ledgerId}>
                <TableCell>{ledger.monthlyid}</TableCell>
                <TableCell>{ledger.ledgerCreatedDate}</TableCell>
                <TableCell>{ledger.tenure}</TableCell>
                <TableCell>{ledger.totalLoanAmount}</TableCell>
                <TableCell>{ledger.payableAmountWithInterest}</TableCell>
                <TableCell>{ledger.amountPaidTillDate}</TableCell>
                <TableCell>{ledger.remainingAmount}</TableCell>
                <TableCell>{ledger.nextEmiDateStart}</TableCell>
                <TableCell>{ledger.monthlyEMI}</TableCell>
                <TableCell>{ledger.nextEmiDateEnd}</TableCell>
                <TableCell>{ledger.defaulterCount}</TableCell>
                <TableCell>{ledger.previousEMIStatus}</TableCell>
                <TableCell>{ledger.currentMonthEMIStatus}</TableCell>
                <TableCell>{ledger.loanEndDate}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handlePayEMI(ledger.monthlyid)}
                  >
                    Pay
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={ledgers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
        />
      </TableContainer>
    </Paper>
  );
}

export default ViewLedger;
