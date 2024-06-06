// src/components/ExistingPatient.js
import React, { useState } from 'react';
import patientsData from '../data/patients.json';

const ExistingPatient = () => {
  const [mobile, setMobile] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const storedPatientsData = JSON.parse(localStorage.getItem('patientsData')) || patientsData;
    const patient = storedPatientsData.find(p => p.mobile === mobile);
    if (patient) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('currentPatient', JSON.stringify(patient));
      window.location.href = ('/patient-dashboard');
    } else {
      alert('Patient not found');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="tel"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        placeholder="Mobile Number"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default ExistingPatient;
