// src/components/PatientLogin.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const PatientLogin = () => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [isNewPatient, setIsNewPatient] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();

  const handleOTPRequest = () => {
    // Simulate OTP request
    console.log('OTP requested for mobile:', mobile);
    setVerificationId('123456'); // Simulated verification ID
  };

  const handleOTPVerify = () => {
    if (otp === '123456') { // Simulated OTP verification
      history.push('/patient-dashboard');
    } else {
      alert('Invalid OTP');
    }
  };

  const handleNewPatientRegistration = (e) => {
    e.preventDefault();
    console.log('New patient registered:', { name, email, mobile });
    handleOTPRequest();
  };

  return (
    <div>
      {isNewPatient ? (
        <form onSubmit={handleNewPatientRegistration}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile" />
          <button type="submit">Register</button>
        </form>
      ) : (
        <div>
          <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile" />
          <button onClick={handleOTPRequest}>Request OTP</button>
          <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="OTP" />
          <button onClick={handleOTPVerify}>Verify OTP</button>
        </div>
      )}
      <button onClick={() => setIsNewPatient(!isNewPatient)}>
        {isNewPatient ? "Existing Patient?" : "New Patient?"}
      </button>
    </div>
  );
};

export default PatientLogin;
