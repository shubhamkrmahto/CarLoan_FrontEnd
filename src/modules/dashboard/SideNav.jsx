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
      { label: "Loan Enquiry", to: '/dashboard/loanenquiry' },
      { label: "View Enquiry", to: '/dashboard/viewenquiry' },
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
    ],
    CUSTOMER: [
      { label: "View Customer", to: '/dashboard/viewcustomer' }
    ]
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Dashboard</Typography>
      {dynamicRouting[employeeType]?.map((btn, index) => (
        <Button
          key={index}
          variant="outlined"
          fullWidth
        >
          <Link to={btn.to} className="sidenav-link">
          {btn.label}
        </Link>
        </Button>
      ))}
    </Stack>
  );
}

export default SideNav;
