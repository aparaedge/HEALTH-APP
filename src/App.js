import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import ExistingPatient from './components/ExistingPatient';
import NewPatient from './components/NewPatient';
import PatientDashboard from './components/PatientDashboard';
import DoctorLogin from './components/DoctorLogin';
import DoctorDashboard from './components/DoctorDashboard';

const App = () => {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  const isDoctorLoggedIn = localStorage.getItem('loggedInDoctor') === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/" element={!isLoggedIn ? <Home /> : <Navigate to="/patient-dashboard" />} />
        <Route path="/existing-patient" element={!isLoggedIn ? <ExistingPatient /> : <Navigate to="/patient-dashboard" />} />
        <Route path="/new-patient" element={!isLoggedIn ? <NewPatient /> : <Navigate to="/patient-dashboard" />} />
        <Route path="/patient-dashboard" element={isLoggedIn ? <PatientDashboard /> : <Navigate to="/" />} />
        <Route path="/doctor-login" element={!isDoctorLoggedIn ? <DoctorLogin /> : <Navigate to="/doctor-dashboard" />} />
        <Route path="/doctor-dashboard" element={isDoctorLoggedIn ? <DoctorDashboard /> : <Navigate to="/doctor-login" />} />
        {/* Other routes will be added later */}
      </Routes>
    </Router>
  );
};

export default App;
