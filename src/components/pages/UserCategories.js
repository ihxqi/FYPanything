import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./UserCategories.css";
import UserSidebarNavbar from "../UserSidebarNavbar";
import UserFooter from "../UserFooter";

const apiUrl = "http://3.106.171.7:8000"; // Hosted Backend URL
// const apiUrl = "http://localhost:8000"; // Local Backend URL

function UserCategories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [blank, setRedirectToBlank] = useState(false);

  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem("user_session"));
    if (!userSession || userSession.role !== "User") {
      // Set redirectToLogin to true if user role is not admin or if user session is null
      setRedirectToBlank(true);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  if (blank) {
    return <Navigate to="/login" />;
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${apiUrl}/get_categories/`);
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      const categories = Object.keys(data.categories);
      setCategories(categories);
      // Assuming the first category is selected by default
      if (categories.length > 0) {
        setSelectedCategory(categories[0]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const fetchProductsByCategory = async (category) => {
    try {
      const response = await fetch(
        `${apiUrl}/get_products_by_category/${category}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setDisplayedProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchProductsByCategory(category);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleIncrement = async (product_id) => {
    try {
      const response = await fetch(`${apiUrl}/add_count/${product_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: product_id }),
      });

      if (!response.ok) {
        throw new Error("Failed to increment count");
      }
    } catch (error) {
      console.error("Error incrementing count:", error.message);
    }
  };

  return (
    <div>
      <UserSidebarNavbar />
      <div className="UserCatproducts-page">
        <div className="UserCatsidebar">
          <div className="UserCatcategories">
            <input
              className="UserCatsearch-input"
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {filteredCategories.sort().map((category, index) => (
              <button
                key={index}
                className={`UserCatcategory-button ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="UserCatproduct-display">
          {/* Display the title of the selected category */}
          {selectedCategory && (
            <h2 className="UserCatselected-category-header">
              {selectedCategory}
            </h2>
          )}
          <div className="UserCatproduct-grid">
            {displayedProducts.map((product, index) => (
              <div key={index} className="UserCatproduct-item">
                <img
                  src={`data:image/png;base64, ${product.imageFile}`}
                  alt="Product Image"
                  style={{ maxWidth: "200px", maxHeight: "250px" }}
                  onClick={() => handleProductClick(product)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>

            <img
              src={`data:image/png;base64, ${selectedProduct.imageFile}`}
              alt="Product Image"
              style={{ maxWidth: "200px", maxHeight: "250px" }}
            />
            <div className="UserCatHomeproduct-details">
              <div>Name: {selectedProduct.name}</div>
              <div>Price: {"$" + selectedProduct.price}</div>
              <div>Category: {selectedProduct.category}</div>
              <div>Description: {selectedProduct.description}</div>
              <div>
                <a
                  href={selectedProduct.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleIncrement(selectedProduct.product_id)}
                >
                  Link to shop
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      <UserFooter />
    </div>
  );
}

export default UserCategories;
