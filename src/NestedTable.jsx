import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableRow, Paper, Button, Typography
} from '@mui/material';

const keyLabelMap = {
  applicationId: 'Application ID',
  customer: 'Customer',
  loanAmount: 'Loan Amount',
  loanApplicationStatus: 'Loan Application Status',
  documents: 'Documents',
  dependent: 'Dependent',
  address: 'Address',
  medicalInfo: 'Medical Info',
  cibil: 'CIBIL',
  currentLoanDetails: 'Current Loan Details',
  previousLoanDetails: 'Previous Loan Details',
  bankDetails: 'Bank Details',
  loanGuarantor: 'Loan Guarantor',
  loanDisbursement: 'Loan Disbursement',
  ledger: 'Ledger',
  sanctionLetter: 'Sanction Letter',
  verification: 'Verification',
  // add more mappings as you get new keys
};

function toTitleCase(str) {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (match) => match.toUpperCase())
    .trim();
}

function NestedTable({ data }) {
  if (data === null || typeof data !== 'object') {
    return <Typography>{String(data)}</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2, maxWidth: 800 }}>
      <Table size="small" aria-label="nested table">
        <TableBody>
          {Object.entries(data).map(([key, value]) => (
            <TableRow key={key} hover>
              <TableCell sx={{ fontWeight: 'bold', width: 200, bgcolor: '#f5f5f5' }}>
                {keyLabelMap[key] || toTitleCase(key)}
              </TableCell>
              <TableCell>
                {isBase64Image(value) ? (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => openImageInNewTab(value)}
                  >
                    View Image
                  </Button>
                ) : (typeof value === 'object' && value !== null) ? (
                  <NestedTable data={value} />
                ) : (
                  <Typography>{value === null || value === undefined ? 'N/A' : String(value)}</Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// Detect base64 JPEG image
function isBase64Image(value) {
  return (
    typeof value === 'string' &&
    value.length > 100 &&
    value.startsWith('/9j/')
  );
}

// Open image in new tab with dynamic sizing
function openImageInNewTab(base64Data) {
  const img = new Image();
  img.src = `data:image/jpeg;base64,${base64Data}`;

  img.onload = () => {
    const width = img.naturalWidth;
    const height = img.naturalHeight;

    const newTab = window.open('', '_blank', `width=${width + 20},height=${height + 20}`);
    newTab.document.write(`
      <html>
        <head><title>Image Preview</title></head>
        <body style="margin:0; display:flex; justify-content:center; align-items:center; height:100vh; background:#000;">
          <img src="${img.src}" style="max-width:100%; max-height:100%; object-fit:contain;" />
        </body>
      </html>
    `);
    newTab.document.close();
  };
}

export default NestedTable;
