import React, { useState, useEffect } from "react";
import "./PartnerAllProducts.css";
import PartnerSidebarNavbar from "../PartnerSidebarNavbar";
import PartnerFooter from "../PartnerFooter";
import Select from "react-select";

const apiUrl = "http://54.252.236.237:8000"; // Backend URL

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
    description: "",
  });
  const [editImagePreview, setEditImagePreview] = useState("");
  const [categories, setCatOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const regex = new RegExp(searchQuery, "i");
      const filteredProducts = products.filter((product) =>
        regex.test(product.name)
      );
      setFilteredProducts(filteredProducts);
    } else {
      // If search query is empty, set filtered products to the full list of products
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  useEffect(() => {
    if (selectedCategory) {
      // Apply filter to products based on the selected category
      const filteredProducts = products.filter(
        (product) => product.category === selectedCategory.value
      );
      setFilteredProducts(filteredProducts);
    } else {
      // If no category is selected, reset to the full list of products
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${apiUrl}/get_categories`);
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      console.log(data);
      const categories = Object.keys(data.categories).map((category) => ({
        value: category,
        label: category,
      }));
      setCatOptions(categories);
      // setSelectedCategory(categories[0]); // Commented out to prevent default selection
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const fetchProducts = async () => {
    const session = localStorage.getItem("user_session");
    const userSession = JSON.parse(session);
    const userID = userSession.user_id;
    console.log(userID);
    if (!userID) throw new Error("User ID not found in localStorage");

    const response = await fetch(`${apiUrl}/get_products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userID }),
    });

    if (!response.ok) throw new Error("Failed to fetch products");

    const data = await response.json();
    console.log(data);

    try {
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

  const handleEdit = (product_id) => {
    const productToEdit = products.find(
      (product) => product.product_id === product_id
    );
    if (productToEdit) {
      console.log("Editing product:", productToEdit);
      setEditProduct({ ...productToEdit, productName: productToEdit.name });
      // Set editImagePreview if needed
      setShowEditPopup(true);
    } else {
      console.error("Product not found for editing.");
    }
  };

  const handleDelete = async (product_id) => {
    try {
      const response = await fetch(`${apiUrl}/delete_product/${product_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      // Filter out the deleted product from the products state
      const updatedProducts = products.filter(
        (product) => product.id !== product_id
      );
      setProducts(updatedProducts);
      window.alert("Product Deleted");
      console.log("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
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
      setEditImagePreview(URL.createObjectURL(file)); // Display image preview
      setEditProduct({ ...editProduct, image: file }); // Update with the file itself
    } else {
      // If no new image is selected, reset the image state
      setEditImagePreview("");
      setEditProduct({ ...editProduct, image: "" });
    }
  };

  const convertImageToBase64 = (image) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result.split(",")[1]); // Extract base64 data
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(image); // Read the image file as Data URL
    });
  };

  const handleSubmit = async () => {
    console.log(editProduct.image);
    let base64Image = ""; // Initialize empty Base64 string
    if (editProduct.image instanceof File) {
      // Check if image is a File object
      base64Image = await convertImageToBase64(editProduct.image); // Convert image to Base64
     } 
    //  else {
    //   base64Image = editProduct.image; // Use existing Base64 string if available
    // }

    const requestBody = {
      product_id: editProduct.product_id,
      name: editProduct.name,
      category: editProduct.category,
      description: editProduct.description,
      link: editProduct.link,
      price: editProduct.price,
    };

    if (base64Image == "") {
      // requestBody.imageFile = base64Image; // Add image only if it's not null
      console.log(requestBody);
      console.log("no image submit")
      try {
        const response = await fetch(`${apiUrl}/update_product_noimage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error("Failed to update product");
        }

        const updatedProduct = await response.json();
        const updatedProducts = products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        );
        // setProducts(updatedProducts);


        console.log("Product updated successfully");
        setShowEditPopup(false);
        fetchProducts();
        fetchCategories();
      } catch (error) {
        console.error("Error updating product:", error.message);
      }
    } else {
      console.log(requestBody);
      console.log("image submit")
      requestBody.imageFile = base64Image;
      try {
        const response = await fetch(`${apiUrl}/update_product`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error("Failed to update product");
        }

        const updatedProduct = await response.json();
        const updatedProducts = products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        );
        setProducts(updatedProducts);

        console.log("Product updated successfully");
        setShowEditPopup(false);
        fetchProducts();
        fetchCategories();
      } catch (error) {
        console.error("Error updating product:", error.message);
      }
    }
  };

  const handleProductChange = (selectedOption) => {
    setSelectedProduct(selectedOption);
  };

  // Handler for when a category is selected from the dropdown
  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
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
            <input
              type="text"
              id="partner-product-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product name..."
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
              {filteredProducts.map((product, index) => (
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
                    <button
                      className="partner-products-edit-button"
                      onClick={() => handleEdit(product.product_id)}
                    >
                      EDIT
                    </button>
                    <button
                      className="partner-products-delete-button"
                      onClick={() => handleDelete(product.product_id)}
                    >
                      DELETE
                    </button>
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
                  value={editProduct.productName}
                  onChange={handleChange}
                />
                <label htmlFor="category">Category:</label>
                <Select
                  id="category"
                  options={categories}
                  value={{
                    value: editProduct.category,
                    label: editProduct.category,
                  }}
                  onChange={(selectedOption) =>
                    setEditProduct({
                      ...editProduct,
                      category: selectedOption.value,
                    })
                  }
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
                  id="imageFile"
                  name="imageFile"
                  onChange={handleImageChange}
                />
                {editImagePreview && (
                  <img
                    src={editImagePreview}
                    alt="Product"
                    style={{ width: "100px", height: "100px" }}
                  />
                )}
                <label htmlFor="link">Product Link:</label>
                <input
                  type="text"
                  id="link"
                  name="link"
                  value={editProduct.link}
                  onChange={handleChange}
                />
                <label htmlFor="description">Product Information:</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={editProduct.description}
                  onChange={handleChange}
                />

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
