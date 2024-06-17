// src/components/ExistingPatient.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import patientsData from '../data/patients.json';

const ExistingPatient = () => {
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const storedPatientsData = JSON.parse(localStorage.getItem('patientsData')) || patientsData;
    const patient = storedPatientsData.find(p => p.mobile === mobile);
    if (patient) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('userType', 'patient');
      localStorage.setItem('currentPatient', JSON.stringify(patient));
      window.location.href = ('/patient-dashboard');
    } else {
      setError('Patient not found');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Existing Patient Login
        </Typography>
        <form onSubmit={handleLogin}>
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
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ExistingPatient;
