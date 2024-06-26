import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Grid, ListItem, ListItemText, Paper } from '@mui/material';
import appointmentCounts from '../data/appointmentCounts.json';

const PatientDashboard = () => {
  const [patient, setPatient] = useState(JSON.parse(localStorage.getItem('currentPatient')));
  const [appointment, setAppointment] = useState(null);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const todaysAppointment = patient.appointments[today];
    setAppointment(todaysAppointment);
  }, [patient, today]);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('currentPatient');
    window.location.href = '/';
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        const newFile = {
          data: upload.target.result,
          date: new Date().toISOString().split('T')[0], // Get today's date in format YYYY-MM-DD.
          uploadedBy: 'patient',
        };
        const updatedFiles = [...patient.files, newFile];
        const updatedPatient = { ...patient, files: updatedFiles };
        setPatient(updatedPatient);
        localStorage.setItem('currentPatient', JSON.stringify(updatedPatient));

        const storedPatientsData = JSON.parse(localStorage.getItem('patientsData')) || [];
        const patientIndex = storedPatientsData.findIndex((p) => p.patientId === patient.patientId);
        if (patientIndex !== -1) {
          storedPatientsData[patientIndex] = updatedPatient;
          localStorage.setItem('patientsData', JSON.stringify(storedPatientsData));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateAppointment = () => {
    const appointmentCount = appointmentCounts[today] || 0;
    const newAppointmentNumber = appointmentCount + 1;
    const newAppointment = `APT-${newAppointmentNumber}`;
    const updatedAppointments = { ...patient.appointments, [today]: newAppointment };
    const updatedPatient = { ...patient, appointments: updatedAppointments };

    setPatient(updatedPatient);
    localStorage.setItem('currentPatient', JSON.stringify(updatedPatient));

    const storedPatientsData = JSON.parse(localStorage.getItem('patientsData')) || [];
    const patientIndex = storedPatientsData.findIndex((p) => p.patientId === patient.patientId);
    if (patientIndex !== -1) {
      storedPatientsData[patientIndex] = updatedPatient;
      localStorage.setItem('patientsData', JSON.stringify(storedPatientsData));
    }

    appointmentCounts[today] = newAppointmentNumber;
    localStorage.setItem('appointmentCounts', JSON.stringify(appointmentCounts));

    setAppointment(newAppointment);
  };

  if (!patient) {
    window.location.href = '/';
    return null;
  }

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
                          <a href={file.data} target="_blank" rel="noopener noreferrer">
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
          {appointment === 'N/A' || !appointment ? (
            <Button variant="contained" color="primary" onClick={handleGenerateAppointment}>
              Generate New Appointment
            </Button>
          ) : (
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

