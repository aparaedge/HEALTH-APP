// src/Dashboard.js

import React, { useState, useEffect } from 'react';
import SideNavbar from './SideNavbar'; // Import the SideNavbar component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faUser, faBell, faHeadphones } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons for today's appointment and total patients
import './Dasboard.css'; // Import CSS file for Dashboard styling
import Card from './Card';
import patientsData from '../data/patients.json';
import appointmentCounts from '../data/appointmentCounts.json';
import SearchBar from './searchBar';

const Dashboard = () => {
  const [patientId, setPatientId] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [fileUploadError, setFileUploadError] = useState('');
  const today = new Date().toISOString().split('T')[0];

  const totalPatients = patientsData.length;
  const totalAppointmentsToday = appointmentCounts[today] || 0;



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
    <div className="dashboard-container">
      <SideNavbar />
      <div className="content">
        <div className="header">
          <div className="welcome-message">Welcome back</div>
          <div className="actions">
            <button className="notification-button">
              <FontAwesomeIcon icon={faBell} />
            </button>
            <button className="support-button">
              <FontAwesomeIcon icon={faHeadphones} />
              Support
            </button>
          </div>
        </div>
        <div className="cards-container">
          <Card
            mainText={totalAppointmentsToday}
            subText="Today's Appointments"
            icon={<FontAwesomeIcon icon={faCalendarDay} />}
          />
          <Card
            mainText={totalPatients}
            subText="Total Patients"
            icon={<FontAwesomeIcon icon={faUser} />}
          />
         </div>     
      </div>
      <SearchBar patients={patientsData} />
        
        
    </div>
  );
};

export default Dashboard;
