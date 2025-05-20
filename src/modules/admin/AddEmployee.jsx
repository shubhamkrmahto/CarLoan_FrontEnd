import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Paper,
  Snackbar,
  TextField,
  Typography,
  Alert,
  MenuItem,
  IconButton,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function AddEmployee() {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Watch the file input to detect changes
  const profilePhoto = watch("profilePhoto");

  const onSubmit = (data) => {
    const EmployeeDetails = {
      employeeName: data.employeeName,
      employeeEmail: data.employeeEmail,
      employeeContact: data.employeeContact,
      employeeType: data.employeeType,
      password: data.password,
    };

    const formData = new FormData();
    formData.append("emp", JSON.stringify(EmployeeDetails));
    formData.append("photo", data.profilePhoto[0]);

    axios
      .post("http://localhost:9090/admin/employee/saveEmployee", formData)
      .then(() => {
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
        alert("Error saving employee.");
      });
  };

  // Handle file selection change to show filename
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  // Remove the selected file
  const removeSelectedFile = () => {
    setSelectedFile(null);
    // Clear the file input in react-hook-form
    setValue("profilePhoto", null);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(145deg, #2C3E50, #4CA1AF)",
        color: "#f2f2f2",
        py: 5,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 0 20px rgba(0,0,0,0.2)",
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ color: "#E0E0E0" }}>
            👤 Add New Employee
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <Box mb={3}>
              <TextField
                fullWidth
                label="Employee Name"
                variant="outlined"
                InputLabelProps={{ style: { color: "#cfd8dc" } }}
                InputProps={{ style: { color: "#ffffff" } }}
                {...register("employeeName", { required: true })}
              />
            </Box>

            <Box mb={3}>
              <TextField
                fullWidth
                label="Contact Number"
                type="number"
                variant="outlined"
                InputLabelProps={{ style: { color: "#cfd8dc" } }}
                InputProps={{ style: { color: "#ffffff" } }}
                {...register("employeeContact", { required: true })}
              />
            </Box>

            <Box mb={3}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                InputLabelProps={{ style: { color: "#cfd8dc" } }}
                InputProps={{ style: { color: "#ffffff" } }}
                {...register("employeeEmail", { required: true })}
              />
            </Box>

            <Box mb={3}>
              <TextField
                fullWidth
                select
                label="Employee Type"
                variant="outlined"
                defaultValue=""
                InputLabelProps={{ style: { color: "#cfd8dc" } }}
                InputProps={{ style: { color: "#ffffff" } }}
                {...register("employeeType", { required: true })}
              >
                <MenuItem value="ADMIN">Admin</MenuItem>
                <MenuItem value="CRM">
                  CRM (Customer Relationship Manager)
                </MenuItem>
                <MenuItem value="OE">OE (Operational Executive)</MenuItem>
                <MenuItem value="CM">CM (Credit Manager)</MenuItem>
                <MenuItem value="AH">AH (Account Head)</MenuItem>
              </TextField>
            </Box>

            <Box mb={3}>
              <TextField
                fullWidth
                type="password"
                label="Password"
                variant="outlined"
                InputLabelProps={{ style: { color: "#cfd8dc" } }}
                InputProps={{ style: { color: "#ffffff" } }}
                {...register("password", { required: true })}
              />
            </Box>

            {/* Upload button + filename + clear button */}
            <Box mb={4} display="flex" alignItems="center" gap={1}>
              <Button
                variant="contained"
                component="label"
                sx={{
                  backgroundColor: "#6C63FF",
                  "&:hover": { backgroundColor: "#5751d6" },
                  minWidth: 150,
                }}
              >
                Upload Profile Photo
                <input
                  type="file"
                  hidden
                  {...register("profilePhoto", {
                    required: true,
                    onChange: handleFileChange,
                  })}
                />
              </Button>

              {selectedFile && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    px: 2,
                    py: 1,
                    color: "#E0E0E0",
                    maxWidth: "70%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ mr: 1, fontWeight: "bold" }}
                    title={selectedFile.name}
                  >
                    {selectedFile.name}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={removeSelectedFile}
                    sx={{ color: "#ff6b6b" }}
                    aria-label="remove file"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{ width: "48%" }}
              >
                Submit
              </Button>
              <Button
                type="button"
                variant="outlined"
                color="error"
                sx={{ width: "48%" }}
                onClick={() => {
                  reset();
                  setSelectedFile(null);
                }}
              >
                Clear Form
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          sx={{ width: "100%", backgroundColor: "#007BFF", color: "#fff" }}
        >
          🎉 Employee has been added successfully.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AddEmployee;
