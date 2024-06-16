// src/Card.js

import React from 'react';
import PropTypes from 'prop-types';
import './Card.css'; // Import CSS file for Card styling

const Card = ({ mainText, subText, icon }) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="card-header">
          <div className="card-icon">{icon}</div>
          <div className="card-main-text">{mainText}</div>
        </div>
        <div className="card-sub-text">{subText}</div>
      </div>
    </div>
  );
};

Card.propTypes = {
  mainText: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

export default Card;
