import React, { useState, useEffect } from "react";
import "./PartnerAllProducts.css";
import PartnerSidebarNavbar from "../PartnerSidebarNavbar";
import PartnerFooter from "../PartnerFooter";
import Select from "react-select";

const PartnerAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editProduct, setEditProduct] = useState({
    id: null,
    productName: "",
    category: "",
    price: "",
    image: "",
    productLink: "",
    productInformation: "",
  });
  const [editImagePreview, setEditImagePreview] = useState("");
  const [categories, setCatOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
 try {
    const response = await fetch("/get_categories");
    if (!response.ok) throw new Error("Failed to fetch categories");
const data = await response.json();
console.log(data);
    const categories = Object.keys(data.categories).map(category => ({
      value: category,
      label: category,
    }));
    setCatOptions(categories);
  setSelectedCategory(categories[0]);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };


  const fetchProducts = async () => {
    const session = localStorage.getItem("user_session");
    const userSession = JSON.parse(session);
    const userID = userSession.user_id;
    if (!userID) throw new Error("User ID not found in localStorage");

    const response = await fetch("/get_products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userID }),
    });

    if (!response.ok) throw new Error("Failed to fetch products");

const data = await response.json();
 console.log(data);

try{
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
const productToEdit = products.find(product => product.id === id);
console.log("Editing product:", productToEdit);
    setEditProduct({ ...productToEdit });
    setEditImagePreview(`data:image/png;base64, ${productToEdit.image}`);
    setShowEditPopup(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(
      `Editing product ${editProduct.id}: Setting ${name} to ${value}`
    );
    setEditProduct({ ...editProduct, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditImagePreview(e.target.result);
        setEditProduct({ ...editProduct, image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const updatedProducts = products.map(product => {
      if (product.id === editProduct.id) {	
console.log("Updating product:", editProduct);
        return { ...product, ...editProduct };
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
            {products.map((product, index) => (
              <tr key={index}>
  <td>
                    {editMode === product.id ? (
                      <input
                        type="text"
                        name="productName"
                        value={editProduct.productName}
                        onChange={handleChange}
                      />
                    ) : (
                      product.name
                    )}
                  </td>
                  <td>
                    {editMode === product.id ? (
                      <input
                        type="text"
                        name="category"
                        value={editProduct.category}
                        onChange={handleChange}
                      />
                    ) : (
                      product.category
                    )}
                  </td>
                  <td>
                    {editMode === product.id ? (
                      <input
                        type="text"
                        name="price"
                        value={editProduct.price}
                        onChange={handleChange}
                      />
                    ) : (
                      product.price
                    )}
                  </td>
                  <td>
                    {editMode === product.id ? (
                      <input
                        type="text"
                        name="image"
                        value={editProduct.image}
                        onChange={handleChange}
                      />
                    ) : (
                      <img
                        src={`data:image/png;base64, ${product.imageFile}`}
                        alt="Product Image"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
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
                      <button
                        className="partner-products-edit-button"
                        onClick={handleSubmit}
                      >
                        CONFIRM
                      </button>
                    ) : (
                      <button
                        className="partner-products-edit-button"
                        onClick={() => handleEdit(product.id)}
                      >
                        EDIT
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        {showEditPopup && (
          <div className="partner-products-edit-popup">
            <h2>Edit Product</h2>
            <div className="partner-products-edit-form">
                 <label htmlFor="productName">Product Name:</label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={editProduct.name}
                  onChange={handleChange}
                />
                <label htmlFor="category">Category:</label>
                <Select
                  id="category"
                  options={categories}
                  onChange={handleCategoryChange}
                  value={selectedCategory}
                  placeholder="Select a category..."
                  isClearable
                  isSearchable
                />
                <label htmlFor="price">Price:</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={editProduct.price}
                  onChange={handleChange}
                />
              <label htmlFor="image">Image File:</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
              />
 <label htmlFor="image">Product Information:</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={editProduct.description}
                  onChange={handleChange}
                />


              {editImagePreview && (
                <img src={editImagePreview} alt="Product" style={{ width: "100px", height: "100px" }} />
              )}
              {/* Add other input fields as needed */}
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



