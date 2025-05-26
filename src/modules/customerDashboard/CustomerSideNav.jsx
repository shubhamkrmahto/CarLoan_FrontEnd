import React from 'react'
import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function CustomerSideNav() {

  const customerRouting = [
      { label: "Profile", to: '/customer/profile' },
      { label: "View Enquiry", to: '/customer/viewenquiry' },
      { label: "View Sanction", to: '/customer/viewsanction' }
    ];

  return (
    <Stack spacing={2}>
  <Typography variant="h6">Dashboard</Typography>
  {customerRouting?.map((btn, index) => (
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

export default CustomerSideNav