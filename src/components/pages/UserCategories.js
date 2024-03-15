import React from 'react';
import './UserCategories.css';
import logo from '../image/CollaFilter Logo.jpg'; // Make sure the path is correct
import UserNavbar from "../UserNavbar";

const categories = ['Men Clothes', 'Women Clothes', 'Kids Clothes', 'Accessories', 'Shoes' ]; // Simplified categories array
const products = [
  { subCategory: 'Hoodies', items: Array(10).fill(0) },
  { subCategory: 'Jeans', items: Array(10).fill(0) },
  { subCategory: 'Blouse', items: Array(10).fill(0) },
  { subCategory: 'T-Shirts', items: Array(10).fill(0) }, // Added subcategory
  { subCategory: 'Shorts', items: Array(10).fill(0) }, // Added subcategory
  { subCategory: 'Dresses', items: Array(10).fill(0) }, // Added subcategory
  { subCategory: 'Skirts', items: Array(10).fill(0) }, // Added subcategory
  { subCategory: 'Sneakers', items: Array(10).fill(0) }, // Subcategory under 'Shoes'
  { subCategory: 'Boots', items: Array(10).fill(0) }, // Subcategory under 'Shoes'
  { subCategory: 'Gym Clothes', items: Array(10).fill(0) }, // Subcategory under 'Sportswear'
  { subCategory: 'Swimwear', items: Array(10).fill(0) }, // Subcategory under 'Sportswear'
  { subCategory: 'Suits', items: Array(10).fill(0) }, // Subcategory under 'Formal'
  { subCategory: 'Evening Gowns', items: Array(10).fill(0) }, // Subcategory under 'Formal'
  // ... you can continue adding as needed
];

function UserCategories() {
  return (
    <div>
        < UserNavbar />
    <div className="products-page">
      <div className="sidebar">
        <button className="sidebar-toggle">☰</button>
        <div className="categories">
          {categories.map((category, index) => (
            <button key={index} className="category-button">{category}</button>
          ))}
        </div>
      </div>
      <div className="product-display">
        {products.map((subCategory, index) => (
          <div key={index} className="product-row">
            <h3>{subCategory.subCategory}</h3>
            <div className="product-list">
              {subCategory.items.map((_, i) => (
                <div key={i} className="product-item"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default UserCategories;

