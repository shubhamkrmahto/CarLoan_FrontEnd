import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Grid, Container } from '@mui/material';

import Profile from './Profile';
import SideNav from './SideNav';
import AddEmployee from '../admin/AddEmployee';
import ViewEmployee from '../admin/ViewEmployee';
import LoanApplication from '../crm/LoanApplication/LoanApplication';
import LoanEnquiry from '../crm/LoanEnquiry';
import GenerateCibil from '../oe/GenerateCibil';
import VerifyDocuments from '../oe/VerifyDocuments';
import LoanDisbursement from '../ah/LoanDisbursement';
import ViewAllCustomer from '../crm/ViewAllCustomer';
import ViewEnquiry from '../crm/ViewEnquiry';
import UpdateEnquiryStatus from '../crm/UpdateEnquiryStatus';
import ViewLoanapplicationOE from '../oe/ViewLoanapplicationOE';
import ViewLoanapplicationCM from '../cm/ViewLoanapplicationCM';
import SanctionLetterDetails from '../cm/SanctionLetterDetails';
import ViewAllSanctionLetters from '../cm/ViewAllSanctionLetters';
import UpdateSanctionLetter from '../cm/UpdateSanctionLetter';
import ViewSanctionLetterID from '../cm/ViewSanctionLetterID';
import GenerateSanctionDetails from '../cm/GenerateSanctionDetails';
import AllLoanDisbursement from '../ah/AllLoanDisbursement';
import AddBankDetails from '../ah/AddBankDetails';
import DownPaymentDetails from '../ah/DownPaymentDetails';
import ViewSingleLoanDisbursement from '../ah/ViewSingleLoanDisbursement';
import ViewLedger from '../ah/ViewLedger';
import ViewAllEnquiry from '../crm/ViewAllEnquiry';

function Dashboard() {
  const userJson = localStorage.getItem("user");
  const { employeeType } = JSON.parse(userJson);

  const appRoute = {
    ADMIN: [
      { path: 'addemployee', Component: <AddEmployee /> },
      { path: 'viewemployee', Component: <ViewEmployee /> }
    ],
    CRM: [
      { path: 'viewallCustomer', Component: <ViewAllCustomer /> },
      { path: 'viewallenquiry', Component:<ViewAllEnquiry/>},
      { path: 'approvedenquiries', Component: <ViewEnquiry /> },
      { path: 'updateenquirystatus', Component: <UpdateEnquiryStatus /> }
    ],
    OE: [
      { path: 'generatecibil', Component: <GenerateCibil /> },
      { path: 'viewloanapplicationid', Component: <ViewLoanapplicationOE /> }
    ],
    CM: [
      { path: 'viewloanapplicationid', Component: <ViewLoanapplicationCM /> },
      { path: 'viewallsanctionletters', Component: <ViewAllSanctionLetters /> },
      { path: 'viewsanctionletterid', Component: <ViewSanctionLetterID /> }
    ],
    AH: [
      { path: 'loandisbursement', Component: <LoanDisbursement /> },
      { path: 'allloandisbursements', Component: <AllLoanDisbursement /> }
    ]
  };


  return (
    <Box sx={{ display: 'flex', minHeight: '80vh', width: '100%', overflowX: 'hidden' }}>
      {/* Sidebar */}
      <Box sx={{
    width: { xs: '100%', sm: '180px' },
    pr: { sm: 3 },
    flexShrink: 0,
     }}>
        <SideNav />
      </Box>

      {/* Main content */}
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Profile />

        <Box
          sx={{
          mt: 3,
          p: 2,
          borderRadius: 2,
          background: 'linear-gradient(to right, #e3f2fd, #90a4ae)',
          minHeight: '500px',
          overflowX: 'auto', // allows inner scroll on table overflow
          }}
        >
          <Routes>
            {appRoute[employeeType]?.map((btn, index) => (
              <Route key={index} path={btn.path} element={btn.Component} />
            ))}
            {/* Common routes */}
              <Route path="/loanenquiry/:enquiryID" element={<LoanEnquiry />} />
              <Route path='/loanapplication/:enquiryID' element={<LoanApplication />} />
              <Route path='/verifydocuments/:loanApplicationID' element={<VerifyDocuments />} />
              <Route path='/fillsanctiondetails/:loanApplicationID' element={<SanctionLetterDetails />} />
              <Route path='/updatesanctionletter/:sanctionID' element={<UpdateSanctionLetter />} />
              <Route path='/generatesanctiondetails/:sanctionID' element={<GenerateSanctionDetails />} />
              <Route path='/addbankdetails/:loanDisbursementID' element={<AddBankDetails />} />
              <Route path='/adddownpaymentdetails/:loanDisbursementID' element={<DownPaymentDetails />} />
              <Route path='/viewsingleloandisbursement/:loanDisbursementID' element={<ViewSingleLoanDisbursement />} />
              <Route path='/viewledger/:loanDisbursementID' element={<ViewLedger />} />

          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
