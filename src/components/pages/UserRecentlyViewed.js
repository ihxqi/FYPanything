import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./UserRecentlyViewed.css";
import UserSidebarNavbar from "../UserSidebarNavbar";
import UserFooter from "../UserFooter";

const apiUrl = "http://3.106.171.7:8000"; // Hosted Backend URL
// const apiUrl = "http://localhost:8000"; // Local Backend URL

const session = localStorage.getItem("user_session");
const userSession = JSON.parse(session);
const userID = userSession?.user_id;

const UserRecentlyViewed = () => {
  const [recentlyViewedItems, setRecentlyViewedItems] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [blank, setRedirectToBlank] = useState(false);

  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem("user_session"));
    if (!userSession || userSession.role !== "User") {
      // Set redirectToLogin to true if user role is not admin or if user session is null
      setRedirectToBlank(true);
    }
    const fetchRecentlyViewed = async () => {
      try {
        const response = await fetch(`${apiUrl}/get_recently_viewed/${userID}`);
        if (!response.ok) {
          throw new Error("Failed to fetch recently viewed items");
        }
        const data = await response.json();

        // Fetch recommended products for each product ID
        const recommendedProductsPromises = data.map(async (productID) => {
          const productResponse = await fetch(
            `${apiUrl}/get_recent_products/${productID}`
          );
          if (!productResponse.ok) {
            throw new Error(
              `Failed to fetch recommendations for product ID ${productID}`
            );
          }
          return productResponse.json(); // Return the product data
        });

        // Wait for all promises to resolve
        const recommendedProducts = await Promise.all(
          recommendedProductsPromises
        );

        // Flatten the array of recommended products
        const flattenedRecommendedProducts = recommendedProducts.flat();

        // Set the recently viewed items state
        setRecentlyViewedItems(flattenedRecommendedProducts);
      } catch (error) {
        console.error("Error fetching recently viewed items:", error);
      }
    };
    fetchRecentlyViewed();
  }, []);

  if (blank) {
    return <Navigate to="/login" />;
  }

  const handleClick = (recentlyViewedId, url, recentlyViewed) => {
    // console.log(`Clicked on recentlyViewed with ID: ${recentlyViewedId}`);
    setSelectedProduct(recentlyViewed);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleIncrement = async (product_id) => {
    try {
      const response = await fetch(`${apiUrl}/add_count/${product_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: product_id }),
      });

      if (!response.ok) {
        throw new Error("Failed to increment count");
      }
    } catch (error) {
      console.error("Error incrementing count:", error.message);
    }
  };

  return (
    <div>
      <UserSidebarNavbar />
      <div className="header">
        <h1>Recently Viewed</h1>
      </div>
      <div className="recentlyViewed-page">
        <div className="recentlyViewed-grid">
          {recentlyViewedItems.map((recentlyViewed) => (
            <div
              key={recentlyViewed.id}
              className="recentlyViewed-item"
              onClick={() =>
                handleClick(
                  recentlyViewed.product_id,
                  recentlyViewed.url,
                  recentlyViewed
                )
              }
            >
              <a
                href={recentlyViewed.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`data:image/png;base64, ${recentlyViewed.imageFile}`}
                  alt={recentlyViewed.name}
                  style={{ maxWidth: "250px", maxHeight: "350px" }}
                />{" "}
                {/* Using the image */}
              </a>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <div className="UserRecentlyproduct-container">
              <img
                src={`data:image/png;base64, ${selectedProduct.imageFile}`}
                alt="Product Image"
                style={{ maxWidth: "250px", maxHeight: "350px" }}
              />
              <div className="UserCatHomeproduct-details">
                <div>Name: {selectedProduct.name}</div>
                <div>Price: {"$" + selectedProduct.price}</div>
                <div>Category: {selectedProduct.category}</div>
                <div>Description: {selectedProduct.description}</div>
                <div>
                  <a
                    href={selectedProduct.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleIncrement(selectedProduct.product_id)}
                  >
                    Link to shop
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <UserFooter />
    </div>
  );
};

export default UserRecentlyViewed;
