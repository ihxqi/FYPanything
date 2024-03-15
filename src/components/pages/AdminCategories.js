import React, { useState } from 'react';
import './AdminCategories.css';
import Navbar from "../Navbar";
//import logo from '../image/CollaFilter Logo.jpg'

//<img src={logo} alt="CollaFilter Logo" className='iconStyle' />

const data = [
  { category: 'Clothes', subCategory: 'Blazer' },
  { category: 'Clothes', subCategory: 'Jeans' },
  { category: 'Clothes', subCategory: 'Shirts' },
  { category: 'Clothes', subCategory: 'Dress' },
  { category: 'Clothes', subCategory: 'Coats' },
  { category: 'Accessories', subCategory: 'Rings' },
  { category: 'Clothes', subCategory: 'Skirts' },
  { category: 'Shoes', subCategory: 'Sneakers' },
  { category: 'Clothes', subCategory: 'Shorts' },
  { category: 'Accessories', subCategory: 'Earrings' },
];

const AdminCategories = () => {
  return (
    <div className="categories-container">
      <Navbar />
      <h1>Categories</h1>
      <div className="search-bar">
        <input type="text" placeholder="Search:" />
        <button>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Categories</th>
            <th>Sub Categories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.category}</td>
              <td>{item.subCategory}</td>
              <td>
                <button className="edit-button">EDIT</button>
                <button className="remove-button">REMOVE</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">PAGE 1/10</div>
      <button className="add-categories-button">Add Categories</button>
    </div>
  );
}
export default AdminCategories;