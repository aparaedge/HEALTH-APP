import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Grid, ListItem, ListItemText, Paper } from '@mui/material';
import axios from 'axios';

const PatientDashboard = () => {
  const [patient, setPatient] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const storedPatient = JSON.parse(localStorage.getItem('currentPatient'));
        if (storedPatient) {
          setPatient(storedPatient);
          const todaysAppointment = storedPatient.appointments[today];
          setAppointment(todaysAppointment);
        } else {
          // Redirect to login if no patient data found
          window.location.href = '/';
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
        // Handle error as needed (e.g., show error message)
      }
    };

    fetchPatientData();
  }, [today]);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('currentPatient');
    window.location.href = '/';
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (upload) => {
        try {
          const fileUrl = upload.target.result; // Assuming this is a URL or reference to where the file is stored
          const response = await axios.post('http://localhost:3000/api/patients/upload-file', {
            patientId: patient.patientId,
            url: fileUrl, // Send the URL instead of the full file data
            uploadedBy: 'patient',
          });

          const updatedPatient = response.data;
          setPatient(updatedPatient);
          localStorage.setItem('currentPatient', JSON.stringify(updatedPatient));
        } catch (error) {
          console.error('Error uploading file:', error);
          // Handle error as needed (e.g., show error message)
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateAppointment = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/patients/generate-appointment', {
        patientId: patient.patientId,
      });

      const { appointmentNumber } = response.data;
      const updatedPatient = { ...patient, appointments: { ...patient.appointments, [today]: appointmentNumber } };
      setPatient(updatedPatient);
      localStorage.setItem('currentPatient', JSON.stringify(updatedPatient));
      setAppointment(appointmentNumber);
    } catch (error) {
      console.error('Error generating appointment:', error);
      // Handle error as needed (e.g., show error message)
    }
  };

  if (!patient) {
    return null; // Render loading spinner or redirect logic could be implemented here
  }

  // Check if there is already an appointment for today
  const showGenerateButton = !appointment;

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {patient.name}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper>
              <Box p={2}>
                <Typography variant="body1">Mobile: {patient.mobile}</Typography>
                <Typography variant="body1">Age: {patient.age}</Typography>
                <Typography variant="body1">Address: {patient.address}</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper>
              <Box p={2}>
                <Typography variant="h5" gutterBottom>
                  Files
                </Typography>
                <ul>
                  {patient.files.map((file, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={
                          <a href={file.url} target="_blank" rel="noopener noreferrer">
                            View File - Uploaded by {file.uploadedBy} on {file.date}
                          </a>
                        }
                      />
                    </ListItem>
                  ))}
                </ul>
                <input type="file" onChange={handleFileUpload} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="h5" gutterBottom>
            Today's Appointment
          </Typography>
          {showGenerateButton && (
            <Button variant="contained" color="primary" onClick={handleGenerateAppointment}>
              Generate New Appointment
            </Button>
          )}
          {!showGenerateButton && (
            <Typography variant="body1">Appointment Number: {appointment}</Typography>
          )}
        </Box>
        <Box mt={3}>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PatientDashboard;
