import React, { useEffect, useState } from 'react';
import Card from '../components/Card'; // Import the Card component
import './Home.css'; // Import CSS for styles
import * as productService from '../service/productService'; // Import service for API calls

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts(); // Fetch products from backend
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

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
              title={product.title}
              description={product.description}
              imageUrl={product.imageUrl}
              price={product.price}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
