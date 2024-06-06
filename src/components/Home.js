// src/components/Home.js
import React, { useEffect } from 'react';

const Home = () => {

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn === 'true') {
      window.location.href = '/patient-dashboard';
    }
  }, []);

  return (
    <div>
      <button onClick={() => window.location.href = ('/existing-patient')}>Existing Patient</button>
      <button onClick={() => window.location.href = ('/new-patient')}>New Patient</button>
    </div>
  );
};

export default Home;
