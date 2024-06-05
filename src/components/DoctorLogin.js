// src/components/DoctorLogin.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import doctorsData from '../data/doctors.json';

const DoctorLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    const doctor = doctorsData.find(doc => doc.username === username && doc.password === password);
    if (doctor) {
      history.push('/doctor-dashboard');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default DoctorLogin;
