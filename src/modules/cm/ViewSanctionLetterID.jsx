import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TableContainer
} from '@mui/material';
import { useNavigate } from 'react-router-dom';  // <-- Make sure to import useNavigate

function ViewSanctionLetterID() {
  const [sanction, setSanction] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getLoanApplicationID();
  }, []);

  const getLoanApplicationID = () => {
    axios
      .get('http://localhost:9090/cm/CM/getAllSanction')
      .then((res) => setSanction(res.data))
      .catch((err) => {
        alert(err.response?.data?.message || "Error fetching sanction letters.");
      });
  };

  const navigateSanctionLetter = (sanctionID) => {
    // Direct navigation with no loading or delay
    navigate(`/dashboard/generatesanctiondetails/${sanctionID}`);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom color="primary">
        Sanction Letters
      </Typography>

      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1976d2' }}>
                <TableCell><strong>Sanction Letter ID</strong></TableCell>
                <TableCell><strong>Applicant Name</strong></TableCell>
                <TableCell><strong>Applicant Email</strong></TableCell>
                <TableCell><strong>Contact Details</strong></TableCell>
                <TableCell><strong>Generate Sanction Details</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sanction.map((s, index) => (
                <TableRow key={index}>
                  <TableCell>{s.sanctionLetterId}</TableCell>
                  <TableCell>{s.applicantName}</TableCell>
                  <TableCell>{s.applicantEmail}</TableCell>
                  <TableCell>{s.contactDetails}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => navigateSanctionLetter(s.sanctionLetterId)}
                    >
                      Generate
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {sanction.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No sanction letters available.
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

export default ViewSanctionLetterID;
