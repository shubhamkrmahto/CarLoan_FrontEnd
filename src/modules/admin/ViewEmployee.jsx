import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Typography,
  Avatar, Dialog, DialogContent, DialogActions,
  DialogTitle, Snackbar, Alert
} from '@mui/material';

function ViewEmployee() {
  const [employee, setEmployee] = useState([]);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // For delete confirmation dialog
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // For snackbar notification
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  function fetchEmployees() {
    axios.get('http://localhost:9090/admin/employee/getAllEmployee')
      .then((res) => {
        setEmployee(res.data);
      })
      .catch(err => {
        alert("Error fetching employees: " + err.message);
      });
  }

  const handleImageClick = (imageData) => {
    setSelectedImage(imageData);
    setOpenImageDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenImageDialog(false);
    setSelectedImage(null);
  };

  // Open confirm dialog when delete is clicked
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenConfirmDialog(true);
  };

  // Confirm deletion
    const handleConfirmDelete = () => {
    axios.delete(`http://localhost:9090/admin/employee/delete/${deleteId}`)
      .then(() => {
        setOpenConfirmDialog(false);
        setDeleteId(null);
        fetchEmployees();
        setSnackbarOpen(true); // Show snackbar on success
      })
      .catch(() => {
        alert("Error deleting employee.");
        setOpenConfirmDialog(false);
        setDeleteId(null);
      });
  };

  // Cancel deletion
  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
    setDeleteId(null);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        👨‍💼 View All Employees
      </Typography>

      <TableContainer component={Paper} elevation={4}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead sx={{ backgroundColor: '#0d6efd' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Employee ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Employee Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Employee Email</TableCell>
              <TableCell sx={{ color: 'white' }}>Employee Contact</TableCell>
              <TableCell sx={{ color: 'white' }}>Employee Type</TableCell>
              <TableCell sx={{ color: 'white' }}>Profile Image</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employee?.map((emp, index) => (
              <TableRow key={index} hover>
                <TableCell>{emp.employeeId}</TableCell>
                <TableCell>{emp.employeeName}</TableCell>
                <TableCell>{emp.employeeEmail}</TableCell>
                <TableCell>{emp.employeeContact}</TableCell>
                <TableCell>{emp.employeeType}</TableCell>
                <TableCell>
                  <Avatar
                    src={`data:image/jpeg;base64,${emp.profilePhoto}`}
                    alt="profile"
                    sx={{
                      width: 60,
                      height: 60,
                      border: '2px solid #0d6efd',
                      cursor: 'pointer',
                    }}
                    variant="rounded"
                    onClick={() => handleImageClick(emp.profilePhoto)}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="error" onClick={() => handleDeleteClick(emp.employeeId)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for full image view */}
      <Dialog
        open={openImageDialog}
        onClose={handleCloseDialog}
        maxWidth="lg"
        PaperProps={{
          style: {
            backgroundColor: 'rgba(0,0,0,0.7)',
            boxShadow: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }
        }}
        fullWidth
      >
        <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src={`data:image/jpeg;base64,${selectedImage}`}
            alt="Full View"
            style={{ maxHeight: '90vh', borderRadius: 10, boxShadow: '0 0 20px white' }}
            onClick={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Delete */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCancelDelete}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this employee?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for delete success */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          Employee deleted successfully.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ViewEmployee;
