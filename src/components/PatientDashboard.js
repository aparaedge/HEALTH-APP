// src/components/PatientDashboard.js
import React, { useState, useEffect} from 'react';
import appointmentCounts from '../data/appointmentCounts.json';

const PatientDashboard = () => {
    const [patient, setPatient] = useState(JSON.parse(localStorage.getItem('currentPatient')));
    console.log(patient)
    const [appointment, setAppointment] = useState(null);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const todaysAppointment = patient.appointments[today];
    setAppointment(todaysAppointment);
  }, [patient, today]);
  

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('currentPatient');
    window.location.href = ('/');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        const newFile = {
          data: upload.target.result,
          date: new Date().toISOString().split('T')[0], // Get today's date in format YYYY-MM-DD.
          uploadedBy: 'patient'
        };
        const updatedFiles = [...patient.files, newFile];
        const updatedPatient = { ...patient, files: updatedFiles };
        setPatient(updatedPatient);
        localStorage.setItem('currentPatient', JSON.stringify(updatedPatient));
        
        const storedPatientsData = JSON.parse(localStorage.getItem('patientsData')) || [];
        const patientIndex = storedPatientsData.findIndex(p => p.patientId === patient.patientId);
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
    const patientIndex = storedPatientsData.findIndex(p => p.patientId === patient.patientId);
    if (patientIndex !== -1) {
      storedPatientsData[patientIndex] = updatedPatient;
      localStorage.setItem('patientsData', JSON.stringify(storedPatientsData));
    }

    appointmentCounts[today] = newAppointmentNumber;
    localStorage.setItem('appointmentCounts', JSON.stringify(appointmentCounts));

    setAppointment(newAppointment);
  };

  if (!patient) {
    window.location.href = ('/');
    return null;
  }

  return (
    <div>
      <h1>Welcome, {patient.name}</h1>
      <p>Mobile: {patient.mobile}</p>
      <p>Age: {patient.age}</p>
      <p>Address: {patient.address}</p>

      <h2>Files</h2>
      <ul>
        {patient.files.map((file, index) => (
          <li key={index}>
            <a href={file.data} target="_blank" rel="noopener noreferrer">
              View File - Uploaded by {file.uploadedBy} on {file.date}
            </a>
          </li>
        ))}
      </ul>

      <input type="file" onChange={handleFileUpload} />

      <h2>Today's Appointment</h2>
      {appointment === 'N/A' || !appointment ? (
        <button onClick={handleGenerateAppointment}>Generate New Appointment</button>
      ) : (
        <p>Appointment Number: {appointment}</p>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default PatientDashboard;
