import React from 'react';
import './Card.css'; // Import CSS for styles
import { useState } from 'react';

const Card = ({ product, onAddToCart, onQuantityChange, cartItem }) => {
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 0);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    onQuantityChange(product.id, newQuantity); // Update the backend
  };
  const handleIncrease = () => handleQuantityChange(quantity + 1);
  const handleDecrease = () => handleQuantityChange(quantity > 0 ? quantity - 1 : 0);


  return (
    <div className="card">
      <img src={product.imageUrl} alt={product.title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{product.title}</h3>
        <p className="card-description">{product.description}</p>
        <p className="card-price">₹ {product.price}</p> {/* Display price */}
          {/* Quantity control */}
                <div className="quantity-control">
                  <label className="quantity-control-label">In Cart Quantity:</label>
                  <button onClick={handleDecrease}>-</button>
                  <input
                    type="number"
                    step="0.1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseFloat(e.target.value))}
                  />
                    <label className="quantity-control-label">KGs</label>
                  <button onClick={handleIncrease}>+</button>
                </div>
        
                <button className="card-add-button" onClick={() => handleQuantityChange(quantity)}>
                  {quantity > 0 ? 'Update Cart' : 'Add to Cart'}
                </button>
        </div>
    </div>
  );
};

export default Card;
