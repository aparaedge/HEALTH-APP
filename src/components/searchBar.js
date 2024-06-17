// src/SearchBar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './searchBar.css';

function SearchBar({ patients }) {
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();

  const handleInput = (e) => {
    setSearchVal(e.target.value);
  };

  const handleClearBtn = () => {
    setSearchVal('');
  };

  const handlePatientClick = (patientId) => {
    navigate(`/patients/${patientId}`);
  };

  const filteredPatients = patients.filter((patient) => {
    return (
      patient.patientId.toLowerCase().includes(searchVal.toLowerCase()) ||
      patient.name.toLowerCase().includes(searchVal.toLowerCase())
    );
  });

  return (
    <div className='container'>
      <div className='input-wrap'>
        <i className="fas fa-search"></i>
        <input 
          onChange={handleInput}
          value={searchVal}
          type="text" 
          id="product-search" 
          placeholder="Search Patient ID or Name"
        />
        <i 
          onClick={handleClearBtn}
          className="fas fa-times"
        ></i>
      </div>
      {searchVal && (
        <div className="results-wrap">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <div 
                key={patient.patientId} 
                className='patient-details'
                onClick={() => handlePatientClick(patient.patientId)}
              >
                <p><span>ID:</span> {patient.patientId}</p>
                <p><span>Name:</span> {patient.name}</p>
              </div>
            ))
          ) : (
            <p>No matching patients found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
