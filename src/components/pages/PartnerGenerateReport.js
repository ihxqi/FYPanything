import React, { useState, useEffect } from "react";
import "./PartnerGenerateReport.css";
import PartnerSidebarNavbar from "../PartnerSidebarNavbar";
import PartnerFooter from "../PartnerFooter";

const apiUrl = "http://3.106.171.7:8000"; // Hosted Backend URL
// const apiUrl = "http://localhost:8000"; // Local Backend URL

const PartnerReport = () => {
  // State variables for products and pagination
  const [products, setProducts] = useState([]);
  const [averageRatings, setAverageRatings] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch products from the backend API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const session = localStorage.getItem("user_session");
      const userSession = JSON.parse(session);
      const userID = userSession.user_id;
      if (!userID) throw new Error("User ID not found in localStorage");

      const response = await fetch(`${apiUrl}/get_products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userID }),
      });

      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();

      if (data.products && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        throw new Error("Products data is not in the expected format");
      }
      const productIds = data.products.map((product) => product.product_id);
      productIds.forEach((productId) => fetchAverageRating(productId));
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  const fetchAverageRating = async (productId) => {
    try {
      const response = await fetch(`${apiUrl}/get_average_rating/${productId}`);
      if (!response.ok) throw new Error("Failed to fetch average rating");
      const data = await response.json();
      // console.log(`Average rating for product ${productId}:`, data);
      // Update the product's average rating in the state
      setAverageRatings((prevAverageRatings) => ({
        ...prevAverageRatings,
        [productId]: data || "N/A",
      }));
    } catch (error) {
      console.error(
        `Error fetching average rating for product ${productId}:`,
        error.message
      );
    }
  };

  // Calculate index range for current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to handle generating report
  const handleGenerateReport = async () => {
    try {
      // Fetch average ratings for all products
      const fetchAverageRatingPromises = products.map((product) =>
        fetchAverageRating(product.product_id)
      );
      await Promise.all(fetchAverageRatingPromises);
  
      // Once all average ratings are fetched, convert current items data to CSV format
      const csvData = convertToCSV(currentItems, averageRatings);
  
      // Create a Blob object containing the CSV data
      const blob = new Blob([csvData], { type: "text/csv" });
  
      // Create a URL for the Blob object
      const url = window.URL.createObjectURL(blob);
  
      // Create a link element for downloading the CSV file
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.csv");
  
      // Simulate a click on the link to trigger the download
      document.body.appendChild(link);
      link.click();
  
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating report:", error.message);
    }
  };

  const convertToCSV = (data, averageRatings) => {
    // Define the fields to include in the CSV
    const fields = ["Product", "Average Rating", "Product Link Clicked"];

    // Generate CSV header with the specified fields
    const header = fields.join(",");

    // Generate CSV rows with data from the specified fields
    const rows = data.map((item) => {
      // Fetch the average rating from the averageRatings state
      const averageRating =
        averageRatings[item.product_id] !== undefined
          ? averageRatings[item.product_id]
          : "N/A";
      // Return CSV row with the specified fields
      return [item.name, averageRating, item.clicks].join(",");
    });

    // Combine header and rows to create the CSV content
    return [header, ...rows].join("\n");
  };

  // Render the component
  return (
    <div>
      <PartnerSidebarNavbar />
      <div className="partnerreport-generator-container">
        <div className="partnerreportnavbar-placeholder"></div>{" "}
        {/* Blank space for the navbar */}
        <h1 className="partnerreporth1">Partner's Report</h1>
        <table className="partnerreport-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Average Rating</th>
              <th>Product Link Clicked</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{averageRatings[product.product_id] || "-"}</td>
                <td>{product.clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <ul className="pagination">
          {Array.from({
            length: Math.ceil(products.length / itemsPerPage),
          }).map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
        <button
          className="partnergenerate-button"
          onClick={handleGenerateReport}
        >
          Generate
        </button>
      </div>
      <PartnerFooter />
    </div>
  );
};

export default PartnerReport;
