import React, { useState, useEffect } from 'react';
import './AdminAllProduct.css'; // Import the CSS file
import Select from 'react-select'; // Import React-Select
import AdminSidebarNavbar from "../AdminSidebarNavbar";
import AdminFooter from "../AdminFooter";

const AdminAllProducts = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [products, setProducts] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  const blogshopOptions = [
    { value: 'Example BS', label: 'Example BS' },
    { value: 'bf blogshop', label: 'bf blogshop' },
    { value: 'dear lyla', label: 'dear lyla' },
    { value: 'carpe diem', label: 'carpe diem' }
    // Add more blogshop options as needed
  ];

  const categoryOptions = [
    { value: 'Clothes', label: 'Clothes' },
    { value: 'Shoes', label: 'Shoes' },
    { value: 'Accessories', label: 'Accessories' }
    // Add more category options as needed
  ];

  const fetchProducts = async () => {
    try {
      const response = await fetch("/get_allproducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

  const handleRemove = (indexToRemove) => {
    const updatedProducts = [...filteredProducts];
    updatedProducts.splice(indexToRemove, 1);
    setFilteredProducts(updatedProducts);
  };

  const handleSearch = () => {
    if (selectedOption) {
      const selectedBlogshop = selectedOption.value;
      const filtered = products.filter(product => product.blogshop === selectedBlogshop);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleFilter = () => {
    if (categoryFilter) {
      const selectedCategory = categoryFilter.value;
      const filtered = products.filter(product => product.category === selectedCategory);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <div>
      <AdminSidebarNavbar />
      <div className="admin-products-container">
        <h1><div className="admin-products-header">All Products</div></h1>
        <div className="admin-products-search-container">
          <label htmlFor="blogshop-options">Search Blogshop:</label>
          <Select
            id="blogshop-options"
            options={blogshopOptions}
            value={selectedOption}
            onChange={setSelectedOption}
            placeholder="Select a blogshop..."
            isSearchable={true}
            isClearable={true}
          />
          <label htmlFor="category-filter">Filter by Category:</label>
          <Select
            id="category-filter"
            options={categoryOptions}
            value={categoryFilter}
            onChange={setCategoryFilter}
            placeholder="Select a category..."
            isSearchable={false}
            isClearable={true}
          />
          <button className="admin-products-search-bar-button" onClick={handleSearch}>Search</button>
          <button className="admin-products-filter-bar-button" onClick={handleFilter}>Filter</button>
        </div>
        <table className="admin-products-table">
          <thead>
            <tr>
              <th>Blogshop Name</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Image</th>
              <th>Product Link</th>
              <th>Product Information</th>
              <th>Tags</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={index}>
                <td>{product.blogshop}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.subCategory}</td>
                <td>{product.price}</td>
                <td>{product.image}</td>
                <td>{product.link}</td>
                <td>{product.information}</td>
                <td>{product.tags}</td>
                <td>
                <button className="admin-products-remove-button" onClick={() => handleRemove(index)}>REMOVE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdminFooter />
    </div>
  );
};

export default AdminAllProducts;
