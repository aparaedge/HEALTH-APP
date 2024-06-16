// src/SideNavbar.js
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faCalendarAlt, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Import necessary FontAwesome icons
import './SideNavbar.css';

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="toggle-button" onClick={toggleNavbar}>
        ☰
      </button>
      <div className={`side-navbar ${isOpen ? 'open' : ''}`}>
          <div className="logo-company">
            <img src="logo.png" alt="Logo" className="logo" />
            <div className="company-info">
              <div className="company-name">ABC Clinic</div>
              <div className="divider"></div>
            </div>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <NavLink to="/dashboard" activeClassName="active">
                <FontAwesomeIcon icon={faTachometerAlt} />
                <span className="menu-text">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/patients" activeClassName="active">
                <FontAwesomeIcon icon={faUsers} />
                <span className="menu-text">Patients</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/appointments" activeClassName="active">
                <FontAwesomeIcon icon={faCalendarAlt} />
                <span className="menu-text">Appointments</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings" activeClassName="active">
                <FontAwesomeIcon icon={faCog} />
                <span className="menu-text">Settings</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="logout">
          <button className="logout-button">
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span className="menu-text"> Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SideNavbar;
