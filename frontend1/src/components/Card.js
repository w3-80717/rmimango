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
      setQuantity(newQuantity);
      console.log(newQuantity)

  };

  const handleIncrease = () => handleQuantityChange(quantity + 1);
  const handleDecrease = () => handleQuantityChange(quantity > 0 ? quantity - 1 : 0);
  
  return (
    <div className="card">
      <img src={product.imageUrl} alt={product.title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{product.title}</h3>
        <p className="card-description">{product.description}</p>
        <p className="card-price">₹ {product.price}</p>

        {/* Quantity control */}
        <div className="quantity-control">
          <label className="quantity-control-label">{cartItem ? "In cart:" : "Quantity:"}</label>
          <button onClick={handleDecrease}>-</button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
          />
            <label className="quantity-control-label"> KGs</label>
          <button onClick={handleIncrease}>+</button>
        </div>

        <button
          className="card-add-button"
          onClick={cartItem? ()=>onQuantityChange(product.id, quantity):() => onAddToCart(product, quantity)}
        >
          { cartItem ? 'Update Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default Card;
