import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
  Button
} from '@mui/material';

function ViewAllSanctionLetters() {
  const [sanction, setSanction] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSanctionLetters();
  }, []);

  const getSanctionLetters = () => {
    axios
      .get('http://localhost:6053/CM/getAllSanction')
      .then((res) => {
        setSanction(res.data);
      })
      .catch((err) => {
        alert(err.response?.data?.message || 'Error fetching sanction letters');
      });
  };

  const navigateSanctionLetter = (sanctionID) => {
    navigate(`/dashboard/updatesanctionletter/${sanctionID}`);
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
              <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
                <TableCell><strong>Sanction Letter ID</strong></TableCell>
                <TableCell><strong>Applicant Name</strong></TableCell>
                <TableCell><strong>Applicant Email</strong></TableCell>
                <TableCell><strong>Contact Details</strong></TableCell>
                <TableCell><strong>Update</strong></TableCell>
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
                      Update
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

export default ViewAllSanctionLetters;
