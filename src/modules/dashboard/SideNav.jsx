import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function SideNav() {
  const navigate = useNavigate();
  const userJson = localStorage.getItem("user");
  const { employeeType } = JSON.parse(userJson);

  const dynamicRouting = {
    ADMIN: [
      { label: "Add Employee", to: '/dashboard/addemployee' },
      { label: "View Employee", to: '/dashboard/viewemployee' },
    ],
    CRM: [
      { label: "All Customers", to: '/dashboard/viewallcustomer' },
      { label:"All Enquiries", to:'/dashboard/viewallenquiry'},
      { label: "Approved Enquiries", to: '/dashboard/approvedenquiries' },
      { label: "Update Enquiry Status", to: '/dashboard/updateenquirystatus' }
    ],
    OE: [
      { label: "Generate Cibil Score", to: '/dashboard/generatecibil' },
      { label: "View Loan Applications ID", to: '/dashboard/viewloanapplicationid' }
    ],
    CM: [
      { label: "Update Sanction Details", to: '/dashboard/viewloanapplicationid' },
      { label: "Generate Sanction Details", to: '/dashboard/viewsanctionletterid' },
      { label: "Generate Sanction Letters", to: '/dashboard/viewallsanctionletters' }
    ],
    AH: [
      { label: "Create Loan Disbursement", to: '/dashboard/loandisbursement' },
      { label: "All Loan Disbursements", to: '/dashboard/allloandisbursements' }
    ]
  };

  return (
    <Stack spacing={2}>
  <Typography variant="h6">Dashboard</Typography>
  {dynamicRouting[employeeType]?.map((btn, index) => (
    <Button
      key={index}
      variant="contained" // use contained for puffiness
      component={Link}    // Let Button itself act as Link
      to={btn.to}
      fullWidth
      sx={{
        textTransform: 'none',
        fontWeight: 'bold',
        fontSize: '1rem',
        py: 1.5,
        borderRadius: 3,
        boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
        backgroundColor: 'primary.main',
        color: 'white',
        '&:hover': {
          backgroundColor: 'primary.dark',
          boxShadow: '0px 6px 16px rgba(0,0,0,0.2)',
        }
          }}
        >
          {btn.label}
        </Button>
      ))}
    </Stack>
  );
}

export default SideNav;
