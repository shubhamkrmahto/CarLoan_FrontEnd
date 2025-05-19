import React from 'react';
import { Link } from 'react-router-dom';
import './SideNav.css'; // External CSS for styling

function SideNav() {
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
  <div className="sidenav-container">
    {dynamicRouting[employeeType]?.map((btn, index) => (
      <button key={index} className="sidenav-button">
        <Link to={btn.to} className="sidenav-link">
          {btn.label}
        </Link>
      </button>
    ))}
  </div>
);

}

export default SideNav;
