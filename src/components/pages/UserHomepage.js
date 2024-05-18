import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./UserHomepage.css";
import UserSidebarNavbar from "../UserSidebarNavbar";
import UserFooter from "../UserFooter";

const apiUrl = "http://3.106.171.7:8000"; // Hosted Backend URL
// const apiUrl = "http://localhost:8000"; // Local Backend URL

const UserHomepage = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [isLiked, setIsLiked] = useState(false); // State to track if the product is liked
  const [recommendations, setRecommendations] = useState([]);
  const [sideRecommendations, setSideRecommendations] = useState([]);
  const session = localStorage.getItem("user_session");
  const userSession = JSON.parse(session);
  const userID = userSession?.user_id; // Access user_id safely using optional chaining
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const [blank, setRedirectToBlank] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem("user_session"));
    if (!userSession || userSession.role !== "User") {
      // Set redirectToLogin to true if user role is not admin or if user session is null
      setRedirectToBlank(true);
    }

    const fetchRecommendations = async () => {
      try {
        if (!userID) return; // If userID is not available, return early
        const response = await fetch(`${apiUrl}/recommendations/${userID}`);
        if (!response.ok) {
          throw new Error("Failed to fetch recommendations");
        }
        const data = await response.json();
        // console.log(data.recommendations);

        const recommendedProductsPromises = data.recommendations.map(
          async (productID) => {
            const productResponse = await fetch(
              `${apiUrl}/get_recommended_products/${productID}?user_id=${userID}`
            );
            if (!productResponse.ok) {
              throw new Error(
                `Failed to fetch recommendations for product ID ${productID}`
              );
            }
            const productData = await productResponse.json();

            // Check if the response indicates the user has already rated the product
            if (productData.message === "User has already rated this product") {
              return null; // Skip this product
            } else {
              return productData;
            }
          }
        );

        // Wait for all promises to resolve and filter out null values
        const recommendedProducts = (
          await Promise.all(recommendedProductsPromises)
        ).filter(Boolean);
        setRecommendations(recommendedProducts);
        setIsLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        console.error("Error fetching recommendations:", error.message);
        setIsLoading(false); // Set loading state to false if there's an error
      }
    };

    const fetchYouMayAlsoLike = async () => {
      try {
        if (!userID) return; // If userID is not available, return early
        const response = await fetch(
          `${apiUrl}/additional-recommendations/${userID}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch additional recommendations");
        }
        const data = await response.json();
        // console.log(data.additional_recommendations);

        const sideRecommendedProductsPromises =
          data.additional_recommendations.map(async (productID) => {
            const productResponse = await fetch(
              `${apiUrl}/get_recommended_products/${productID}?user_id=${userID}`
            );
            if (!productResponse.ok) {
              throw new Error(
                `Failed to fetch recommendations for product ID ${productID}`
              );
            }
            const productData = await productResponse.json();

            // Check if the response indicates the user has already rated the product
            if (productData.message === "User has already rated this product") {
              return null; // Skip this product
            } else {
              return productData;
            }
          });

        // Wait for all promises to resolve and filter out null values
        const sideRecommendedProducts = (
          await Promise.all(sideRecommendedProductsPromises)
        ).filter(Boolean);
        setSideRecommendations(sideRecommendedProducts);
        setIsLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        console.error(
          "Error fetching additional recommendations:",
          error.message
        );
        setIsLoading(false); // Set loading state to false if there's an error
      }
    };

    fetchRecommendations();
    fetchYouMayAlsoLike();
  }, [userID]); // Fetch recommendations when userID changes

  if (blank) {
    return <Navigate to="/login" />;
  }

  const handleRatingClick = async (newRating) => {
    try {
      // Update the rating
      // Call the add_rating endpoint
      const response = await fetch(`${apiUrl}/add_rating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userID,
          product_id: recommendations[currentProductIndex].product_id,
          rating: newRating,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add rating");
      }
      setCurrentProductIndex(currentProductIndex + 1);
      // Reset rating for the next product
      setRating(0);
      // Reset heart icon to initial state (not liked)
      setIsLiked(false);
    } catch (error) {
      console.error("Error adding rating:", error.message);
    }
  };

  const handleHeartClick = async () => {
    const product_id = recommendations[currentProductIndex].product_id;
    // Toggle between liked and not liked state
    if (!isLiked) {
      // console.log("I click bookmark");
      // console.log(userID);
      // const productIdString = JSON.stringify(product_id)
      // console.log(product_id);

      try {
        const response = await fetch(`${apiUrl}/add_bookmark`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userID,
            product_id: product_id,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to add bookmark");
        }
        setIsLiked(!isLiked);
      } catch (error) {
        console.error("Error adding bookmark:", error.message);
      }
    } else {
      try {
        const response = await fetch(`${apiUrl}/remove_bookmark`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userID,
            product_id,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to remove bookmark");
        }
        setIsLiked(!isLiked);
      } catch (error) {
        console.error("Error removing bookmark:", error.message);
      }
    }
    setIsLiked(!isLiked);
  };

  const renderRatingStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={i < rating ? "star filled" : "star"}
          onClick={() => handleRatingClick(i + 1)}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };

  const renderRatingStarsDetails = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={i < rating ? "star filled" : "star"}
          onClick={() => handleRatingClickDetails(i + 1)}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };

  const handleRatingClickDetails = async (newRating) => {
    try {
      // Update the rating
      const productID = selectedProduct.product_id;
      // Call the add_rating endpoint
      const response = await fetch(`${apiUrl}/add_rating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userID,
          product_id: productID,
          rating: newRating,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add rating");
      }

      // Filter out the rated product from sideRecommendations
      setSideRecommendations((prevRecommendations) =>
        prevRecommendations.filter(
          (product) => product.product_id !== productID
        )
      );

      // Reset rating for the next product
      setRating(0);
      // Reset heart icon to initial state (not liked)
      setIsLiked(false);
      // Close the modal
      setShowModal(false);
      // Clear the selected product
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error adding rating:", error.message);
    }
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

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    // console.log(product.product_id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {/* Render UserSidebarNavbar component */}
      <UserSidebarNavbar />
      <div className="UserHomeuser-page">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <React.Fragment>
            {recommendations.length > 0 &&
              currentProductIndex < recommendations.length && (
                <div className="UserHomeproduct-container">
                  <img
                    src={`data:image/png;base64, ${recommendations[currentProductIndex].imageFile}`}
                    alt="Product Image"
                    style={{ maxWidth: "200px", maxHeight: "300px" }}
                  />
                  <div className="UserHomeproduct-details">
                    <div>Name: {recommendations[currentProductIndex].name}</div>
                    <div>
                      Description:{" "}
                      {recommendations[currentProductIndex].description}
                    </div>
                    <div>
                      Price: {"$" + recommendations[currentProductIndex].price}
                    </div>
                    <div>
                      Category: {recommendations[currentProductIndex].category}
                    </div>
                    <div>
                      <a
                        href={recommendations[currentProductIndex].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          handleIncrement(
                            recommendations[currentProductIndex].product_id
                          )
                        }
                      >
                        Link to shop
                      </a>
                    </div>
                  </div>
                  <div className="rating-container">
                    <span className="rating-label">Rating:</span>
                    {renderRatingStars()}
                  </div>
                </div>
              )}
            {currentProductIndex >= recommendations.length && (
              <div className="message-container">
                <div className="message">
                  No recommendations available. Check back soon to see more
                  recommended items!
                </div>
              </div>
            )}
            {recommendations.length > 0 &&
              currentProductIndex < recommendations.length && (
                <div className="UserHomethumbs-container">
                  <button onClick={handleHeartClick}>
                    {isLiked ? "✔️" : "❤️"}
                  </button>
                </div>
              )}
            {sideRecommendations.length > 0 && (
              <div className="side-recommendations-title">
                You May Also Like
              </div>
            )}
            {sideRecommendations.length == 0 && (
              <div className="side-recommendations-title">
                Refresh the page to see other items you may like!
              </div>
            )}
            {sideRecommendations.length > 0 && (
              <div className="side-recommendations-container">
                {sideRecommendations.slice(0, 2).map((product, index) => (
                  <div
                    key={index}
                    className="side-recommendation"
                    onClick={() => handleProductClick(product)}
                  >
                    <img
                      src={`data:image/png;base64, ${product.imageFile}`}
                      alt="Side Product"
                      style={{ maxWidth: "150px", maxHeight: "220px" }}
                    />
                  </div>
                ))}
              </div>
            )}
          </React.Fragment>
        )}
      </div>
      <UserFooter />
      {showModal && selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            {selectedProduct && (
              <img
                src={`data:image/png;base64, ${selectedProduct.imageFile}`}
                alt="Product Image"
                style={{ maxWidth: "200px", maxHeight: "300px" }}
              />
            )}
            <div className="UserHomeproduct-details">
              <div>Name: {selectedProduct.name}</div>
              <div>Description: {selectedProduct.description}</div>
              <div>Price: {"$" + selectedProduct.price}</div>
              <div>Category: {selectedProduct.category}</div>
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
              <div className="rating-container-details">
                <span className="rating-label-details">Rating:</span>
                {renderRatingStarsDetails()}
              </div>
              <div className="UserHomethumbs-container-details">
                <button
                  className="small-heart-button-details"
                  onClick={handleHeartClick}
                >
                  {isLiked ? "✔️" : "❤️"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHomepage;
