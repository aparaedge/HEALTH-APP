// src/PatientDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import patientsData from '../data/patients.json'; 
import SideNavbar from './SideNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';
import './PatientDetails.css'; 

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    // Simulate fetching patient data from patientsData based on id
    const foundPatient = patientsData.find(patient => patient.patientId === id);

    if (foundPatient) {
      setPatient(foundPatient);
    } else {
      setPatient(null);
    }
  }, [id]);

  if (!patient) {
    return <p>Loading...</p>; // You can replace with a proper loading component
  }

  // Function to get initials from patient's name
  const getInitials = (name) => {
    const names = name.split(' ');
    return names[0][0].toUpperCase() + (names.length > 1 ? names[names.length - 1][0].toUpperCase() : '');
  };

  return (
    <div>
      <SideNavbar />
      <div className='patientContents'>
        <div className="patient-details-content">
            <div className="patient-initials">
                <div className="initials-circle">{getInitials(patient.name)}</div>
                <div className="patient-info">
                    <h2>{patient.name}</h2>
                    <p className="patient-label">Patient</p>
                </div>
            </div>
            <div className="actions">
                <button className="support-button">
                    <FontAwesomeIcon icon={faHeadphones} />
                    Support
                </button>
            </div>
        </div>

      </div>
     
     
    </div>
  );
};

export default PatientDetails;
