import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, Alert, Grid, Paper, ListItem, ListItemText } from '@mui/material';
import patientsData from '../data/patients.json';
import appointmentCounts from '../data/appointmentCounts.json';

const DoctorDashboard = () => {
  const [patientId, setPatientId] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [fileUploadError, setFileUploadError] = useState('');
  const today = new Date().toISOString().split('T')[0];

  const totalPatients = patientsData.length;
  const totalAppointmentsToday = appointmentCounts[today] || 0;

  const handlePatientIdChange = (e) => {
    setPatientId(e.target.value);
  };

  const handleSearchPatient = () => {
    const patient = patientsData.find((p) => p.patientId === patientId);
    if (patient) {
      setSelectedPatient(patient);
    } else {
      setSelectedPatient(null);
      setPatientId('');
      alert('Patient ID not found');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && selectedPatient) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        const newFile = {
          data: upload.target.result,
          date: new Date().toISOString().split('T')[0], // Get today's date in format YYYY-MM-DD
          uploadedBy: 'doctor',
        };
        const updatedFiles = [...selectedPatient.files, newFile];
        const updatedPatient = { ...selectedPatient, files: updatedFiles };

        const patientIndex = patientsData.findIndex((p) => p.patientId === selectedPatient.patientId);
        patientsData[patientIndex] = updatedPatient;

        // Update localStorage
        localStorage.setItem('patientsData', JSON.stringify(patientsData));
        setSelectedPatient(updatedPatient);
        setFileUploadError('');
      };
      reader.readAsDataURL(file);
    } else {
      setFileUploadError('Please select a file and patient first.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInDoctor');
    window.location.href = '/';
  };

  useEffect(() => {
    if (!localStorage.getItem('loggedInDoctor')) {
      window.location.href = '/';
    }
  }, []);

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Doctor Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper>
              <Box p={2}>
                <Typography variant="body1" gutterBottom>
                  Total Patients: {totalPatients}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Total Appointments Today: {totalAppointmentsToday}
                </Typography>
                <div>
                </div>
                <TextField
                  label="Enter Patient ID"
                  variant="outlined"
                  value={patientId}
                  onChange={handlePatientIdChange}
                  fullWidth
                />
                <Button variant="contained" color="primary" onClick={handleSearchPatient} sx={{ mt: 2 }}>
                  Search Patient
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            {selectedPatient && (
              <Paper>
                <Box p={2}>
                  <Typography variant="h5" gutterBottom>
                    Patient Details
                  </Typography>
                  <Typography variant="body1">Name: {selectedPatient.name}</Typography>
                  <Typography variant="body1">Mobile: {selectedPatient.mobile}</Typography>
                  <Typography variant="body1">Age: {selectedPatient.age}</Typography>
                  <Typography variant="body1">Address: {selectedPatient.address}</Typography>

                  <Typography variant="h5" gutterBottom mt={3}>
                    Files
                  </Typography>
                  <ul>
                    {selectedPatient.files.map((file, index) => (
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

                  <Box mt={2}>
                    <input type="file" onChange={handleFileUpload} />
                    {fileUploadError && <Alert severity="error">{fileUploadError}</Alert>}
                  </Box>

                  <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 2 }}>
                    Logout
                  </Button>
                </Box>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DoctorDashboard;
