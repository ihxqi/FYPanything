import React, { useState } from 'react';
import './PartnerAllProducts.css';
import PartnerSidebarNavbar from "../PartnerSidebarNavbar";
import PartnerFooter from "../PartnerFooter";
import Select from 'react-select'; // Import React-Select

const data = [
  {
    id: 1,
    productName: "Classic Blazer",
    category: "Clothes",
    subCategory: "Blazer",
    price: "$109",
    image: "product_1.jpg",
    productLink: "http://www.example.com/product_1",
    productInformation: "This is a placeholder for product information.",
    tags: "#fashion #trendy"
  },
  {
    id: 2,
    productName: "Rugged Jeans",
    category: "Pants",
    subCategory: "Jeans",
    price: "$83",
    image: "product_2.jpg",
    productLink: "http://www.example.com/product_2",
    productInformation: "This is a placeholder for product information.",
    tags: "#trendy #classic #fashion #musthave"
  } ];

const PartnerAllProducts = () => {
  const [products, setProducts] = useState(data);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const uniqueCategories = [...new Set(data.map(product => product.category))];


  const [editProduct, setEditProduct] = useState({
    id: null,
    productName: "",
    category: "",
    subCategory: "",
    price: "",
    image: "",
    productLink: "",
    productInformation: "",
    tags: ""
  });
    

  const handleEdit = (id) => {
    const productToEdit = products.find(product => product.id === id);
    console.log('Editing product:', productToEdit);
    setEditProduct(productToEdit);
    setShowEditPopup(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Editing product ${editProduct.id}: Setting ${name} to ${value}`);
    setEditProduct({ ...editProduct, [name]: value });
  };

  const handleSubmit = () => {
    const updatedProducts = products.map(product => {
      if (product.id === editProduct.id) {
        console.log('Updating product:', editProduct);
        return editProduct;
      }
      return product;
    });
    console.log('Updated products:', updatedProducts);
    setProducts(updatedProducts);
    setShowEditPopup(false);
  };

  const handleSearch = () => {
    if (selectedProduct) {
      const filteredProducts = data.filter(
        (product) => product.id === selectedProduct.value
      );
      setProducts(filteredProducts);
      setSelectedProduct(null); // Clear the selected product after search
    } else {
      setProducts(data);
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
    const filteredProducts = data.filter((product) =>
      product.category === selectedCategory.value
    );
    setProducts(filteredProducts);
  } else {
    // If no category is selected, reset to the full list of products
    setProducts(data);
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
          options={data.map(product => ({ value: product.id, label: product.productName }))}
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
  <button className="partner-products-search-button" onClick={handleSearch}>Search</button>
  <button className="partner-products-filter-button" onClick={handleFilter}>Filter</button>
</div>
          <table className="partner-products-table">
            <thead>
              <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Sub Category</th>
            <th>Price</th>
            <th>Image</th>
            <th>Product Link</th>
            <th>Product Information</th>
            <th>Tags</th>
            <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {products.map(item => (
            <tr key={item.id}>
            <td>{item.productName}</td>
            <td>{item.category}</td>
            <td>{item.subCategory}</td>
            <td>{item.price}</td>
            <td>{item.image}</td>
            <td>{item.productLink}</td>
            <td >{item.productInformation}</td>
            <td>{item.tags}</td>
            <td>
            <button className="partner-products-edit-button" onClick={() => handleEdit(item.id)}>EDIT</button>
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
      <div>
        <label htmlFor="product">Product Name:</label>
        <input type="text" id="product" name="product" value={editProduct.productName} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <input type="text" id="category" name="category" value={editProduct.category} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="subCategory">Sub Category:</label>
        <input type="text" id="subCategory" name="subCategory" value={editProduct.subCategory} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input type="text" id="price" name="price" value={editProduct.price} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input type="text" id="image" name="image" value={editProduct.image} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="link">Link:</label>
        <input type="text" id="productLink" name="productLink" value={editProduct.productLink} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="info">Product Information:</label>
        <input type="text" id="productInformation" name="productInformation" value={editProduct.productInformation} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="tags">Tags:</label>
        <input type="text" id="tags" name="tags" value={editProduct.tags} onChange={handleChange} />
      </div>
    </div>
    <div className="partner-products-edit-buttons">
      <button className="editProductsPopup-save-category-button" onClick={handleSubmit}>Save Changes</button>
      <button className="editProductsPopup-cancel-category-button" onClick={() => setShowEditPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
        </div>
      </div>
      <PartnerFooter />
      </div>
  );
}

export default PartnerAllProducts;
