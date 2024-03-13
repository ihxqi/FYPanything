import React, { useState } from 'react';
import './PartnerAllProducts.css';
import UserNavbar from "../UserNavbar";


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
      <UserNavbar/>
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
            <th>Blogshop Name</th>
            <th>Name</th>
            <th>Category</th>
            <th>Sub-Category</th>
            <th>Product Link</th>
            <th>Product Information</th>
          </tr>
        </thead>
        <tbody>
            <td contentEditable="false">PlayDress</td>
            <td contentEditable="false">Rectangular Dress</td>
            <td contentEditable="false">Apparel</td>
            <td contentEditable="false">Dress</td>
            <td contentEditable="false">www.playdress.com</td>
            <td contentEditable="false">Best for party</td>
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default AllProducts;
