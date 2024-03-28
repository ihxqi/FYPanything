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
    <div className="white-box"> {/* This div acts as the parent element */}
   
      <hr />
    <div className="user-management-container">
      <div className="user-management-header">
        <h1>Blogshop Partners</h1>
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
    <AdminFooter />
    </div>
    
    </div>
   
  );
}

export default AdminManagePartners;
