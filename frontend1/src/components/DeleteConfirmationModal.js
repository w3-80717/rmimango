import React from 'react';
import './DeleteConfirmationModal.css';

const DeleteConfirmationModal = ({ show, handleClose, handleConfirm, product }) => {
  if (!show) {
    return null; // Return null if modal is not supposed to show
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Remove Item</h3>
        <p>Are you sure you want to remove {product.title} from your cart?</p>
        <div className="modal-actions">
          <button className="modal-btn cancel-btn" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="modal-btn confirm-btn"
            onClick={() => handleConfirm(product)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
