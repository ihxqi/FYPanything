import React, { useState, useEffect } from "react";
import "./AdminCategories.css";
import AdminSidebarNavbar from "../AdminSidebarNavbar";
import AdminFooter from "../AdminFooter";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState({ id: null, category: "" });
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [newCategory, setNewCategory] = useState({ category: "" });
  const [showAddForm, setShowAddForm] = useState(false); // State to manage the visibility of the add category form
  const [searchQuery, setSearchQuery] = useState("");
  const [initialCategoryValue, setInitialCategoryValue] = useState("");

  const userSession = JSON.parse(localStorage.getItem("user_session")); //Can delete
  // console.log(userSession);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/get_categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      const categoriesArray = Object.keys(data.categories).map((category) => ({
        category,
      }));
      setCategories(categoriesArray);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const handleEdit = (category) => {
    // Set the editCategory state with the category to be edited
    setEditCategory({ id: category.id, category: category.category });
    // Set the initialCategoryValue state with the category's current value
    setInitialCategoryValue(category.category);
    // Show the edit popup
    setShowEditPopup(true);
  };

  const handleRemove = async (category) => {
    try {
      console.log(JSON.stringify(category));
      const response = await fetch("/delete_category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: category.category }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      console.log("Category with ID:", category, "successfully deleted");

      const updatedCategories = categories.filter(
        (cat) => cat.id !== category.id
      );
      // setCategories(updatedCategories);

      fetchCategories();
    } catch (error) {
      console.error("Error removing category:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(
      `Editing category ${editCategory.id}: Setting ${name} to ${value}`
    );
    setEditCategory({ ...editCategory, [name]: value });
  };

  const handleSearchInputChange = (e) => {
  const { value } = e.target;
  setSearchQuery(value); // Update the search query state as the user types
  
  // If the search query is empty, fetch all categories
  if (value === "") {
    fetchCategories();
  } else {
    // Otherwise, perform a search with the current search query
    handleSearch();
  }
};

  const handleSearch = () => {
    // Convert searchQuery to lowercase for case-insensitive search
    const query = searchQuery.toLowerCase().trim();
    
    // Filter categories based on search query
    const filteredCategories = categories.filter((item) =>
      item.category.toLowerCase().includes(query)
    );
  
    setCategories(filteredCategories);
  };

  const handleNewCategoryChange = (e) => {
    const { name, value } = e.target;
    console.log(`Setting new category ${name} to ${value}`);
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleSubmit = async () => {
    console.log(editCategory.category)
    console.log(initialCategoryValue)
    try {
      const response = await fetch("/edit_category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newCategory: editCategory.category,
          oldCategory: initialCategoryValue,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to edit category");
      }

      console.log("Category successfully edited");
      window.alert("Category changed")
      fetchCategories();
    } catch (error) {
      console.error("Error editing category:", error.message);
    }
  };

  const handleAddCategory = async () => {
    try {
      console.log("");
      console.log(newCategory.category);
      const response = await fetch("/add_categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: newCategory.category }),
      });

      if (!response.ok) {
        throw new Error("Failed to add category");
      }

      // If the category is successfully added on the backend,
      // update the local state with the new category
      const newCategoryId = categories.length + 1;
      const updatedCategories = [
        ...categories,
        { ...newCategory, id: newCategoryId },
      ];
      setCategories(updatedCategories);
      setNewCategory({ category: "" });
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding category:", error.message);
    }
  };

  return (
    <div className="admin-categories-container">
      <div className="admin-categories-header">
        <h1>Categories</h1>
      </div>
      <AdminSidebarNavbar />
      <div className="admin-categories-search-bar">
        <input
          type="text"
          placeholder="Search:"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button
                className="partner-management-search-bar-button"
                onClick={handleSearch}
              >
                Search
              </button>
      </div>
      <table className="admin-categories-table">
        <thead>
          <tr>
            <th>Categories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index}>
              <td>{category.category}</td>
              <td>
                <button
                  className="admin-categories-edit-button"
                  onClick={() => handleEdit(category)}
                >
                  EDIT
                </button>
                <button
                  className="admin-categories-remove-button"
                  onClick={() => handleRemove(category)}
                >
                  REMOVE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="admin-categories-add-categories-button"
        onClick={() => setShowAddForm(true)}
      >
        Add Category
      </button>

      {/* Popup for editing */}
      {showEditPopup && (
        <div className="admin-categories-edit-popup">
          <h2>Edit Category</h2>
          <div className="admin-categories-edit-form">
            <div>
              <label htmlFor="category">Category:</label>
              <input
                type="text"
                id="category"
                name="category"
                value={editCategory.category}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="admin-categories-edit-buttons">
            <button
              className="editPopup-save-category-button"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
            <button
              className="editPopup-cancel-category-button"
              onClick={() => setShowEditPopup(false)}
            >
              Cancel
            </button>
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
              <input
                type="text"
                id="newCategory"
                name="category"
                value={newCategory.category}
                onChange={handleNewCategoryChange}
              />
            </div>
          </div>
          <div className="admin-categories-add-categories-buttons">
            <button
              className="newPopup-save-category-button"
              onClick={handleAddCategory}
            >
              Save Category
            </button>
            <button
              className="newPopup-cancel-category-button"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <AdminFooter />
    </div>
  );
};

export default AdminCategories;
