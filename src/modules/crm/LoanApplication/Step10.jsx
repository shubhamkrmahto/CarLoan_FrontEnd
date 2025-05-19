import React from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Step10({ enquiryID, setEnquiryID, files, setFiles, nextStep, prevStep }) {
  const handleFileChange = (e) => {
    setFiles({
      ...files,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleFileRemove = (fieldName) => {
    const updatedFiles = { ...files };
    delete updatedFiles[fieldName];
    setFiles(updatedFiles);
  };

  const handleEnquiryIDChange = (e) => {
    setEnquiryID(e.target.value);
  };

  const fileFields = [
    'addressProof',
    'panCard',
    'incomeTax',
    'aadharCard',
    'photo',
    'signature',
    'bankCheque',
    'salarySlips',
  ];

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Document Upload
      </Typography>

      {/* Enquiry ID Input
      <Box mb={4}>
        <Typography variant="subtitle1">Enquiry ID</Typography>
        <input
          type="text"
          value={enquiryID}
          onChange={handleEnquiryIDChange}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '16px',
            marginTop: '6px',
          }}
        />
      </Box> */}

      {fileFields.map((fieldName) => (
        <Box key={fieldName} mb={3}>
          <Typography variant="subtitle2" gutterBottom>
            Upload {fieldName.replace(/([A-Z])/g, ' $1')}:
          </Typography>

          {/* Upload button + filename + clear button */}
          <Box display="flex" alignItems="center" gap={1}>
            <Button
              variant="contained"
              component="label"
              sx={{
                backgroundColor: "#6C63FF",
                "&:hover": { backgroundColor: "#5751d6" },
                minWidth: 180,
              }}
            >
              Upload File
              <input
                type="file"
                hidden
                name={fieldName}
                onChange={handleFileChange}
              />
            </Button>

            {files[fieldName] && (
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2">{files[fieldName].name}</Typography>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleFileRemove(fieldName)}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>
      ))}

      <Box mt={4} display="flex" justifyContent="space-between">
        <Button variant="outlined" onClick={prevStep}>
          Back
        </Button>
        <Button variant="contained" onClick={nextStep}>
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default Step10;
