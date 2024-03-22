import React, { useState } from 'react';
import './AdminAllProduct.css';
import AdminSidebarNavbar from "../AdminSidebarNavbar";


const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Function to handle the filter action
  const handleFilter = () => {
    // Implement your filter logic here
    console.log('Filtering...');
  };

  const handleSearch = () => {
    // Implement your search logic here
    console.log('Searching for:', searchTerm);
  };

  return (
    <div>
      <AdminSidebarNavbar/>
    <div className="products-container">
      <h1 className="products-header">All Products</h1>
      <div className="search-container">
        <label htmlFor="search">Search:</label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleFilter}>Filter</button> {/* Filter button */}
        <button onClick={handleSearch}>Search</button>
      </div>
      <table className="products-table">
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
            <td contentEditable="true">Rectangular Dress</td>
            <td contentEditable="true">Apparel</td>
            <td contentEditable="true">Dress</td>
            <td contentEditable="true">$10</td>
            <td contentEditable="true">playdress.jpg</td>
            <td contentEditable="true">www.playdress.com</td>
            <td contentEditable="true">not Best for party</td>
            <td contentEditable="true">#hi #bye</td>
            <td>
              <button className="remove-button">REMOVE</button>
            </td>
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default AllProducts;