import React, { useState } from 'react';
import './AdminManageUser.css'; // Ensure the CSS file is named correctly
import AdminSidebarNavbar from "../AdminSidebarNavbar";


function AdminManageUsers() {
  const [searchTerm, setSearchTerm] = useState('');

  const logout = () => {
    console.log("Logged out");
    // Add logout logic or redirect here
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
    <AdminSidebarNavbar/>
    <div className="white-box"> {/* This div acts as the parent element */}
      
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
      <td className="action-column">
    <input type="radio" id="activate1" name="managepartner1" value="activate" defaultChecked />
  </td>
  <td className="action-column">
    <input type="radio" id="suspend1" name="managepartner1" value="suspend" />
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
