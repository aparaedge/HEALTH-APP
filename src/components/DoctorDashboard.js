// src/components/DoctorDashboard.js
import React, { useState } from 'react';

const DoctorDashboard = () => {
  const [patientId, setPatientId] = useState('');
  const [prescriptions, setPrescriptions] = useState([]);
  const [reportFile, setReportFile] = useState(null);

  const fetchPrescriptions = () => {
    // Simulate fetching prescriptions
    setPrescriptions([{ url: 'sample-prescription-url-1' }, { url: 'sample-prescription-url-2' }]);
  };

  const handleUploadPrescription = () => {
    // Simulate file upload
    console.log('File uploaded:', reportFile);
    fetchPrescriptions();
  };

  return (
    <div>
      <input type="text" value={patientId} onChange={(e) => setPatientId(e.target.value)} placeholder="Patient ID" />
      <button onClick={fetchPrescriptions}>Fetch Prescriptions</button>
      <div>
        {prescriptions.map((prescription, index) => (
          <div key={index}>
            <img src={prescription.url} alt="Prescription" />
          </div>
        ))}
      </div>
      <input type="file" onChange={(e) => setReportFile(e.target.files[0])} />
      <button onClick={handleUploadPrescription}>Upload New Prescription</button>
    </div>
  );
};

export default DoctorDashboard;
