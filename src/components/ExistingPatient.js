import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';

const ExistingPatient = () => {
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/patients', { mobile });
      const patient = response.data;
      if (patient) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userType', 'patient');
        localStorage.setItem('currentPatient', JSON.stringify(patient));
        window.location.href = '/patient-dashboard';
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Patient not found');
      } else {
        setError('Error fetching patient data');
      }
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
