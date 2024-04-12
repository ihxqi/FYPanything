import React, { useState, useEffect } from 'react';
import './AdminCategories.css';
import AdminSidebarNavbar from "../AdminSidebarNavbar";
import AdminFooter from "../AdminFooter";

/* const data = [
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
];*/

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState({ id: null, category: '', subCategory: '' });
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [newCategory, setNewCategory] = useState({ category: '', subCategory: '' });
  const [showAddForm, setShowAddForm] = useState(false); // State to manage the visibility of the add category form
  const [searchQuery, setSearchQuery] = useState('');

  const userSession = JSON.parse(localStorage.getItem('user_session')); //Can delete
  console.log(userSession)

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/get_categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      const categoriesArray = Object.entries(data.categories).map(([category, subCategories]) => ({
        category,
        subCategory: subCategories
      }));
      setCategories(categoriesArray);
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    }
  };


  const handleEdit = (id) => {
    const categoryToEdit = categories.find(category => category.id === id);
    console.log('Editing category:', categoryToEdit);
    setEditCategory(categoryToEdit);
    setShowEditPopup(true);
  };
  
  const handleRemove = (id) => {
    const updatedCategories = categories.filter(category => category.id !== id);
    console.log('Removing category with ID:', id);
    setCategories(updatedCategories);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Editing category ${editCategory.id}: Setting ${name} to ${value}`);
    setEditCategory({ ...editCategory, [name]: value });
  };
  
  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
  };
  
  const handleSearch = () => {
    // Filter categories based on search query
    const filteredCategories = categories.filter(item =>
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log('Filtered categories:', filteredCategories);
    setCategories(filteredCategories);
  };
  
  const handleNewCategoryChange = (e) => {
    const { name, value } = e.target;
    console.log(`Setting new category ${name} to ${value}`);
    setNewCategory({ ...newCategory, [name]: value });
  };
  
  const handleSubmit = () => {
    const updatedCategories = categories.map(category => {
      if (category.id === editCategory.id) {
        console.log('Updating category:', editCategory);
        return editCategory;
      }
      return category;
    });
    console.log('Updated categories:', updatedCategories);
    setCategories(updatedCategories);
    setShowEditPopup(false);
  };
  
  const handleAddCategory = () => {
    if (newCategory.category.trim() !== '' && newCategory.subCategory.trim() !== '') {
      const newCategoryId = categories.length + 1; // Generate a unique ID for the new category
      console.log('Adding new category:', { ...newCategory, id: newCategoryId });
      const updatedCategories = [...categories, { ...newCategory, id: newCategoryId }];
      setCategories(updatedCategories);
      setNewCategory({ category: '', subCategory: '' }); // Clear form inputs after adding category
      setShowAddForm(false); // Hide the add category form after adding a category
    }
  };
  
  return (
    <div className="admin-categories-container">
      <div className="admin-categories-header">
        <h1>Categories</h1>
      </div>
      <AdminSidebarNavbar />
      <div className="admin-categories-search-bar">
      <input type="text" placeholder="Search:" value={searchQuery} onChange={handleSearchInputChange} />
        <button onClick={handleSearch}>Search</button>
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
  {categories.map((category, categoryIndex) => (
    <React.Fragment key={categoryIndex}>
      {category.subCategory.map((subCategory, subCategoryIndex) => (
        <tr key={`${category.category}-${subCategoryIndex}`}>
          <td>{category.category}</td>
          <td>{subCategory}</td>
          <td>
            <button className="admin-categories-edit-button" onClick={() => handleEdit(category.id)}>EDIT</button>
            <button className="admin-categories-remove-button" onClick={() => handleRemove(category.id)}>REMOVE</button>
          </td>
        </tr>
      ))}
    </React.Fragment>
  ))}
</tbody>

      </table>
      <button className="admin-categories-add-categories-button" onClick={() => setShowAddForm(true)}>Add Category</button>

      {/* Popup for editing */}
      {showEditPopup && (
  <div className="admin-categories-edit-popup">
    <h2>Edit Category</h2>
    <div className="admin-categories-edit-form">
      <div>
        <label htmlFor="category">Category:</label>
        <input type="text" id="category" name="category" value={editCategory.category} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="subCategory">Sub Category:</label>
        <input type="text" id="subCategory" name="subCategory" value={editCategory.subCategory} onChange={handleChange} />
      </div>
    </div>
    <div className="admin-categories-edit-buttons">
      <button className="editPopup-save-category-button" onClick={handleSubmit}>Save Changes</button>
      <button className="editPopup-cancel-category-button" onClick={() => setShowEditPopup(false)}>Cancel</button>
          </div>
        </div>
      )}

       {/* Form for adding new category */}
       {showAddForm && (
        <div className="admin-categories-new-popup">
          <h2>Add Category</h2>
          <div className="admin-categories-new-form">
            <div>
              <label htmlFor="newCategory">Category:</label>
              <input type="text" id="newCategory" name="category" value={newCategory.category} onChange={handleNewCategoryChange} />
            </div>
            <div>
              <label htmlFor="newSubCategory">Sub Category:</label>
              <input type="text" id="newSubCategory" name="subCategory" value={newCategory.subCategory} onChange={handleNewCategoryChange} />
            </div>
          </div>
          <div className="admin-categories-add-categories-buttons">
            <button className="newPopup-save-category-button" onClick={handleAddCategory}>Add Category</button>
            <button className="newPopup-cancel-category-button" onClick={() => setShowAddForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      <AdminFooter />
    </div>
  );
};

export default AdminCategories;
