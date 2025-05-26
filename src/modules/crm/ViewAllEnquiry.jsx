import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography
} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

function ViewAllEnquiry() {
  const [enquiry, setEnquiry] = useState([]);

  const getAllEnquiry = () => {
    axios.get('http://localhost:9090/crm/enquiry/getAllEnquiry')
      .then((res) => {
        setEnquiry(res.data);
        console.log(res.data);
      })
      .catch(err => {
        alert(err?.response?.data?.message || "Failed to fetch enquiries.");
      });
  };

  useEffect(() => {
    getAllEnquiry();
  }, []);

  return (
    <div className="container my-4">
      <Typography variant="h5" gutterBottom>
      All Enquiries
      </Typography>

      <TableContainer component={Paper} elevation={5}>
        <Table sx={{ minWidth: 1200 }} size="small">
          <TableHead sx={{ backgroundColor: '#1565c0' }}>
            <TableRow>
              {[
                "Enquiry ID", "Name", "DOB", "Gender", "Email", "Contact",
                "Alternate Contact", "Aadhar No", "PAN Card No", "Status", "Enquiry Date",
                "CIBIL Score", "CIBIL Status"
              ].map((head, i) => (
                <TableCell key={i} sx={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {enquiry?.map((e, index) => (
              <TableRow key={index} hover>
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
                <TableCell>{e.enquiryDateTime}</TableCell>
                <TableCell>{e.cibil?.cibilScore || "N/A"}</TableCell>
                <TableCell>{e.cibil?.cibilStatus || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ViewAllEnquiry