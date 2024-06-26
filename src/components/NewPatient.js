// src/components/NewPatient.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import patientsData from '../data/patients.json';

const NewPatient = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    if (patientsData.some(p => p.mobile === mobile)) {
      setError('Mobile number already registered');
      return;
    }

    const newPatient = {
      patientId: `patient${patientsData.length + 1}`,
      name,
      mobile,
      age,
      address,
      files: [],
      appointments: {}
    };

    const storedPatientsData = JSON.parse(localStorage.getItem('patientsData')) || patientsData;
    const updatedPatientsData = [...storedPatientsData, newPatient];
    localStorage.setItem('patientsData', JSON.stringify(updatedPatientsData));

    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('userType', 'patient');
    localStorage.setItem('currentPatient', JSON.stringify(newPatient));
    
    setSuccess('Registration successful!');
    window.location.href = ('/patient-dashboard');
  };

  return (
    <Container maxWidth="xs">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          New Patient Registration
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Mobile Number"
            type="tel"
            variant="outlined"
            fullWidth
            margin="normal"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <TextField
            label="Age"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {success}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default NewPatient;
