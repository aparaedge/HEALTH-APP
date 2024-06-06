// src/components/DoctorLogin.js
import React, { useState } from 'react';
import doctorsData from '../data/doctors.json';

const DoctorLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const doctor = doctorsData.find(doc => doc.username === username && doc.password === password);
    if (doctor) {
      localStorage.setItem('loggedInDoctor', 'true');
      window.location.href = ('/doctor-dashboard');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default DoctorLogin;
