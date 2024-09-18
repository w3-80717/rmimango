import React, { useEffect, useState } from 'react';
import Card from '../components/Card'; // Import the Card component
import "../components/Products.css"// Import CSS for styles
import * as productService from '../service/productService'; // Import service for API calls
import * as cartService from '../service/cartService'; // Import service for cart operations

const Products = ({ handleAddProduct }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts(); // Fetch products from backend
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await cartService.addItemToCart(productId, 1); // Add product to cart
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  
  return (
    <div className="products-container">
      <h2>Our Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <Card
            key={product.id}
            title={product.title}
            description={product.description}
            imageUrl={product.imageUrl}
            price={product.price} // Add price as a prop
            onAddToCart={() => handleAddProduct(product)} // Add onAddToCart prop
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
