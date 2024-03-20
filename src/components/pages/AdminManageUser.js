import React, { useState } from 'react';
import './AdminManageUser.css'; // Ensure the CSS file is named correctly
import UserNavbar from "../UserNavbar";


function AdminManageUsers() {
  const [searchTerm, setSearchTerm] = useState('');

  const logout = () => {
    console.log("Logged out");
    // Add logout logic or redirect here
  };

  const handleStatusChange = (status, id) => {
    console.log(`Status: ${status}, ID: ${id}`);
    // Add logic to handle status change
  };

  const handleSearch = () => {
    console.log(`Searching for: ${searchTerm}`);
    // Add search logic here
  };

  const handleFilter = () => {
    console.log("Filter clicked");
    // Add filter logic here
  };

  return (
    <div>
    <UserNavbar/>
    <div className="white-box"> {/* This div acts as the parent element */}
      <div className="container1">
        <div className="topnav">
        </div>
      </div>
      <hr />
    <div className="user-management-container">
      <div className="user-management-header">
        <h1>User Accounts</h1>
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
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Country</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Activate</th>
            <th>Suspend</th>
          </tr>
        </thead>
        <tbody>
        <tr>
      <td contentEditable="false">Howard Wolowitz</td>
      <td contentEditable="false">howard@gmail.com</td>
      <td contentEditable="false">12/12/1999</td>
      <td contentEditable="false">Singapore</td>
      <td contentEditable="false">409 Jurong East Street 32 </td>
      <td contentEditable="false">12345678</td>
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
    </div>
    </div>
  );
}

export default AdminManageUsers;
