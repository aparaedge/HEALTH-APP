// src/components/Home.js
import React, { useEffect } from 'react';
import { Container, Box, Button, Typography } from '@mui/material';

const Home = () => {

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    const userType = localStorage.getItem('userType');
    if (isLoggedIn === 'true') {
      if (userType === 'patient') {
        window.location.href = ('/patient-dashboard');
      } else if (userType === 'doctor') {
        window.location.href = ('/doctor-dashboard');
      }
    }
  }, );

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Our Healthcare System
        </Typography>
        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.href = ('/existing-patient')}
            sx={{ marginRight: 2 }}
          >
            Existing Patient
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => window.location.href = ('/new-patient')}
          >
            New Patient
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
