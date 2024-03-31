import React, { useState } from 'react';
import './AdminCategories.css';
import AdminSidebarNavbar from "../AdminSidebarNavbar";
import AdminFooter from "../AdminFooter";

const data = [
  { id: 1, category: 'Clothes', subCategory: 'Blazer' },
  { id: 2, category: 'Clothes', subCategory: 'Jeans' },
  { id: 3, category: 'Clothes', subCategory: 'Shirts' },
  { id: 4, category: 'Clothes', subCategory: 'Dress' },
  { id: 5, category: 'Clothes', subCategory: 'Coats' },
  { id: 6, category: 'Accessories', subCategory: 'Rings' },
  { id: 7, category: 'Clothes', subCategory: 'Skirts' },
  { id: 8, category: 'Shoes', subCategory: 'Sneakers' },
  { id: 9, category: 'Clothes', subCategory: 'Shorts' },
  { id: 10, category: 'Accessories', subCategory: 'Earrings' },
];

const AdminCategories = () => {
  const [categories, setCategories] = useState(data);
  const [editCategory, setEditCategory] = useState({ id: null, category: '', subCategory: '' });
  const [showEditPopup, setShowEditPopup] = useState(false);

  const handleEdit = (id) => {
    const categoryToEdit = categories.find(category => category.id === id);
    setEditCategory(categoryToEdit);
    setShowEditPopup(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditCategory({ ...editCategory, [name]: value });
  };

  const handleSubmit = () => {
    const updatedCategories = categories.map(category => {
      if (category.id === editCategory.id) {
        return editCategory;
      }
      return category;
    });
    setCategories(updatedCategories);
    setShowEditPopup(false);
  };

  return (
    <div className="admin-categories-container">
      <div className="admin-categories-header">
        <h1>Categories</h1>
      </div>
      <AdminSidebarNavbar />
      <div className="admin-categories-search-bar">
        <input type="text" placeholder="Search:" />
        <button>Search</button>
      </div>
      <table className="admin-categories-table">
        <thead>
          <tr>
            <th>Categories</th>
            <th>Sub Categories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(item => (
            <tr key={item.id}>
              <td>{item.category}</td>
              <td>{item.subCategory}</td>
              <td>
                <button className="admin-categories-edit-button" onClick={() => handleEdit(item.id)}>EDIT</button>
                <button className="admin-categories-remove-button">REMOVE</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="admin-categories-add-categories-button">Add Categories</button>

      {/* Popup for editing */}
      {showEditPopup && (
        <div className="admin-categories-edit-popup">
          <h2>Edit Category</h2>
          <input type="text" name="category" value={editCategory.category} onChange={handleChange} />
          <input type="text" name="subCategory" value={editCategory.subCategory} onChange={handleChange} />
          <div>
            <button className="editPopup-save-content-button" onClick={handleSubmit}>Save Changes</button>
            <button className="editPopup-cancel-content-button" onClick={() => setShowEditPopup(false)}>Cancel</button>
          </div>
        </div>
      )}

      <AdminFooter />
    </div>
  );
};

export default AdminCategories;
