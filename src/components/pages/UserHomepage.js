import React, { useState, useEffect } from "react";
import "./UserHomepage.css";
import UserSidebarNavbar from "../UserSidebarNavbar";
import dress2 from "../image/DayDress.jpg";
import dress1 from "../image/NightDress.jpg";
import UserFooter from "../UserFooter";

// const apiUrl = 'http://54.252.236.237:8000'; // Hosted Backend URL
const apiUrl = "http://localhost:8000"; // Local Backend URL

const UserHomepage = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [isLiked, setIsLiked] = useState(false); // State to track if the product is liked
  const [recommendations, setRecommendations] = useState([]);
  const [formData, setFormData] = useState({
    user_id: "",
  });
  const session = localStorage.getItem("user_session");
  const userSession = JSON.parse(session);
  const userID = userSession?.user_id; // Access user_id safely using optional chaining
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        if (!userID) return; // If userID is not available, return early
        console.log("Fetching recommendations...");
        const response = await fetch(`${apiUrl}/recommendations/${userID}`);
        if (!response.ok) {
          throw new Error("Failed to fetch recommendations");
        }
        const data = await response.json();
        console.log("Product IDs:", data);
        const recommendedProductsPromises = data.recommendations.map(
          async (productID) => {
            const productResponse = await fetch(
              `${apiUrl}/get_recommended_products/${productID}`
            );
            if (!productResponse.ok) {
              throw new Error(
                `Failed to fetch recommendations for product ID ${productID}`
              );
            }
            const productData = await productResponse.json();
            return productData;
          }
        );

        // Wait for all promises to resolve
        const recommendedProducts = await Promise.all(
          recommendedProductsPromises
        );
        console.log("Recommendations:", recommendedProducts);
        setRecommendations(recommendedProducts);
        setIsLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        console.error("Error fetching recommendations:", error.message);
        setIsLoading(false); // Set loading state to false if there's an error
      }
    };

    fetchRecommendations();
  }, [userID]); // Fetch recommendations when userID changes

  const handleRatingClick = async (newRating) => {
    try {
      // Update the rating
      console.log("New Rating:", newRating);
      console.log(userID)
      console.log(recommendations[currentProductIndex].product_id)
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
      console.log("added rating")
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
    console.log("Clicked on heart icon. Liked:", isLiked);
    if(!isLiked){
      console.log("I click bookmark")
      console.log(userID)
      // const productIdString = JSON.stringify(product_id)
      console.log(product_id)
      
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
        console.log("added bookmark")
        setIsLiked(!isLiked);
      } catch (error) {
        console.error("Error adding bookmark:", error.message);
      }
    }
    else{
      console.log("I click unbookmark")
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
        console.log("removed bookmark")
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
                    style={{ maxWidth: "250px", maxHeight: "300px" }}
                  />
                  <div className="UserHomeproduct-details">
                    <div>
                      Name: {recommendations[currentProductIndex].name}
                    </div>
                    <div>
                      Description: {recommendations[currentProductIndex].description}
                    </div>
                    <div>
                      Price: {"$"+recommendations[currentProductIndex].price}
                    </div>
                    <div>
                      Category: {recommendations[currentProductIndex].category}
                    </div>
                    <div>
                      <a
                        href={recommendations[currentProductIndex].link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Link to shop
                      </a>
                    </div>

                    {/* Add more details as needed */}
                  </div>
                  <div className="rating-container">
                    <span className="rating-label">Rating:</span>
                    {renderRatingStars()}
                  </div>
                </div>
              )}
            {recommendations.length === 0 && (
              <div>No recommendations available.</div>
            )}
            {currentProductIndex >= recommendations.length && (
              <div>No more recommendations.</div>
            )}
            {/* Toggle between heart and tick icon based on isLiked state */}
            <div className="UserHomethumbs-container">
              <button onClick={handleHeartClick}>{isLiked ? "✔️" : "❤️"}</button>
            </div>
          </React.Fragment>
        )}
      </div>
      <UserFooter />
    </div>
  );
};

export default UserHomepage;
