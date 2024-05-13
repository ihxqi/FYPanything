import React, { useState, useEffect } from "react";
import "./UserBookmarks.css";
import UserSidebarNavbar from "../UserSidebarNavbar";
import UserFooter from "../UserFooter";

const apiUrl = "http://3.106.171.7:8000"; // Hosted Backend URL
// const apiUrl = "http://localhost:8000"; // Local Backend URL

const bookmarks = [];

const session = localStorage.getItem("user_session");
const userSession = JSON.parse(session);
const userID = userSession?.user_id; // Access user_id safely using optional chaining
console.log(userID);

const UserBookmarks = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [fetchedProductIDs, setFetchedProductIDs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchBookmarkedProducts(userID);
  }, []);

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
        `${apiUrl}/get_recommended_products/${productID}`
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
    console.log(`Clicked on bookmark with ID: ${product_id}`);
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleRemoveBookmark = (bookmarkId, event) => {
    event.stopPropagation(); // This stops the click from bubbling up to the parent elements
    console.log(`Remove bookmark with ID: ${bookmarkId}`);
    // Add your logic to remove the bookmark here
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
                  handleRemoveBookmark(recommendedProduct.id, event)
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
            <div className="UserHomeproduct-container">
              <img
                src={`data:image/png;base64, ${selectedProduct.imageFile}`}
                alt="Product Image"
                style={{ maxWidth: "250px", maxHeight: "300px" }}
              />
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

export default UserBookmarks;
