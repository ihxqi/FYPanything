import React, { useState } from 'react';
import './UserCategories.css';
import logo from '../image/CollaFilter Logo.jpg'; // Make sure the path is correct
import UserSidebarNavbar from "../UserSidebarNavbar";
import UserFooter from "../UserFooter";

/*
const categories = ['Men Clothes', 'Women Clothes', 'Kids Clothes', 'Accessories', 'Shoes' ]; // Simplified categories array
*/

/*const categories = {
  'Men Clothes': [
    { name: 'Men Hoodie', image: 'path_to_image', url: 'product_link' },
    { name: 'Men Jeans', image: 'path_to_image', url: 'product_link' }
    // ...more products for men clothes
  ],
  'Women Clothes': [
    { name: 'Women Dress', image: 'path_to_image', url: 'product_link' },
    { name: 'Women Skirt', image: 'path_to_image', url: 'product_link' }
    // ...more products for women clothes
  ],
  'Kids Clothes': [
    { name: 'Kids T-Shirts', image: 'path_to_image', url: 'product_link' },
    { name: 'Kids Shorts', image: 'path_to_image', url: 'product_link' }
    // ...more products for kids clothes
  ],
  'Accessories': [
    { name: 'Accessories Jewellery', image: 'path_to_image', url: 'product_link' },
    { name: 'Accessories Hats', image: 'path_to_image', url: 'product_link' }
    // ...more products for accessories
  ],
}; */

function UserCategories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  // Function to update selected category and displayed products
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // setDisplayedProducts(categories[category]); // Update displayed products based on the selected category
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
                    {/* {Object.keys(categories).map((category, index) => (
                        <button 
                          key={index} 
                          className="UserCatcategory-button" 
                          onClick={() => handleCategoryClick(category)}
                        >
                          {category}
                        </button>
                    ))} */}
                    {/* Temporarily hardcoding categories for demonstration */}
                    <button 
                      className="UserCatcategory-button" 
                      onClick={() => handleCategoryClick('Men Clothes')}
                    >
                      Men Clothes
                    </button>
                    <button 
                      className="UserCatcategory-button" 
                      onClick={() => handleCategoryClick('Women Clothes')}
                    >
                      Women Clothes
                    </button>
                    <button 
                      className="UserCatcategory-button" 
                      onClick={() => handleCategoryClick('Kids Clothes')}
                    >
                      Kids Clothes
                    </button>
                    <button 
                      className="UserCatcategory-button" 
                      onClick={() => handleCategoryClick('Accessories')}
                    >
                      Accessories
                    </button>
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
