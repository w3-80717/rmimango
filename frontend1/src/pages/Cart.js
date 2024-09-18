///cart

import React from 'react'

import "./Cart.css"

const Cart = ({ cartItems, handleAddProduct, handleRemoveProduct ,handleUpdateQuantity, handleCartClearance}) => {
  console.log("Cart P", cartItems);

  const totalPrice = cartItems.reduce((price, item) => price + item.quantity * item.Product.price, 0)
  return (
    <div className='cart-items'>

      <div className='cart-items-header'>Cart Items</div>
      

      {cartItems.length === 0 && (
        <div className='cart-items-empty'>No items are added</div>
      )}

      <div>
        {cartItems.map((item) => (
          <div key={item.id} className='cart-items-list'>
            <img
              className='cart-items-image'
              src={item.Product.imageUrl}
              alt={item.Product.name}
            />
            <div className='cart-items-name'>{item.Product.name}</div>
            <div className='cart-items-function'>
              <button className='cart-items-add' onClick={() =>  handleUpdateQuantity(item.Product.id, item.quantity + 1)}>+</button>
              <button className='cart-items-remove' onClick={() =>  handleUpdateQuantity(item.Product.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
              <button onClick={() => handleRemoveProduct(item.Product)}>
                  Remove
                </button>
            </div>
            
            <div className='cart-items-price'>
              {item.quantity} × ₹ {item.Product.price}
            </div>
            
          </div>
        ))}
      </div>

      <div className='cart-items-total-price-name'>
        Total price
        <div className='cart-items-total-price'> ₹ {totalPrice}
          
        </div>
        
      </div>
      
    </div>
  )
}

export default Cart
