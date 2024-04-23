import React, { useState, useEffect } from 'react';
import './UserCategories.css';
import logo from '../image/CollaFilter Logo.jpg'; // Make sure the path is correct
import UserSidebarNavbar from "../UserSidebarNavbar";
import UserFooter from "../UserFooter";


function UserCategories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [categories, setCategories] = useState([]);

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
      const categories = Object.keys(data.categories).map((category) => category);
      setCategories(categories);
      // Assuming the first category is selected by default
      if (categories.length > 0) {
        setSelectedCategory(categories[0]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  // Function to update selected category and fetch/display products
  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    console.log(category)
    try {
      console.log("Fetching")
      const response = await fetch(`/get_products_by_category/${category}`);
      console.log(response)
      console.log("fetched")
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setDisplayedProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  // Function to handle click on product
  const handleProductClick = (product) => {
    console.log(`Clicked on product:`, product);
    // Implement the logic to handle product click, such as navigating to product details
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
                          className="UserCatcategory-button" 
                          onClick={() => handleCategoryClick(category)}
                        >
                          {category}
                        </button>
                    ))}
                </div>
            </div>
            <div className="UserCatproduct-display">
              {/* Display the title of the selected category */}
              {selectedCategory && <h2 className="UserCatselected-category-header">{selectedCategory}</h2>}
              {displayedProducts.map((product, index) => (
                <div key={index} className="UserCatproduct-item" onClick={() => handleProductClick(product)}>
                  <div className="UserCatproduct-image-placeholder">
                    {/* Display the actual image, or a placeholder if not available */}
                    <img src={product.image} alt={product.name} />
                    <span>{product.name}</span>
                  </div>
                </div>
              ))}
            </div>
        </div>
        <UserFooter/>
    </div>
  );
}

export default UserCategories;
