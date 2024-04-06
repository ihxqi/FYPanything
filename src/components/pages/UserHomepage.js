import React, { useState } from 'react';
import './UserHomepage.css';
import UserSidebarNavbar from "../UserSidebarNavbar";
import dress2 from '../image/DayDress.jpg';
import dress1 from '../image/NightDress.jpg';
import UserFooter from "../UserFooter";

const products = [
  {
    id: 1,
    image: dress1,
    category: 'Apparel',
    subCategory: 'Dress',
    price: '$499',
    productLink: 'https://example.com/dress',
    information: 'Stand out from the crowd with this stylish and elegant dress.',
    tags: ['Black', 'Long', 'Night'],
    rating: 0 // Initial rating
  },
  {
    id: 2,
    image: dress2,
    category: 'Apparel',
    subCategory: 'Dress',
    price: '$699',
    productLink: 'https://eddddple.com/dress',
    information: 'Fairy vibe',
    tags: ['White', 'Long', 'Fairy', 'Day'],
    rating: 0 // Initial rating
  },
];

const UserHomepage = ({ handleBookmark }) => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [isLiked, setIsLiked] = useState(false); // State to track if the product is liked

  const handleRatingClick = (newRating) => {
    // Update the rating
    setRating(newRating);

    // Proceed to the next product
    setCurrentProductIndex(currentProductIndex + 1);
    // Reset rating for the next product
    setRating(0);
    // Reset heart icon to initial state (not liked)
    setIsLiked(false);
  };

  const handleHeartClick = () => {
    // Toggle between liked and not liked state
    setIsLiked(!isLiked);
  };

  const renderRatingStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={i < rating ? 'star filled' : 'star'}
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
        {products.length > 0 && (
          <div className="UserHomeproduct-container">
            <img src={products[currentProductIndex].image} alt="Product" />
            <div className="UserHomeproduct-details">
              <div>Category: {products[currentProductIndex].category}</div>
              <div>Sub-Category: {products[currentProductIndex].subCategory}</div>
              <div>Price: {products[currentProductIndex].price}</div>
              <div>Product Link: <a href={products[currentProductIndex].productLink} target="_blank" rel="noopener noreferrer">Link</a></div>
              <div>Product Information: {products[currentProductIndex].information}</div>
              <div>Tags: {products[currentProductIndex].tags.join(', ')}</div>
              <div className="rating-container">
                <span className="rating-label">Rating:</span>
                {renderRatingStars()}
              </div>
            </div>
          </div>
        )}
        {products.length === 0 && <div>No products available.</div>}
        {/* Toggle between heart and tick icon based on isLiked state */}
        <div className="UserHomethumbs-container">
          <button onClick={handleHeartClick}>{isLiked ? '✔️' : '❤️'}</button>
        </div>
        {/* Related Products */}
        <div className="related-products">
          <h2>You May Also Like</h2>
          <div className="product-list">
            {/* Render related products */}
          </div>
        </div>
      </div>
      <UserFooter />
    </div>
  );
};

export default UserHomepage;
