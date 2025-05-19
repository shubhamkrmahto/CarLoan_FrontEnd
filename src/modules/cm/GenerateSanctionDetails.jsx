import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Snackbar,
  Alert
} from '@mui/material';
import axios from 'axios';

function GenerateSanctionDetails() {
  const { sanctionID } = useParams();
  const navigate = useNavigate();
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [sanction, setSanction] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', redirect: false });

  useEffect(() => {
    getSanctionLetter();
  }, []);

  const getSanctionLetter = () => {
    axios
      .get(`http://localhost:6053/CM/getSanction/${sanctionID}`)
      .then((res) => {
        setSanction(res.data);
      })
      .catch((err) => {
        alert(err.response?.data?.message || 'Error fetching sanction letter');
      });
  };

const updateRateOfInterest = () => {
  axios
    .get(`http://localhost:6053/CM/updateRateInterest/${sanctionID}`)
    .then((res) => {
      setSnackbar({ open: true, message: 'Rate Of Interest generated', redirect: false });
      setShouldRefresh(true); // mark for refresh after snackbar
    })
    .catch((err) => {
      alert(err.response?.data?.message || 'Error updating rate of interest');
    });
};

const updateSanctionedLoanAmount = () => {
  axios
    .get(`http://localhost:6053/CM/updateSanctionedLoanAmount/${sanctionID}`)
    .then((res) => {
      setSnackbar({ open: true, message: 'Sanction Amount generated', redirect: false });
      setShouldRefresh(true);
    })
    .catch((err) => {
      alert(err.response?.data?.message || 'Error updating sanctioned loan amount');
    });
};

const updateMonthlyEMIAmount = () => {
  axios
    .get(`http://localhost:6053/CM/updateEMIAmount/${sanctionID}`)
    .then((res) => {
      setSnackbar({ open: true, message: 'EMI Amount generated', redirect: false });
      setShouldRefresh(true);
    })
    .catch((err) => {
      alert(err.response?.data?.message || 'Error updating EMI amount');
    });
};

// Modify handleSnackbarClose to fetch again after popup
const handleSnackbarClose = () => {
  setSnackbar({ ...snackbar, open: false });
  
  if (shouldRefresh) {
    getSanctionLetter();     // re-fetch latest data
    setShouldRefresh(false); // reset
  }

  if (snackbar.redirect) {
    navigate('/dashboard');
  }
};


  const fields = [
    { label: 'Sanction Letter ID', key: 'sanctionLetterId' },
    { label: 'Applicant Name', key: 'applicantName' },
    { label: 'Applicant Email', key: 'applicantEmail' },
    { label: 'Contact Details', key: 'contactDetails' },
    {
      label: 'Rate of Interest',
      key: 'rateOfInterest',
      showButton: true,
      onClick: updateRateOfInterest
    },
    {
      label: 'Sanction Amount',
      key: 'loanAmtountSanctioned',
      showButton: true,
      onClick: updateSanctionedLoanAmount
    },
    {
      label: 'EMI Amount',
      key: 'monthlyEMIAmount',
      showButton: true,
      onClick: updateMonthlyEMIAmount
    }
  ];

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom color="primary">
        Sanction Letter Details
      </Typography>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Detail</strong></TableCell>
                <TableCell><strong>Update</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sanction ? (
                fields.map((field, index) => (
                  <TableRow key={index}>
                    <TableCell>{field.label}</TableCell>
                    <TableCell>{sanction[field.key]}</TableCell>
                    <TableCell>
                      {field.showButton && (
                        <Button
                          variant="outlined"
                          size="small"
                          color="secondary"
                          onClick={field.onClick}
                        >
                          Update
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    Loading sanction letter...
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

export default GenerateSanctionDetails;
