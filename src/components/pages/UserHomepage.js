import React, { useState } from 'react';
import './UserHomepage.css';
import UserNavbar from "../UserNavbar";
import logo from '../image/CollaFilter Logo.jpg'

const products = [
  {
    id: 1,
    image: logo,
    category: 'Electronics',
    subCategory: 'Smartphones',
    price: '$499',
    productLink: 'https://example.com/product1',
    information: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    tags: ['Tech', 'Mobile', 'Smartphone']
  },
  {
    id: 2,
    image: logo,
    category: 'Clothes',
    subCategory: 'Smart',
    price: '$699',
    productLink: 'https://eddddple.com/product1',
    information: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    tags: ['Button', 'Long']
  },];

const UserHomepage = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const handleThumbClick = (isThumbsUp) => {
    // Logic to handle thumbs up or down action
    // Increment or decrement the current product index based on thumbs up or down
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
