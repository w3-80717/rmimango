import React, { useEffect, useState } from 'react';
import Card from '../components/Card'; // Import the Card component
import './Home.css'; // Import CSS for styles
import * as productService from '../service/productService'; // Import service for API calls

const Home = ({ handleAddProduct, handleUpdateQuantity, cartItems }) => {
  const [products, setProducts] = useState([]);
  const [cartItemsMod, setCartItemsMod] = useState({}); // Store modified cart items
  const fetchProductsAndCart = async () => {
    try {
      const productData = await productService.getProducts();
      // Convert the cart array into an object for faster lookup
      const cartItemsModObject = cartItems.reduce((acc, item) => {
        acc[item.productId] = item;
        return acc;
      }, {});

      setProducts(productData);
      setCartItemsMod(cartItemsModObject);
    } catch (error) {
      console.error('Error fetching products and cart:', error);
    }
  };

  useEffect(() => {
    fetchProductsAndCart(); // Fetch products and cart items together
  }, [cartItems]);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <img
          src="/images/rmimango.jpg"
          alt="Hero"
          className="hero-image"
        />
      </section>

      {/* Products Section */}
      <section className="products-section">
        <h2>Our Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <Card
              key={product.id}
              cartItem={cartItemsMod[product.id]} // Pass the cart item to the card
              product={product}
              onAddToCart={handleAddProduct} // Handle add to cart
              onQuantityChange={handleUpdateQuantity} // Handle quantity changes
            />
          ))}
          <footer className='footer'>
          <h5 className='footer-headline'>At MyAlphonso, we are committed to sourcing the best produce for you directly from 
            experienced and age-old farms. Your purchase supports the farmers who have worked year-round to 
            get you their best produce</h5>
          <p >
          Note: All photos are for representation purposes only, and may not represent the true product.
           The actual colour, texture and feel of natural fruit may significantly vary than as 
           illustrated on the website.
          </p>
          
            <div >
              <div>
                <div className='footer-menus'>
              <ul className='menu-secondary'>
                <li><a href="" >About Us</a></li>
                <li><a href="" >Privacy</a></li>
                <li><a href="" >Terms</a></li>
                <li><a href="" >Replacement & Refund Policy</a></li>
              </ul>
              
              </div>
             
              </div>
            </div>
          
          
          <div>
            <div>
            <form>
            <h2 className='footer-head'>Subscribe to our emails</h2>
            </form>
            </div>
            <ul>
              <li><a href="/images/facebook.jpeg" ></a></li>
            </ul>
          </div>
          </footer>
        </div>
      </section>
    </div>
  );
};

export default Home;
