// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DoctorLogin from './components/DoctorLogin';
import PatientLogin from './components/PatientLogin';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDashboard from './components/PatientDashboard';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/doctor-login" component={DoctorLogin} />
        <Route path="/patient-login" component={PatientLogin} />
        <Route path="/doctor-dashboard" component={DoctorDashboard} />
        <Route path="/patient-dashboard" component={PatientDashboard} />
        <Route path="/" exact component={HomePage} />
      </Switch>
    </Router>
  );
};

const HomePage = () => (
  <div>
    <h1>Welcome to the Health App</h1>
    <a href="/doctor-login">Doctor Login</a>
    <a href="/patient-login">Patient Login</a>
  </div>
);

export default App;
