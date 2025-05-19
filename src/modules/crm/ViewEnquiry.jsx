import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Typography
} from '@mui/material';
import { Link } from 'react-router-dom';

function ViewEnquiry() {
  const [enquiry, setEnquiry] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:6051/enquiry/getApprovedEnquiry')
      .then(res => setEnquiry(res.data))
      .catch(err => alert("Error: " + err.message));
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
      Approved Enquiries
      </Typography>

      <div style={{ overflowX: 'auto' }}>
        <TableContainer component={Paper} elevation={4}>
          <Table size="small" sx={{ minWidth: 1000 }}>
            <TableHead sx={{ backgroundColor: '#1976d2' }}>
              <TableRow>
                {/* headers */}
                <TableCell sx={{ color: 'white' }}>Enquiry ID</TableCell>
                <TableCell sx={{ color: 'white' }}>Customer Name</TableCell>
                <TableCell sx={{ color: 'white' }}>DOB</TableCell>
                <TableCell sx={{ color: 'white' }}>Gender</TableCell>
                <TableCell sx={{ color: 'white' }}>Email</TableCell>
                <TableCell sx={{ color: 'white' }}>Contact</TableCell>
                <TableCell sx={{ color: 'white' }}>Alternate</TableCell>
                <TableCell sx={{ color: 'white' }}>Aadhar</TableCell>
                <TableCell sx={{ color: 'white' }}>PAN</TableCell>
                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                <TableCell sx={{ color: 'white' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enquiry.map((e, i) => (
                <TableRow key={i} hover>
                  <TableCell>{e.enquiryId}</TableCell>
                  <TableCell>{e.customerName}</TableCell>
                  <TableCell>{e.dateOfBirth}</TableCell>
                  <TableCell>{e.gender}</TableCell>
                  <TableCell>{e.customerEmailId}</TableCell>
                  <TableCell>{e.customerContactNumber}</TableCell>
                  <TableCell>{e.customerAlternateNumber}</TableCell>
                  <TableCell>{e.aadharNo}</TableCell>
                  <TableCell>{e.panCardNo}</TableCell>
                  <TableCell>{e.enquiryStatus}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      component={Link}
                      to={`/dashboard/loanapplication/${e.enquiryId}`}
                    >
                      Apply
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default ViewEnquiry;
