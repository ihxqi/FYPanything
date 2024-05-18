import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./UserBookmarks.css";
import UserSidebarNavbar from "../UserSidebarNavbar";
import UserFooter from "../UserFooter";

const apiUrl = "http://3.106.171.7:8000"; // Hosted Backend URL
// const apiUrl = "http://localhost:8000"; // Local Backend URL

const bookmarks = [];

const session = localStorage.getItem("user_session");
const userSession = JSON.parse(session);
const userID = userSession?.user_id; // Access user_id safely using optional chaining

const UserBookmarks = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [fetchedProductIDs, setFetchedProductIDs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [blank, setRedirectToBlank] = useState(false);

  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem("user_session"));
    if (!userSession || userSession.role !== "User") {
      // Set redirectToLogin to true if user role is not admin or if user session is null
      setRedirectToBlank(true);
    }
    fetchBookmarkedProducts(userID);
  }, []);

  if (blank) {
    return <Navigate to="/login" />;
  }

  const fetchBookmarkedProducts = async (userID) => {
    try {
      const response = await fetch(`${apiUrl}/get_bookmarked_items/${userID}`);
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const bookmarkedProducts = await response.json();
      for (const productID of bookmarkedProducts) {
        if (!fetchedProductIDs.includes(productID)) {
          await fetchRecommendedProducts(productID);
          setFetchedProductIDs((prevIDs) => [...prevIDs, productID]);
        }
      }
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const fetchRecommendedProducts = async (productID) => {
    try {
      const response = await fetch(
        `${apiUrl}/get_bookmarked_products/${productID}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recommended products");
      }
      const recommendedProduct = await response.json();
      setRecommendedProducts((prevProducts) => [
        ...prevProducts,
        recommendedProduct,
      ]);
    } catch (error) {
      console.error("Error fetching recommended products:", error.message);
    }
  };

  const handleClick = (product_id, product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleRemoveBookmark = async (bookmarkId, event) => {
    const product_id = bookmarkId;
    event.stopPropagation(); // This stops the click from bubbling up to the parent elements
    try {
      const response = await fetch(`${apiUrl}/remove_bookmark`, {
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
      window.location.reload();
    } catch (error) {
      console.error("Error adding bookmark:", error.message);
    }
  };

  const handleIncrement = async (product_id) => {
    // console.log(product_id);
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
      <div className="bookmarkheader">
        <h1>My Bookmarks</h1>
      </div>
      <div className="bookmarks-page">
        <main className="bookmarks-grid">
          {bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="bookmark-item"
              onClick={() => handleClick(bookmark.id, bookmark)}
            >
              {/* Bookmark rendering remains the same */}
            </div>
          ))}
          {/* Rendering recommended products */}
          {recommendedProducts.map((recommendedProduct) => (
            <div
              key={recommendedProduct.id}
              className="bookmark-item"
              onClick={() =>
                handleClick(recommendedProduct.product_id, recommendedProduct)
              }
            >
              <button
                className="remove-bookmark-button"
                onClick={(event) =>
                  handleRemoveBookmark(recommendedProduct.product_id, event)
                }
              >
                &times;
              </button>
              <img
                src={`data:image/jpeg;base64,${recommendedProduct.imageFile}`}
                alt={recommendedProduct.name}
              />
              <p>{recommendedProduct.name}</p>
            </div>
          ))}
        </main>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>

            <img
              src={`data:image/png;base64, ${selectedProduct.imageFile}`}
              alt="Product Image"
              style={{ maxWidth: "250px", maxHeight: "300px" }}
            />
            <div className="UserCatHomeproduct-details">
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
            </div>
          </div>
        </div>
      )}
      <UserFooter />
    </div>
  );
};

export default UserBookmarks;
