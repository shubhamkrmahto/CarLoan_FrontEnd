import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NestedTable from '../../NestedTable';
import {
  Container,
  Typography,
  Button,
  Box,
  Stack,
  Paper,
  Snackbar,
  Alert
} from '@mui/material';

function VerifyDocuments() {
  const { loanApplicationID } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
    redirectAfterClose: false
  });

  useEffect(() => {
    getLoanApplication();
  }, []);

  const showSnackbar = (message, severity = 'success', redirect = false) => {
    setSnackbar({ open: true, message, severity, redirectAfterClose: redirect });
  };

  function getLoanApplication() {
    axios
      .get(`http://localhost:6051/loanApplication/getLoanApplicationDetailById/${loanApplicationID}`)
      .then((res) => {
        setApplication(res.data);
        setLoading(false);
      })
      .catch((err) => {
        showSnackbar(err?.response?.data?.message || "Error fetching data", 'error');
        setLoading(false);
      });
  }

  function approveApplication() {
  axios
    .get(`http://localhost:6052/OE/updateLoanApplicationDocumentsToVerified/${loanApplicationID}`)
    .then((res) => {
      if (typeof res.data !== 'string') {
        setApplication(res.data);
      }
      showSnackbar("Loan Application Approved.", 'success', true);
    })
    .catch((err) => {
      showSnackbar(err?.response?.data?.message || "Error approving application", 'error');
    });
}

function disapproveApplication() {
  axios
    .get(`http://localhost:6052/OE/updateLoanApplicationDocumentsToRejected/${loanApplicationID}`)
    .then((res) => {
      if (typeof res.data !== 'string') {
        setApplication(res.data);
      }
      showSnackbar("Loan Application Rejected.", 'warning', true);
    })
    .catch((err) => {
      showSnackbar(err?.response?.data?.message || "Error disapproving application", 'error');
    });
}


  const handleSnackbarClose = () => {
    if (snackbar.redirectAfterClose) {
      navigate("/dashboard/viewloanapplicationid");
    }
    setSnackbar({ ...snackbar, open: false, redirectAfterClose: false });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Verify Documents
        </Typography>

        {!loading && (
          <>
            <NestedTable data={application} />
            <Stack direction="row" spacing={2} mt={3} justifyContent="center">
              <Button variant="contained" color="success" onClick={approveApplication}>
                APPROVE
              </Button>
              <Button variant="contained" color="error" onClick={disapproveApplication}>
                DISAPPROVE
              </Button>
            </Stack>
          </>
        )}
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default VerifyDocuments;
