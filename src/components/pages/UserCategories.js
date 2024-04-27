import React, { useState, useEffect } from "react";
import "./UserCategories.css";
import UserSidebarNavbar from "../UserSidebarNavbar";
import UserFooter from "../UserFooter";

function UserCategories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryImage, setCategoryImage] = useState(null);

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
      const response = await fetch(`/get_products_by_category/${category}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setDisplayedProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory);
      // Assuming you have an endpoint to fetch the image URL of the category
      fetchCategoryImage(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchCategoryImage = async (category) => {
    try {
      // Fetch the base64-encoded image string for the selected category
      const response = await fetch(`/get_category_image/${category}`);
      if (!response.ok) {
        throw new Error("Failed to fetch category image");
      }
      const data = await response.json();
      setCategoryImage(data.image); // Assuming the response contains the base64-encoded image string
    } catch (error) {
      console.error("Error fetching category image:", error.message);
    }
  };
  

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleProductClick = (product) => {
    console.log(`Clicked on product:`, product);
    // Implement the logic to handle product click, such as navigating to the product details
  };

  return (
    <div>
      <UserSidebarNavbar />
      <div className="UserCatproducts-page">
        <div className="UserCatsidebar">
          <div className="UserCatcategories">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`UserCatcategory-button ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
          {categoryImage && (
            <img src={categoryImage} alt={selectedCategory} />
          )}
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
              <div
                key={index}
                className="UserCatproduct-item"
                onClick={() => handleProductClick(product)}
              >
                <img src={product.imageFile} alt={product.name} className="UserCatproduct-image" />
                <p className="UserCatproduct-name">{product.name}</p>
                <p className="UserCatproduct-price">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <UserFooter />
    </div>
  );
}

export default UserCategories;
