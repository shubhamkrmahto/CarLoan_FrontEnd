import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer,
  TableRow, Paper, Typography, Box
} from '@mui/material';

function ViewEnquiry() {
  const userJson = localStorage.getItem("user");
  const { employeeEmail, password } = JSON.parse(userJson);
  const [enquiry, setEnquiry] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:9090/customer/customer/getcustomer/${employeeEmail}/${password}`)
      .then((res) => {
        setEnquiry(res.data);
        localStorage.setItem('customerId', res.data.customerId);
      })
      .catch(err => alert("Error: " + err.message));
  }, []);

  if (!enquiry || !enquiry.le) {
    return <Typography>Loading...</Typography>;
  }

  const { le } = enquiry;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start', // Change to 'center' if you want vertical centering too
        minHeight: '100vh',
        p: 2,
      }}
    >
      <Box>
        <Typography variant="h5" gutterBottom align="center">
          Enquiry Details
        </Typography>

        <TableContainer component={Paper} elevation={4} sx={{ minWidth: 600 }}>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell><b>Customer Name</b></TableCell>
                <TableCell>{le.customerName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>DOB</b></TableCell>
                <TableCell>{le.dateOfBirth || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Gender</b></TableCell>
                <TableCell>{le.gender}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Email</b></TableCell>
                <TableCell>{le.customerEmailId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Contact</b></TableCell>
                <TableCell>{le.customerContactNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Alternate</b></TableCell>
                <TableCell>{le.customerAlternateNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Aadhar</b></TableCell>
                <TableCell>{le.aadharNo || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>PAN</b></TableCell>
                <TableCell>{le.panCardNo || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Status</b></TableCell>
                <TableCell>{le.enquiryStatus}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>CIBIL Score</b></TableCell>
                <TableCell>{le.cibil?.cibilScore}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>CIBIL Status</b></TableCell>
                <TableCell>{le.cibil?.cibilStatus}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
    
  );
}

export default ViewEnquiry;
