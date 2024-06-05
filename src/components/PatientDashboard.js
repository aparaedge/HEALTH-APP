// src/components/PatientDashboard.js
import React, { useState, useEffect } from 'react';

const PatientDashboard = () => {
  const [reports, setReports] = useState([]);
  const [reportFile, setReportFile] = useState(null);

  useEffect(() => {
    const fetchReports = () => {
      // Simulate fetching reports
      setReports([{ url: 'sample-report-url-1' }, { url: 'sample-report-url-2' }]);
    };
    fetchReports();
  }, []);

  const handleUploadReport = () => {
    // Simulate file upload
    console.log('File uploaded:', reportFile);
    setReports([...reports, { url: 'new-report-url' }]);
  };

  const generateAppointmentNumber = () => {
    const appointmentNumber = `APT-${Math.floor(Math.random() * 100000)}`;
    alert(`Your appointment number is: ${appointmentNumber}`);
  };

  return (
    <div>
      <div>
        {reports.map((report, index) => (
          <div key={index}>
            <img src={report.url} alt="Report" />
          </div>
        ))}
      </div>
      <input type="file" onChange={(e) => setReportFile(e.target.files[0])} />
      <button onClick={handleUploadReport}>Upload New Report</button>
      <button onClick={generateAppointmentNumber}>Generate Appointment Number</button>
    </div>
  );
};

export default PatientDashboard;
