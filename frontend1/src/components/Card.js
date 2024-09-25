import React, { useState, useEffect } from 'react';
import './Card.css'; // Import styles

const Card = ({ product, onAddToCart, onQuantityChange, cartItem }) => {
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 0);

  // Update local state if cart item quantity changes from outside (like when cart is cleared)
  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItem]);

  // Handle quantity change internally and trigger external update
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
      console.log(newQuantity)
      onQuantityChange(product.id, newQuantity); // Call the external handler to update the global state
    }
  };

  const handleIncrease = () => handleQuantityChange(quantity + 1);
  const handleDecrease = () => handleQuantityChange(quantity > 0 ? quantity - 1 : 0);

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
  return (
    <div className="card">
      <img src={product.imageUrl} alt={product.title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{product.title}</h3>
        <p className="card-description">{product.description}</p>
        <p className="card-price">₹ {product.price}</p>

        {/* Quantity control */}
        <div className="quantity-control">
          <label className="quantity-control-label">Quantity:</label>
          <button onClick={handleDecrease}>-</button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
          />
          <button onClick={handleIncrease}>+</button>
        </div>

        <button
          className="card-add-button"
          onClick={() => onAddToCart(product)}
        >
          {quantity > 0 ? 'Update Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default Card;
