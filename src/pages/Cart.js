import React from 'react'

const Cart = ({cartItems}) => {
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
                src= {item.image}
                alt= {item.name}/>
                </div>
        ))}
     </div>

      <h3> cart is shows</h3>
    </div>
  )
}

export default Cart
