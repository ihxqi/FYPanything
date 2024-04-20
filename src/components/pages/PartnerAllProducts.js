import React, { useState, useEffect } from "react";
import "./PartnerAllProducts.css";
import PartnerSidebarNavbar from "../PartnerSidebarNavbar";
import PartnerFooter from "../PartnerFooter";
import Select from "react-select"; // Import React-Select

const PartnerAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [editMode, setEditMode] = useState(null); // State to track edit mode

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  const [editProduct, setEditProduct] = useState({
    id: null,
    productName: "",
    category: "",
    //subCategory: "",
    price: "",
    image: "",
    productLink: "",
    productInformation: "",
    tags: "",
  });

  const fetchProducts = async () => {
    try {
      const session = localStorage.getItem("user_session");
      const userSession = JSON.parse(session);
      const userID = userSession.user_id;
      if (!userID) {
        throw new Error("User ID not found in localStorage");
      }

      const response = await fetch("/get_products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userID }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      console.log(data);

      if (data.products && Array.isArray(data.products)) {
        setProducts(data.products);
        const categories = [
          ...new Set(data.products.map((product) => product.category)),
        ];
        setUniqueCategories(categories);
      } else {
        throw new Error("Products data is not in the expected format");
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  const handleEdit = (id) => {
    const productToEdit = products.find((product) => product.id === id);
    console.log("Editing product:", productToEdit);
    setEditProduct(productToEdit);
    setEditMode(id); // Enter edit mode for this row
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(
      `Editing product ${editProduct.id}: Setting ${name} to ${value}`
    );
    setEditProduct({ ...editProduct, [name]: value });
  };

  const handleSubmit = () => {
    const updatedProducts = products.map((product) => {
      if (product.id === editProduct.id) {
        console.log("Updating product:", editProduct);
        return editProduct;
      }
      return product;
    });
    console.log("Updated products:", updatedProducts);
    setProducts(updatedProducts);
    setEditMode(null); // Exit edit mode
    setShowEditPopup(false);
  };

  const handleSearch = () => {
    if (selectedProduct) {
      const filteredProducts = products.filter(
        (product) => product.id === selectedProduct.value
      );
      setProducts(filteredProducts);
      setSelectedProduct(null); // Clear the selected product after search
    } else {
      setProducts([]);
    }
  };

  // Function to handle when a product is selected from the dropdown.
  const handleProductChange = (selectedOption) => {
    setSelectedProduct(selectedOption);
  };

  // Handler for when a category is selected from the dropdown
  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };

  // Handler for when the "Filter" button is clicked
  const handleFilter = () => {
    if (selectedCategory) {
      // Apply filter to products based on the selected category
      const filteredProducts = products.filter(
        (product) => product.category === selectedCategory.value
      );
      setProducts(filteredProducts);
    } else {
      // If no category is selected, reset to the full list of products
      setProducts([]);
    }
  };

  return (
    <div>
      <PartnerSidebarNavbar />
      <hr />
      <div className="partner-products-container">
        <div className="partner-products-header">
          <h1>All Products</h1>
          <div className="partner-products-search-container">
            <label htmlFor="partner-product-search">Search Products:</label>
            <Select
              id="partner-product-search"
              options={products.map((product) => ({
                value: product.id,
                label: product.productName,
              }))}
              onChange={handleProductChange}
              value={selectedProduct}
              placeholder="Select a product..."
              isClearable
              isSearchable
            />
            <label htmlFor="category-filter">Filter by Category:</label>
            <Select
              id="category-filter"
              options={uniqueCategories.map((category) => ({
                value: category,
                label: category,
              }))}
              onChange={handleCategoryChange}
              value={selectedCategory}
              placeholder="Select a category..."
              isClearable
              isSearchable
            />
            <button
              className="partner-products-search-button"
              onClick={handleSearch}
            >
              Search
            </button>
            <button
              className="partner-products-filter-button"
              onClick={handleFilter}
            >
              Filter
            </button>
          </div>
          <table className="partner-products-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Image</th>
                <th>Product Link</th>
                <th>Product Information</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Render a single row for each product */}
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{editMode === product.id ? <input type="text" name="productName" value={editProduct.productName} onChange={handleChange} /> : product.name}</td>
                  <td>{editMode === product.id ? <input type="text" name="category" value={editProduct.category} onChange={handleChange} /> : product.category}</td>
                  <td>{editMode === product.id ? <input type="text" name="price" value={editProduct.price} onChange={handleChange} /> : product.price}</td>
                  <td>
                    {editMode === product.id ? (
                      <input type="text" name="image" value={editProduct.image} onChange={handleChange} />
                    ) : (
                      <img src={`data:image/png;base64, ${product.imageFile}`} alt="Product Image" />
                    )}
                  </td>
                  <td>
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {product.link}
                    </a>
                  </td>
                  <td>{product.description}</td>
                  <td>
                    {editMode === product.id ? (
                      <button className="partner-products-edit-button" onClick={handleSubmit}>
                        CONFIRM
                      </button>
                    ) : (
                      <button className="partner-products-edit-button" onClick={() => handleEdit(product.id)}>
                        EDIT
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Popup for editing */}
          {showEditPopup && (
            <div className="partner-products-edit-popup">
              <h2>Edit Product</h2>
              <div className="partner-products-edit-form">
                {/* Edit form fields */}
              </div>
              <div className="partner-products-edit-buttons">
                <button
                  className="editProductsPopup-save-category-button"
                  onClick={handleSubmit}
                >
                  Save Changes
                </button>
                <button
                  className="editProductsPopup-cancel-category-button"
                  onClick={() => setShowEditPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <PartnerFooter />
    </div>
  );
};

export default PartnerAllProducts;
