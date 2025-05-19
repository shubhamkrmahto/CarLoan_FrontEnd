import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Typography,
  Fade, Backdrop, CircularProgress, Box
} from '@mui/material';

function GenerateCibil() {
  const [enquiry, setEnquiry] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFTOEEnquiry();
  }, []);

  const getFTOEEnquiry = () => {
    setLoading(true);
    axios.get('http://localhost:6051/enquiry/getEnquiryForward_To_Oe')
      .then((res) => {
        setEnquiry(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert("Error: " + err.message);
        setLoading(false);
      });
  };

  const updateCIBIL = (id) => {
    setLoading(true);
    axios.get(`http://localhost:6052/OE/updateCibil/${id}`)
      .then(() => {
        setLoading(false);
        setShowPopup(true);
        getFTOEEnquiry();

        // Auto-hide popup after 3 seconds
        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      })
      .catch((err) => {
        alert("Error: " + err.message);
        setLoading(false);
      });
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        All Enquiries - Generate CIBIL
      </Typography>

      <div style={{ overflowX: 'auto' }}>
        <TableContainer component={Paper} elevation={4}>
          <Table size="small" sx={{ minWidth: 1200 }}>
            <TableHead sx={{ backgroundColor: '#1976d2' }}>
              <TableRow>
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
                <TableCell sx={{ color: 'white' }}>Date</TableCell>
                <TableCell sx={{ color: 'white' }}>CIBIL ID</TableCell>
                <TableCell sx={{ color: 'white' }}>Score</TableCell>
                <TableCell sx={{ color: 'white' }}>CIBIL Status</TableCell>
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
                  <TableCell>{e.enquiryDateTime}</TableCell>
                  <TableCell>{e.cibil?.cibilId || '-'}</TableCell>
                  <TableCell>{e.cibil?.cibilScore || '-'}</TableCell>
                  <TableCell>{e.cibil?.cibilStatus || '-'}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      onClick={() => updateCIBIL(e.enquiryId)}
                    >
                      Generate CIBIL
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Loading Spinner (Backdrop) */}
      <Backdrop
        open={loading}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 2, color: '#fff' }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Custom Centered Popup */}
      <Fade in={showPopup}>
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'success.main',
            color: 'white',
            px: 4,
            py: 2,
            borderRadius: 2,
            boxShadow: 6,
            zIndex: (theme) => theme.zIndex.modal + 1,
            fontWeight: 'bold',
            fontSize: '1.2rem',
          }}
        >
          CIBIL Score Generated!
        </Box>
      </Fade>
    </div>
  );
}

export default GenerateCibil;
