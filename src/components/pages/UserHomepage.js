import React, { useState } from 'react';
import './UserHomepage.css';
import UserSidebarNavbar from "../UserSidebarNavbar";
import dress2 from '../image/DayDress.jpg'
import dress1 from '../image/NightDress.jpg'
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
  },
];

const UserHomepage = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const handleThumbClick = (isThumbsUp) => {
    // Both thumbs go to next product
    if (isThumbsUp) {
      setCurrentProductIndex(currentProductIndex + 1);
    } else {
      setCurrentProductIndex(currentProductIndex + 1);
    }
  };
   // Simulated related products data
   const relatedProducts = [
    { id: 1, name: 'Product 1', image: 'product1.jpg', price: '$19.99' },
    { id: 2, name: 'Product 2', image: 'product2.jpg', price: '$24.99' },
    { id: 3, name: 'Product 3', image: 'product3.jpg', price: '$29.99' },
    // Add more simulated products as needed
  ];

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
              </div>
            </div>
          )}
          {products.length === 0 && <div>No products available.</div>}
          <div className="UserHomethumbs-container">
            <button onClick={() => handleThumbClick(true)}>👍</button>
            <button onClick={() => handleThumbClick(false)}>👎</button>
          </div>
        {/* Related Products */}
<div className="related-products">
  <h2>You May Also Like</h2>
  <div className="product-list">
    {relatedProducts.map(product => (
      <div key={product.id} className="product">
        <div className="related-product-placeholder">
          {/* Optionally, you can add text or an icon indicating that the image is loading */}
          Loading...
        </div>
        <h3>{product.name}</h3>
        <p>{product.price}</p>
        {/* Add more product details as needed */}
                </div>
              ))}

          </div>
        </div>
      </div>
      <UserFooter/>
    </div>
  );
};

export default UserHomepage;
