// src/components/NewPatient.js
import React, { useState } from 'react';
import patientsData from '../data/patients.json';

const NewPatient = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    const newPatient = {
      patientId: `patient${patientsData.length + 1}`,
      name,
      mobile,
      age,
      address,
      files: [],
      appointments: {}
    };

    // Mock saving to local storage
    const storedPatientsData = JSON.parse(localStorage.getItem('patientsData')) || patientsData;
    const updatedPatientsData = [...storedPatientsData, newPatient];
    const patient = updatedPatientsData.find(p => p.mobile === mobile);
    if (patient) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('currentPatient', JSON.stringify(patient));
    }
    

    alert('Registration successful!');
    window.location.href = ('/patient-dashboard');
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="tel"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        placeholder="Mobile Number"
        required
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
        required
      />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default NewPatient;
