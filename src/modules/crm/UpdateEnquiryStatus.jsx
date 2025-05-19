import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Snackbar, Alert, Typography
} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

function UpdateEnquiryStatus() {
  const [enquiry, setEnquiry] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const getAllEnquiry = () => {
    axios.get('http://localhost:6051/enquiry/getAllEnquiry')
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

  const updateStatus = (id) => {
    axios.get(`http://localhost:6051/enquiry/updateEnquiryStatus/${id}`)
      .then((res) => {
        setOpenSnackbar(true); // Show success snackbar
        setTimeout(() => {
          setOpenSnackbar(false);
        }, 3000);
        getAllEnquiry(); // Refresh data
      })
      .catch(err => {
        alert(err?.response?.data?.message || "Failed to update status.");
      });
  };

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
                "Alt Contact", "Aadhar", "PAN", "Status", "Date",
                "CIBIL ID", "CIBIL Score", "CIBIL Status", "Update"
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
                <TableCell>{e.cibil?.cibilId || "N/A"}</TableCell>
                <TableCell>{e.cibil?.cibilScore || "N/A"}</TableCell>
                <TableCell>{e.cibil?.cibilStatus || "N/A"}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    color="success"
                    onClick={() => updateStatus(e.enquiryId)}
                  >
                    Forward To OE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar Popup */}
      <Snackbar open={openSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
        Enquiry status updated successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default UpdateEnquiryStatus;
