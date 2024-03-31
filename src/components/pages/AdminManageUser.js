import React, { useState } from 'react';
import './AdminManageUser.css'; // Ensure the CSS file is named correctly
import AdminSidebarNavbar from "../AdminSidebarNavbar";
import AdminFooter from "../AdminFooter";


function AdminManageUsers() {
  const [searchTerm, setSearchTerm] = useState('');

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
    <div className="user-management-white-box"> {/* This div acts as the parent element */}
      
      <hr />
    <div className="user-management-container">
      <div className="user-management-header">
        <h1>User Accounts</h1>
        <div className="user-management-search-container">
          <label htmlFor="search">Search:</label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="user-management-filter-button" onClick={handleFilter}>Filter</button>
          <button className="user-management-search-bar-button" onClick={handleSearch}>Search</button>
        </div>
      </div>
      <table className="user-management-table">
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
      <td className="user-management-action-column">
    <input type="radio" id="activate1" name="managepartner1" value="activate" defaultChecked />
  </td>
  <td className="user-management-action-column">
    <input type="radio" id="suspend1" name="managepartner1" value="suspend" />
  </td>
    </tr>
        </tbody>
      </table>
    </div>
    <AdminFooter />
    </div>
   
    </div>
  );
}

export default AdminManageUsers;
