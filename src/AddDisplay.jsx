import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'

const AddDisplay = () => {
  return (
    <div className="add-display-container">
      <Link to='/add' className="link">
        <div className="button">
          <p>Add Data</p>
        </div>
      </Link>
      <Link to="/display" className="link">
        <div className="button">
          <p>Display Data</p>
        </div>
      </Link>
    </div>
  );
}

export default AddDisplay;
