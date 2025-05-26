import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {
  Container, TextField, MenuItem, Button, Box, Typography, Dialog, DialogTitle, DialogContent, InputLabel, FormControl
} from '@mui/material';
import { useParams } from 'react-router-dom';

function UpdateDetails() {
  const { customerId } = useParams();

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();
  const [openPopup, setOpenPopup] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  const dateOfBirth = watch('dateOfBirth');

  useEffect(() => {
    if (dateOfBirth) {
      const dob = new Date(dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      setValue('age', age);
    }
  }, [dateOfBirth, setValue]);

  useEffect(() => {
    if (customerId) {
      axios.get(`http://localhost:9090/customer/customer/getcustomerbyid/${customerId}`)
        .then((res) => {
          const data = res.data;
          Object.keys(data).forEach((key) => {
            if (key !== 'profilePicture') setValue(key, data[key]);
          });
        })
        .catch(() => alert('Failed to fetch customer data.'));
    }
  }, [customerId, setValue]);

  const onSubmit = (data) => {
    const customer = {
      dateOfBirth: data.dateOfBirth,
      age: data.age,
      gender: data.gender,
      state: data.state,
      customerContactNumber: data.customerContactNumber,
      customerAlternateNumber: data.customerAlternateNumber,
      customerPermanentAddress: data.customerPermanentAddress,
      customerCity: data.customerCity,
      customerPincode: data.customerPincode,
      aadharNo: data.aadharNo,
      panCardNo: data.panCardNo
    };

    const formData = new FormData();
    formData.append('customerData', new Blob([JSON.stringify(customer)], { type: 'application/json' }));
    if (profilePic) {
      formData.append('profileImage', profilePic);
    }

    setOpenPopup(true);
    axios.patch(`http://localhost:9090/customer/customer/updatecustomerinfo/${customerId}`, formData)
      .then(() => {
        setOpenPopup(false);
        alert('Customer profile submitted successfully.');
        reset();
        setProfilePic(null);
      })
      .catch(() => {
        setOpenPopup(false);
        alert('Submission failed.');
      });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Customer Profile Form
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="date"
          fullWidth
          margin="normal"
          label="Date of Birth"
          InputLabelProps={{ shrink: true }}
          {...register('dateOfBirth', {
            required: 'Date of Birth is required',
            validate: (value) => {
              const dob = new Date(value);
              const today = new Date();
              let age = today.getFullYear() - dob.getFullYear();
              const m = today.getMonth() - dob.getMonth();
              if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
                age--;
              }
              return age >= 18 || 'Customer must be at least 18 years old';
            }
          })}
        />
        {errors.dateOfBirth && (
          <Typography variant="caption" color="error">
            {errors.dateOfBirth.message}
          </Typography>
        )}

        <TextField
          fullWidth
          label="Age"
          type="number"
          margin="normal"
          {...register('age')}
          InputProps={{ readOnly: true }}
        />

        <TextField select fullWidth margin="normal" label="Gender" defaultValue="" {...register('gender')}>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Others">Others</MenuItem>
        </TextField>

        <TextField fullWidth label="State" margin="normal" {...register('state')} />
        <TextField fullWidth label="Contact Number" type="number" margin="normal" {...register('customerContactNumber')} />
        <TextField fullWidth label="Alternate Number" type="number" margin="normal" {...register('customerAlternateNumber')} />
        <TextField fullWidth label="Permanent Address" margin="normal" {...register('customerPermanentAddress')} />
        <TextField fullWidth label="City" margin="normal" {...register('customerCity')} />
        <TextField fullWidth label="Pincode" type="number" margin="normal" {...register('customerPincode')} />
        <TextField fullWidth label="Aadhar Number" type="number" margin="normal" {...register('aadharNo')} />
        <TextField fullWidth label="PAN Card Number" margin="normal" {...register('panCardNo')} />

        <FormControl fullWidth margin="normal">
          <InputLabel shrink>Profile Picture</InputLabel>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePic(e.target.files[0])}
            style={{ marginTop: '8px' }}
          />
        </FormControl>

        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <Button variant="contained" color="warning" onClick={() => reset()}>
            Clear
          </Button>
        </Box>
      </form>

      <Dialog open={openPopup}>
        <DialogTitle>Processing</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Submitting your profile...</Typography>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default UpdateDetails;
