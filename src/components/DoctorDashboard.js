// src/components/DoctorDashboard.js
import React, { useState, useEffect } from 'react';
import patientsData from '../data/patients.json';
import appointmentCounts from '../data/appointmentCounts.json';

const DoctorDashboard = () => {
    const [patientId, setPatientId] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
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
          alert('Patient ID not found');
          setSelectedPatient(null);
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
              uploadedBy: 'doctor'
            };
            const updatedFiles = [...selectedPatient.files, newFile];
            const updatedPatient = { ...selectedPatient, files: updatedFiles };
    
            const patientIndex = patientsData.findIndex((p) => p.patientId === selectedPatient.patientId);
            patientsData[patientIndex] = updatedPatient;
            
            // Update localStorage
            localStorage.setItem('patientsData', JSON.stringify(patientsData));
            setSelectedPatient(updatedPatient);
          };
          reader.readAsDataURL(file);
        }
      };

    const handleLogout = () => {
        localStorage.removeItem('loggedInDoctor');
        window.location.href = ('/');
      };
    
      useEffect(() => {
        if (!localStorage.getItem('loggedInDoctor')) {
            window.location.href = ('/');
        }
      }, []);
    

  return (
    <div>
      <h1>Doctor Dashboard</h1>
      <p>Total Patients: {totalPatients}</p>
      <p>Total Appointments Today: {totalAppointmentsToday}</p>

      <div>
        <input
          type="text"
          placeholder="Enter Patient ID"
          value={patientId}
          onChange={handlePatientIdChange}
        />
        <button onClick={handleSearchPatient}>Search Patient</button>
      </div>

      {selectedPatient && (
        <div>
          <h2>Patient Details</h2>
          <p>Name: {selectedPatient.name}</p>
          <p>Mobile: {selectedPatient.mobile}</p>
          <p>Age: {selectedPatient.age}</p>
          <p>Address: {selectedPatient.address}</p>

          <h2>Files</h2>
          <ul>
            {selectedPatient.files.map((file, index) => (
              <li key={index}>
                <a href={file.data} target="_blank" rel="noopener noreferrer">
                  View File - Uploaded by {file.uploadedBy} on {file.date}
                </a>
              </li>
            ))}
          </ul>

          <input type="file" onChange={handleFileUpload} />

          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
