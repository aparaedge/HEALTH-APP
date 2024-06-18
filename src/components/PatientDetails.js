// src/PatientDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import patientsData from '../data/patients.json'; 
import SideNavbar from './SideNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faBookMedical, faEye, faDownload } from '@fortawesome/free-solid-svg-icons';
import FileUploadComponent from './fileUploadComponent';
import './PatientDetails.css'; 

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [files, setFiles] = useState([]);

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

  const handleShow = (fileData) => {
    window.open(fileData, '_blank');
  };

  const handleFileChange = (files) => {
    setFiles(files)
  }

  const handleFileUploadSubmit = async (selectedFiles) => { 
    const file = files[0];
    if (file && file instanceof Blob && patient)  {
      const reader = new FileReader();
      reader.onload = (upload) => {
        const newFile = {
          data: upload.target.result,
          date: new Date().toISOString().split('T')[0], // Get today's date in format YYYY-MM-DD
          uploadedBy: 'doctor',
          fileName: file.name
        };
        
        const updatedFiles = [...patient.files, newFile];
        const updatedPatient = { ...patient, files: updatedFiles };

        const patientIndex = patientsData.findIndex((p) => p.patientId === patient.patientId);
        patientsData[patientIndex] = updatedPatient;

        // Update localStorage
        localStorage.setItem('patientsData', JSON.stringify(patientsData));
        setPatient(updatedPatient);
        // setFileUploadError('');
      };
      reader.readAsDataURL(file);
    } else {
      console.error('Please select a file and patient first.');
    }
  }


  const handleDownload = (fileData) => {
    fetch(fileData, {
        mode : 'no-cors',
      })
        .then(response => response.blob())
        .then(blob => {
        let blobUrl = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.download = fileData.replace(/^.*[\\\/]/, '');
        a.href = blobUrl;
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
  };

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
       <div className='patient-records-content'>
        <div className="box-record">
            <div className='medical-details-box-record'> 
                <label className="record-name">Medical Details</label>
                <div className="text-field-container">
                    <label className="text-field-label">Age</label>
                    <input type="text" value={patient.age}
                    readOnly className="text-field-input" />
                </div>
                <div className="text-field-container">
                    <label className="text-field-label">Last Visit</label>
                    <input type="text" value={patient.lastVisit}
                    readOnly className="text-field-input" />
                </div>

                <div className="text-field-container">
                    <label className="text-field-label">Treatment</label>
                    <input type="text" value="Eye Checkup"
                    readOnly className="text-field-input" />
                </div>
            </div>
          
            <div className='medical-details-history-record'> 
                <label className="record-name">Medical History</label>
                {patient.files.map((file, index) => (
                    <div className="upload-file-container">
                       <FontAwesomeIcon className='icon-book' icon={faBookMedical} />
                       <span> {file["fileName"]}</span>
                       {/* <label> {patient.files[{index}]["fileName"]}</label> */}
                       <div className='history-action'> 
                           <FontAwesomeIcon className='icon-book' icon={faEye} onClick={() => handleShow(file["data"])}/>
                           <FontAwesomeIcon className='icon-book' icon={faDownload} onClick={() => handleDownload(file["data"])} />
                       </div>
                   </div>
                ))}
            </div>
        </div>

        <div className="box-record">
            <div className='medical-upload-box-record'> 
                <label className="record-name">Upload Prescription</label>
                <FileUploadComponent onFileUploadSubmit={handleFileUploadSubmit} onFileChange={handleFileChange}></FileUploadComponent>
            </div>
        </div>
       </div>
      </div> 
    </div>
  );
};

export default PatientDetails;
