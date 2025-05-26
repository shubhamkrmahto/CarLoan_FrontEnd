import React, { useState } from 'react'
import Submit from './Submit';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step7 from './Step7';
import Step8 from './Step8';
import Step9 from './Step9';
import Step10 from './Step10';
import { Container, Paper, Stepper, Step, StepLabel, Box } from '@mui/material';

function LoanApplication() {

  const [step, setStep] = useState(1);

  const steps = [
  'Customer Info', 'Dependent Info', 'Permanent Address', 'Local Address', 'Medical Info',
  'Previous Loan', 'Bank Details', 'Guarantor', 'Verification', 'Upload Docs', 'Submit'
];

  const [files, setFiles] = useState({
        addressProof:'',
        panCard:'',
        incomeTax:'',
        aadharCard:'',
        photo:'',
        signature:'',
        bankCheque:'',
        salarySlips:''
      });

  const [formData, setFormData] = useState({
    customer: {
      customerId:'',
      age: '',
      state: '',
      customerPermanentAddress: '',
      customerCity: '',
      customerPincode: ''
    },
    loanAmount: '',
    loanApplicationStatus: 'PENDING',
    dependent: {
      noOfFamilyMembers: '',
      noOfChild: '',
      maritalStatus: '',
      dependentMember: '',
      familyIncome: ''
    },
    address: {
      paddr: {
        areaName: '',
        cityName: '',
        district: '',
        state: '',
        pincode: '',
        houseNumber: '',
        streetName: ''
      },
      laddr: {
        areaName: '',
        cityName: '',
        district: '',
        state: '',
        pincode: '',
        houseNumber: '',
        streetName: ''
      }
    },
    medicalInfo: {
      patientId: '',
      professionalPatientName: '',
      billingDate: '',
      loanAmount: '',
      treatment: ''
    },
    previousLoanDetails:{
        branchId:'',
        branchName:'',
        branchCode:'',
        branchType:'',
        branchIFSC:'',
        branchMICR:'',
        contact:'',
        bankAddress:'',
        email:'',
        status:''
    },
    bankDetails:{
        accountType:'',
        accountBalance:'',
        accountHolderName:'',
        accountStatus:'',
        accountNumber:''
    },
    loanGuarantor:{
        guarantorName:'',
        guarantorDateOfBirth:'',
        guarantorRelationShipWithCustomer:'',
        guarantorMobileNumber:'',
        guarantorAdharCardNumber:'',
        guarantorMortgageDetails:'',
        guarantorJobDetails:'',
        guarantorLocalAddress:'',
        guarantorPermanentAddress:''
    },
    verification:{
        verificationDate:'',
        status:'',
        remarks:''
    },
    currentLoanDetails:{},
    loanDisbursement:{},
    sanctionLetter:{},

    // ... Add empty objects for cibil, currentLoanDetails, etc.
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const getStepContent = (stepIndex) => {
    const commonProps = { formData, setFormData, nextStep, prevStep };

    switch (stepIndex) {
      case 1: return <Step1 {...commonProps} />;
      case 2: return <Step2 {...commonProps} />;
      case 3: return <Step3 {...commonProps} />;
      case 4: return <Step4 {...commonProps} />;
      case 5: return <Step5 {...commonProps} />;
      case 6: return <Step6 {...commonProps} />;
      case 7: return <Step7 {...commonProps} />;
      case 8: return <Step8 {...commonProps} />;
      case 9: return <Step9 {...commonProps} />;
      case 10: return <Step10 {...commonProps} files={files} setFiles={setFiles} />;
      case 11: return <Submit formData={formData} files={files} prevStep={prevStep} />;
      default: return <div>Unknown step</div>;
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={6} sx={{ p: 3 }}>
        <Stepper activeStep={step - 1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box mt={4}>
          {getStepContent(step)}
        </Box>
      </Paper>
    </Container>
  );
}

export default LoanApplication