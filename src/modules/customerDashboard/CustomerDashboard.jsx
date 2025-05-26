import { Routes, Route } from 'react-router-dom';
import { Box, Grid, Container } from '@mui/material';
import CustomerProfile from "./CustomerProfile";
import ViewEnquiry from "./ViewEnquiry";
import ViewSanction from "./ViewSanction";
import CustomerSideNav from './CustomerSideNav';
import UpdateDetails from './UpdateDetails';


function CustomerDashBoard() {

  const customerRouting = [
      { path: 'viewenquiry', Component: <ViewEnquiry /> },
      { path: 'profile', Component: <CustomerProfile /> },
      { path: 'viewsanction', Component: <ViewSanction /> }
    ];

    return(
      
      <Box sx={{ display: 'flex', minHeight: '80vh', width: '100%', overflowX: 'hidden' }}>
      {/* Sidebar */}
      <Box sx={{
    width: { xs: '100%', marginTop: 70, sm: '160px' },
    pr: { sm: 3 },
    flexShrink: 0,
     }}>
        <CustomerSideNav />
      </Box>

      {/* Main content */}
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
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
            <Route index element={<CustomerProfile />} />
            {customerRouting?.map((btn, index) => (
              <Route key={index} path={btn.path} element={btn.Component} />
            ))}
            <Route path='updatedetails/:customerId' element={<UpdateDetails/>}></Route>
          </Routes>
        </Box>
      </Box>
    </Box>
    )
  
}

export default CustomerDashBoard