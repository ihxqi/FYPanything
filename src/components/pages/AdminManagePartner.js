import React, { useState } from 'react';
import './AdminManagePartner.css';

function AdminManagePartner() {
  const [searchTerm, setSearchTerm] = useState('');

  const logout = () => {
    console.log("Logged out");
    // Use React Router for navigation or your preferred method
  };
  
  const handleStatusChange = (status, id) => {
    console.log(`Status: ${status}, ID: ${id}`);
    // Implement the status change logic
  };
  
  const handleSearch = () => {
    console.log(`Searching for: ${searchTerm}`);
    // Implement the search logic
  };

  const handleFilter = () => {
    console.log("Filter clicked");
    // Implement the filter logic
  };

  return (
    <div className="white-box"> {/* This div acts as the parent element */}
      <h2>Blogshop Partners</h2>
      <div className="managepartner-container">
        <div className="search-container">
          <label htmlFor="search">Search:</label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleFilter}>Filter</button>
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <table id="profileTable" className="CMtable" style={{ width: '100%' }}>
      <thead>
    <tr>
      <th>Blogshop Owner</th>
      <th>URL</th>
      <th>Category</th>
      <th>Activate</th>
      <th>Suspend</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td contentEditable="false">Love clothes</td>
      <td contentEditable="false">URL data</td>
      <td contentEditable="false">Category data</td>
      <td>
        <button 
          className="approve-btn"
          onClick={() => handleStatusChange('approve', 1)} // Replace with actual handler
        >
          Activate
        </button>
      </td>
      <td>
        <button 
          className="reject-btn"
          onClick={() => handleStatusChange('reject', 1)} // Replace with actual handler
        >
          Suspend
        </button>
      </td>
    </tr>
  </tbody>
      </table>
    </div>
  );
}

export default AdminManagePartner;



