import React, { useState, useEffect } from 'react';
import './AdminAllProduct.css'; // Import the CSS file
import Select from 'react-select'; // Import React-Select
import AdminSidebarNavbar from "../AdminSidebarNavbar";
import AdminFooter from "../AdminFooter";

const apiUrl = "http://3.106.171.7:8000"; // Hosted Backend URL
// const apiUrl = "http://localhost:8000"; // Local Backend URL


const AdminAllProducts = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [products, setProducts] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/get_allproducts`, {
        method: "GET",
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
        const productsWithNames = await Promise.all(data.products.map(async (product) => {
          const partnerName = await getPartnerName(product.user_id);
          return { ...product, partnerName };
        }));
        
        setProducts(productsWithNames);
  
        const categories = [
          ...new Set(productsWithNames.map((product) => product.category)),
        ];
        setUniqueCategories(categories);
      } else {
        throw new Error("Products data is not in the expected format");
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };
  

  const getPartnerName = async (userId) => {
    try {
      const response = await fetch(`${apiUrl}/get_partner_name/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch partner name");
      }
      const data = await response.json();
      console.log(data.name)
      return data.name;
    } catch (error) {
      console.error("Error fetching partner name:", error.message);
      return "N/A";
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

  const handleDelete = async (indexToRemove) => {
    try {
      const productIdToDelete = indexToRemove
      const response = await fetch(`${apiUrl}/delete_product/${productIdToDelete}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
  
      const updatedProducts = [...products];
      updatedProducts.splice(indexToRemove, 1);
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      window.alert("Product deleted")
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };
  

  return (
    <div>
      <AdminSidebarNavbar />
      <div className="admin-products-container">
        <h1><div className="admin-products-header">All Products</div></h1>
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.partnerName}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <img className="product-image"src={`data:image/png;base64, ${product.imageFile}`} alt="Product Image" />
                <td><a href={product.link} target="_blank" rel="noopener noreferrer">{product.link}</a></td>
                <td>{product.description}</td>
                <td><button className="admin-products-remove-button" onClick={() => handleDelete(product.product_id)}>Delete</button></td>
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
