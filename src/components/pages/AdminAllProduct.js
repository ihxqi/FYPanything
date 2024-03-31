import React, { useState } from 'react';
import './AdminAllProduct.css'; // Import the CSS file
import AdminSidebarNavbar from "../AdminSidebarNavbar";
import AdminFooter from "../AdminFooter";

const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilter = () => {
    console.log('Filtering...');
  };

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  return (
    <div>
      <AdminSidebarNavbar />
      <div className="admin-products-container">
        <h1 className="admin-products-header">All Products</h1>
        <div className="admin-products-search-container">
          <label htmlFor="search">Search:</label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="admin-products-filter-button" onClick={handleFilter}>Filter</button>
          <button className="admin-products-search-button" onClick={handleSearch}>Search</button>
        </div>
        <table className="admin-products-table">
          <thead>
            <tr>            
              <th>Name</th>
              <th>Category</th>
              <th>Sub-Category</th>
              <th>Price</th>
              <th>Image</th>
              <th>Product Link</th>
              <th>Product Information</th>
              <th>Tags</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td contentEditable="true">Night Dress</td>
              <td contentEditable="true">Apparel</td>
              <td contentEditable="true">Dress</td>
              <td contentEditable="true">$10</td>
              <td contentEditable="true">playdress.jpg</td>
              <td contentEditable="true">www.playdress.com</td>
              <td contentEditable="true">not Best for party</td>
              <td contentEditable="true">#hi #bye</td>
              <td>
                <button className="admin-products-remove-button">REMOVE</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <AdminFooter />
    </div>
  );
};

export default AllProducts;
