import React from 'react';
import './Card.css'; // Import CSS for styles

const Card = ({ title, description, imageUrl, price, onAddToCart }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt={title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <p className="card-price">₹ {price}</p> {/* Display price */}
        <button className="card-add-button" onClick={onAddToCart}>Add to Cart</button> {/* Add to Cart button */}
      </div>
    </div>
  );
};

export default Card;
