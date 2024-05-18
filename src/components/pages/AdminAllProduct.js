import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./AdminAllProduct.css"; // Import the CSS file
import AdminSidebarNavbar from "../AdminSidebarNavbar";
import AdminFooter from "../AdminFooter";

const apiUrl = "http://3.106.171.7:8000"; // Hosted Backend URL
// const apiUrl = "http://localhost:8000"; // Local Backend URL

const AdminAllProducts = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [products, setProducts] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);
  const [pageInput, setPageInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [blank, setRedirectToBlank] = useState(false);

  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem("user_session"));
    if (!userSession || userSession.role !== "Admin") {
      // Set redirectToLogin to true if user role is not admin or if user session is null
      setRedirectToBlank(true);
    }
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  useEffect(() => {
    // Filter products based on search query
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  if (blank) {
    return <Navigate to="/login" />;
  }

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
      // console.log(data);

      if (data.products && Array.isArray(data.products)) {
        const productsWithNames = await Promise.all(
          data.products.map(async (product) => {
            const partnerName = await getPartnerName(product.user_id);
            return { ...product, partnerName };
          })
        );

        setProducts(productsWithNames);
        setFilteredProducts(productsWithNames); // Set filtered products initially
        const categories = [
          ...new Set(productsWithNames.map((product) => product.category)),
        ];
        setUniqueCategories(categories);
        setLoading(false);
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
      // console.log(data.name);
      return data.name;
    } catch (error) {
      console.error("Error fetching partner name:", error.message);
      return "N/A";
    }
  };

  const handleDelete = async (productIdToDelete) => {
    try {
      const response = await fetch(
        `${apiUrl}/delete_product/${productIdToDelete}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      const updatedProducts = products.filter(
        (product) => product.product_id !== productIdToDelete
      );
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      window.alert("Product deleted");
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  // Logic for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const goToPage = () => {
    const pageNumber = parseInt(pageInput);
    if (
      !isNaN(pageNumber) &&
      pageNumber > 0 &&
      pageNumber <= Math.ceil(filteredProducts.length / productsPerPage)
    ) {
      setCurrentPage(pageNumber);
      setPageInput("");
    } else {
      alert("Invalid page number!");
    }
  };

  return (
    <div>
      <AdminSidebarNavbar />
      <div className="admin-products-container">
        <h1>
          <div className="admin-products-header">All Products</div>
        </h1>
        <div className="admin-products-search-container">
          <input
            type="text"
            placeholder="Search:"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
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
              {currentProducts.map((product, index) => (
                <tr key={index}>
                  <td>{product.partnerName}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <img
                    className="product-image"
                    src={`data:image/png;base64, ${product.imageFile}`}
                    alt="Product Image"
                  />
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
                      className="admin-products-remove-button"
                      onClick={() => handleDelete(product.product_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* Pagination */}
        {!loading && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              {currentPage} /{" "}
              {Math.ceil(filteredProducts.length / productsPerPage)}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(filteredProducts.length / productsPerPage)
              }
            >
              Next
            </button>
            <div>
              <input
                type="text"
                placeholder="Go to page..."
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
              />
              <button onClick={goToPage}>Go</button>
            </div>
          </div>
        )}
      </div>
      <AdminFooter />
    </div>
  );
};

export default AdminAllProducts;
