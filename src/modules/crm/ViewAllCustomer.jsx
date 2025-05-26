import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ViewAllCustomer() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  const getAllCustomers = () => {
    axios.get('http://localhost:9090/customer/customer/getallcustomer')
      .then((res) => {
        setCustomers(res.data);
      })
      .catch(err => {
        alert(err?.response?.data?.message || "Failed to fetch customers.");
      });
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  const handleApply = (enquiryId) => {
    navigate(`/dashboard/loanenquiry/${enquiryId}`);
  };

  return (
    <div className="container my-4">
      <Typography variant="h5" gutterBottom>
        All Customers
      </Typography>

      <TableContainer component={Paper} elevation={5}>
        <Table sx={{ minWidth: 1200 }} size="small">
          <TableHead sx={{ backgroundColor: '#1565c0' }}>
            <TableRow>
              {[
                "Customer ID", "Name", "Username", "DOB", "Gender", "Contact",
                "Email", "Address", "Aadhar No", "PAN Card No", "Apply"
              ].map((head, i) => (
                <TableCell key={i} sx={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((c, index) => (
              <TableRow key={index} hover>
                <TableCell>{c.customerId}</TableCell>
                <TableCell>{c.customerName}</TableCell>
                <TableCell>{c.userName}</TableCell>
                <TableCell>{c.dateOfBirth}</TableCell>
                <TableCell>{c.gender}</TableCell>
                <TableCell>{c.customerContactNumber}</TableCell>
                <TableCell>{c.customerEmailId}</TableCell>
                <TableCell>{c.customerPermanentAddress}</TableCell>
                <TableCell>{c.aadharNo}</TableCell>
                <TableCell>{c.panCardNo}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleApply(c.le.enquiryId)}
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
  );
}

export default ViewAllCustomer;
