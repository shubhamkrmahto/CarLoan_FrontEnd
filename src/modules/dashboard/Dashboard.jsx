import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Profile from './Profile';
import SideNav from './SideNav';
import AddEmployee from '../admin/AddEmployee';
import ViewEmployee from '../admin/ViewEmployee';
import LoanApplication from '../crm/LoanApplication/LoanApplication';
import LoanEnquiry from '../crm/LoanEnquiry';
import GenerateCibil from '../oe/GenerateCibil';
import VerifyDocuments from '../oe/VerifyDocuments';
import LoanDisbursement from '../ah/LoanDisbursement';
import ViewCustomer from '../customer/ViewCustomer';
import ViewEnquiry from '../crm/ViewEnquiry';
import UpdateEnquiryStatus from '../crm/UpdateEnquiryStatus';
import ViewLoanapplicationOE from '../oe/ViewLoanapplicationOE';
import ViewLoanapplicationCM from '../cm/ViewLoanapplicationCM';
import SanctionLetterDetails from '../cm/SanctionLetterDetails';
import ViewAllSanctionLetters from '../cm/ViewAllSanctionLetters';
import UpdateSanctionLetter from '../cm/UpdateSanctionLetter';
import './Dashboard.css'; // Include your styles
import ViewSanctionLetterID from '../cm/ViewSanctionLetterID';
import GenerateSanctionDetails from '../cm/GenerateSanctionDetails';
import AllLoanDisbursement from '../ah/AllLoanDisbursement';
import AddBankDetails from '../ah/AddBankDetails';
import DownPaymentDetails from '../ah/DownPaymentDetails';
import ViewSingleLoanDisbursement from '../ah/ViewSingleLoanDisbursement';
import ViewLedger from '../ah/ViewLedger';

function Dashboard() {

  const userJson = localStorage.getItem("user");
  const { employeeType } = JSON.parse(userJson);

  const appRoute = {
    ADMIN: [
      { path: 'addemployee', Component: <AddEmployee /> },
      { path: 'viewemployee', Component: <ViewEmployee /> }
    ],
    CRM: [
      { path: 'loanenquiry', Component: <LoanEnquiry /> },
      { path: 'viewenquiry', Component: <ViewEnquiry /> },
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
    ],
    CUSTOMER: [
      { path: 'viewcustomer', Component: <ViewCustomer /> }
    ]
  };
  
  return (
    <div className="dashboard-wrapper">
      <aside className="sidenav">
        <SideNav />
      </aside>

      <div className="main-area">
        <Profile />
        <div className="page-content">
          <Routes>
        {appRoute[employeeType].map((btn, index) => (
          <Route key={index} path={btn.path} element={btn.Component} />
        ))}
        <Route path="/loanenquiry" element={<LoanEnquiry/>} />
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
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
