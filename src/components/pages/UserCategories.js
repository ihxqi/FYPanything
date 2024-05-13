import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    fetchCategories();
  }, []);

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
      console.log(data);
      console.log(data.products);
      setDisplayedProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchProductsByCategory(category);
    console.log("clicked on category:", category);
  };

  const handleProductClick = (product) => {
    console.log(`Clicked on product:`, product);
    // Implement the logic to handle product click, such as navigating to the product details
  };

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <table className="UserCatproduct-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Link</th>
                <th>Description</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts.map((product, index) => (
                <tr key={index} onClick={() => handleProductClick(product)}>
                  <td>{product.name}</td>
                  <td style={{ width: "80px" }}>{product.price}</td>
                  <td>
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link to shop
                    </a>
                  </td>
                  <td>{product.description}</td>
                  <td>
                    <img
                      src={`data:image/png;base64, ${product.imageFile}`}
                      alt="Product Image"
                      style={{ maxWidth: "200px", maxHeight: "200px" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <UserFooter />
    </div>
  );
}

export default UserCategories;
