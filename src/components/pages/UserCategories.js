import React, { useState } from 'react';
import './UserCategories.css';
import logo from '../image/CollaFilter Logo.jpg'; // Make sure the path is correct
import UserSidebarNavbar from "../UserSidebarNavbar";
import UserFooter from "../UserFooter";

/*
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
]; */

const categories = {
  'Men Clothes': [
    { subCategory: 'Hoodies', items: Array(10).fill({ name: 'Men Hoodie', image: 'path_to_image', url: 'product_link' }) },
    { subCategory: 'Jeans', items: Array(10).fill({ name: 'Men Jeans', image: 'path_to_image', url: 'product_link' }) }
    // ...more subcategories for men clothes
  ],
  'Women Clothes': [
    { subCategory: 'Dresses', items: Array(10).fill({ name: 'Women Dress', image: 'path_to_image', url: 'product_link' }) },
    { subCategory: 'Skirts', items: Array(10).fill({ name: 'Women Skirt', image: 'path_to_image', url: 'product_link' }) }
    // ...more subcategories for women clothes
  ],
  'Kids Clothes': [
    { subCategory: 'T-Shirts', items: Array(10).fill({ name: 'Kids T-Shirts', image: 'path_to_image', url: 'product_link' }) },
    { subCategory: 'Shorts', items: Array(10).fill({ name: 'Kids Shorts', image: 'path_to_image', url: 'product_link' }) }
    // ...more subcategories for women clothes
  ],
  'Accessories': [
    { subCategory: 'Jewellery', items: Array(10).fill({ name: 'Accessories Jewellery', image: 'path_to_image', url: 'product_link' }) },
    { subCategory: 'Hats', items: Array(10).fill({ name: 'Accessories Hats', image: 'path_to_image', url: 'product_link' }) }
    // ...more subcategories for women clothes
  ],
};

function UserCategories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  // Function to update selected category and displayed products
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setDisplayedProducts(categories[category]); // Update displayed products based on the selected category
  };

  // Function to handle click on product
  const handleProductClick = (subCategory, index) => {
    console.log(`Clicked on product ${index} in ${subCategory}`);
    // Implement the logic to handle product click, such as navigating to product details
  };

  return (
    <div>
        <UserSidebarNavbar />
        <div className="UserCatproducts-page">
            <div className="UserCatsidebar">
                <div className="UserCatcategories">
                    {Object.keys(categories).map((category, index) => (
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
              {displayedProducts.map((subCategory, index) => (
                <div key={index} className="UserCatproduct-row">
                  <h3>{subCategory.subCategory}</h3>
                  <div className="UserCatproduct-list">
                    {subCategory.items.map((item, i) => (
                      <button 
                        key={i} 
                        className="UserCatproduct-item" 
                        onClick={() => handleProductClick(subCategory.subCategory, i)}
                      >
                        <div className="UserCatproduct-image-placeholder">
                          {/* Display the actual image, or a placeholder if not available */}
                          <img src={item.image} alt={item.name} />
                          <span>{item.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
        </div>
        <UserFooter/>
    </div>
  );
}


/*function UserCategories() {
  const [categories, setCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    // Function to fetch categories and their products
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories'); //get actual database
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setDisplayedProducts(categories[category]);
  };

  // Rest of the component's render logic
}*/

export default UserCategories;

