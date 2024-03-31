import React, { useState } from 'react';
import './AdminManagePartner.css'; // Ensure the CSS file is named correctly
import AdminSidebarNavbar from "../AdminSidebarNavbar";
import AdminFooter from "../AdminFooter";

function AdminManagePartners() {
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
    <div className="partner-management-white-box"> {/* This div acts as the parent element */}
   
      <hr />
    <div className="partner-management-container">
      <div className="partner-management-header">
        <h1>Blogshop Partners</h1>
        <div className="partner-management-search-container">
          <label htmlFor="search">Search:</label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="partner-management-filter-button" onClick={handleFilter}>Filter</button>
          <button className="partner-management-search-bar-button" onClick={handleSearch}>Search</button>
        </div>
    
      </div>
      <table className="partner-management-table">
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
          <td contentEditable="false">Example Partner</td>
          <td contentEditable="false">example.com</td>
          <td contentEditable="false">Fashion</td>
          <td className="partner-management-action-column">
    <input type="radio" id="activate1" name="managepartner1" value="activate" defaultChecked />
  </td>
  <td className="partner-management-action-column">
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

export default AdminManagePartners;
