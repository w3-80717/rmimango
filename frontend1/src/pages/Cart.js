import React, { useState } from 'react';
import './Cart.css';
import { FaTrashAlt } from 'react-icons/fa';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal'; // Importing the modal component
import { useEffect } from 'react';

const Cart = ({ cartItems, handleUpdateQuantity, handleRemoveProduct }) => {
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false); // State to control modal visibility
  const [selectedProduct, setSelectedProduct] = useState(null); // Store product to be deleted
  const [inputValues, setInputValues] = useState({});
  useEffect(() => {
     const updatedValues = cartItems.reduce((acc, item) => {
       acc[item.Product.id] = item.quantity.toString();
       return acc;
     }, {});
     setInputValues(updatedValues);
   }, [cartItems]);

  const handleInputChange = (e, productId) => {
    const { value } = e.target;

    // Update local input value temporarily
    setInputValues((prevState) => ({
      ...prevState,
      [productId]: value,
    }));
  };
  const handleInputBlur = (productId, value) => {
    const parsedValue = parseInt(value, 10);
    
    // Only update quantity if valid and greater than zero
    if (!isNaN(parsedValue) && parsedValue > 0) {
      handleUpdateQuantity(productId, parsedValue);
    } else {
      // Reset to original quantity if invalid
      setInputValues((prevState) => ({
        ...prevState,
        [productId]: cartItems.find((item) => item.Product.id === productId).quantity.toString(),
      }));
    }
  };

  const totalPrice = cartItems.reduce(
    (price, item) => price + item.quantity * item.Product.price,
    0
  );

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowDeleteConfirmationModal(true); // Show modal when delete button is clicked
  };

  const handleConfirmDelete = (product) => {
    handleRemoveProduct(product); // Remove product if confirmed
    setShowDeleteConfirmationModal(false); // Close modal
  };

  const handleCloseDeleteConfirmationModal = () => {
    setShowDeleteConfirmationModal(false); // Close modal without deleting
  };

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>

      {cartItems.length === 0 && (
        <div className="cart-empty">Your cart is empty!</div>
      )}

      {cartItems.length > 0 && (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.Product.id}>
                {/* Product Image and Name */}
                <td className="cart-product-info">
                  <img
                    className="cart-item-image"
                    src={item.Product.imageUrl}
                    alt={item.Product.title}
                  />
                  <span className="cart-item-name">{item.Product.title}</span>
                </td>

                {/* Quantity Controls */}
                <td className="cart-item-quantity">
                  <button
                    className="cart-btn"
                    onClick={() =>
                      handleUpdateQuantity(item.Product.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <input
                                type="text"
                                className="cart-quantity-input"
                                value={inputValues[item.Product.id]} // Controlled by local state
                                onChange={(e) => handleInputChange(e, item.Product.id)}
                                onBlur={() => handleInputBlur(item.Product.id, inputValues[item.Product.id])}
                              />
                  <button
                    className="cart-btn"
                    onClick={() =>
                      handleUpdateQuantity(item.Product.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>

                  {/* Delete Button */}
                  <button
                    className="cart-delete-btn"
                    onClick={() => handleDeleteClick(item.Product)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>

                {/* Total Price */}
                <td className="cart-item-price">
                  ₹ {item.Product.price * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Total Price Summary */}
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <span className="total-price-label">Total Price:</span>
          <span className="total-price-value">₹ {totalPrice}</span>
        </div>
      )}

      {/* DeleteConfirmationModal for delete confirmation */}
      <DeleteConfirmationModal
        show={showDeleteConfirmationModal}
        handleClose={handleCloseDeleteConfirmationModal}
        handleConfirm={handleConfirmDelete}
        product={selectedProduct}
      />
    </div>
  );
};

export default Cart;
