import React, { useState } from 'react';
import './UserHomepage.css';
import UserNavbar from "../UserNavbar";
import dress2 from '../image/DayDress.jpg'
import dress1 from '../image/NightDress.jpg'



const products = [
  {
    id: 1,
    image: dress1,
    category: 'Apparel',
    subCategory: 'Dress',
    price: '$499',
    productLink: 'https://example.com/dress',
    information: 'Stand out from the crowd with this stylish and elegant dress.',
    tags: ['Black', 'Long', 'Night']
  },
  {
    id: 2,
    image: dress2,
    category: 'Apparel',
    subCategory: 'Dress',
    price: '$699',
    productLink: 'https://eddddple.com/dress',
    information: 'Fairy vibe',
    tags: ['White', 'Long', 'Fairy', 'Day']
  },];

const UserHomepage = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const handleThumbClick = (isThumbsUp) => {
    // Both thumbs go to next productt
    if (isThumbsUp) {
      setCurrentProductIndex(currentProductIndex + 1);
    } else {
      setCurrentProductIndex(currentProductIndex + 1);
    }
  };

  return (
    <div>
      <UserNavbar />
      <div className="user-page">
        {products.length > 0 && (
          <div className="product-container">
            <img src={products[currentProductIndex].image} alt="Product" />
            <div className="product-details">
              <div>Category: {products[currentProductIndex].category}</div>
              <div>Sub-Category: {products[currentProductIndex].subCategory}</div>
              <div>Price: {products[currentProductIndex].price}</div>
              <div>Product Link: <a href={products[currentProductIndex].productLink} target="_blank" rel="noopener noreferrer">Link</a></div>
              <div>Product Information: {products[currentProductIndex].information}</div>
              <div>Tags: {products[currentProductIndex].tags.join(', ')}</div>
            </div>
          </div>
        )}
        {products.length === 0 && <div>No products available.</div>}
        <div className="thumbs-container">
          <button onClick={() => handleThumbClick(true)}>👍</button>
          <button onClick={() => handleThumbClick(false)}>👎</button>
        </div>
      </div>
    </div>
  );
};

export default UserHomepage;